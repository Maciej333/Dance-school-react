import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './GroupForm.style.scss';
import { useParams } from 'react-router-dom';
import { getDanceStyles } from '../../../app/api/danceStyle.api';
import { getAllLocations } from '../../../app/api/location.api';
import { getInstructors } from '../../../app/api/user.api';
import { useAppSelector } from '../../../app/hook/store.hook';
import { selectAuth } from '../../../app/store/auth/authSlice';
import { arrayLength, notEmpty, numberValue, stringLength, validate, validator } from '../../../app/utils/validators/validators';
import { DanceStyle } from '../../../app/model/danceStyle.model';
import { Location } from '../../../app/model/location.model';
import { Instructor } from '../../../app/model/instructor.model';
import { DanceLevel } from '../../../app/utils/enum/DanceLevel.enum';
import MultiSelect from '../../../app/components/MultiSelect/MultiSelect';
import { changeEnumToArray } from '../../../app/utils/functions/changeEnumToArray';
import { Days } from '../../../app/utils/enum/Days.enum';
import { addGroupChoreo, addGroupCourse } from '../../../app/api/group.api';

export const FORM_ADD = "FORM_ADD";
export const FORM_EDIT = "FORM_EDIT";
export const GROUP_ADD = 'Group added';
export const GROUP_UPDATE = 'Group updated';
export const COURSE = "COURSE";
export const CHOREO = "CHOREO";

export default function GroupForm(props: { type: string }) {

    const { type } = props;
    const { id } = useParams();
    const { user } = useAppSelector(selectAuth);

    const [formData, setFormData] = useState({
        type: {
            value: "",
            error: ""
        },
        genderList: {
            value: Array<number>(0),
            error: ""
        },
        danceLevel: {
            value: "",
            error: ""
        },
        danceStyleId: {
            value: "",
            error: ""
        },
        locationId: {
            value: "",
            error: ""
        },
        instructorIds: {
            value: Array<number>(0),
            error: ""
        },
        // course
        classroomDay: {
            value: "",
            error: ""
        },
        classroomStartTime: {
            value: "",
            error: ""
        },
        classroomDuration: {
            value: "",
            error: ""
        },
        // choreo
        name: {
            value: "",
            error: ""
        },
    });

    const setError = (name: string, msg: string) => () => {
        setFormData((prev) => {
            return {
                ...prev,
                [name]: {
                    ...prev[name as keyof typeof formData],
                    error: msg,
                },
            };
        });
    };

    const [formDataValidatorsAdd] = useState({
        type: [
            validator(setError("type", "Type is required"))(notEmpty),
        ],
        danceStyleId: [
            validator(setError("danceStyleId", "Style is required"))(notEmpty),
        ],
        danceLevel: [
            validator(setError("danceLevel", "Level is required"))(notEmpty),
        ],
    });

    const [formDataValidatorsRequired] = useState({
        genderList: [
            validator(setError("genderList", "Selecting gender is required"))(arrayLength(1, 2)),
        ],
        locationId: [
            validator(setError("locationId", "Location is required"))(notEmpty),
        ]
    });

    const [formDataValidatorsCourse] = useState({
        classroomDay: [
            validator(setError("classroomDay", "Day is required"))(notEmpty),
        ],
        classroomStartTime: [
            validator(setError("classroomStartTime", "Start time is required"))(notEmpty),
        ],
        classroomDuration: [
            validator(setError("classroomDuration", "Min duration is 30 min"))(numberValue(30)),
            validator(setError("classroomDuration", "Duration is required"))(notEmpty),
        ]
    });

    const [formDataValidatorsChoreo] = useState({
        name: [
            validator(setError("name", "Name must be from 3 chars to 30 chars"))(stringLength(3, 30)),
            validator(setError("name", "Name is required"))(notEmpty),
        ]
    });

    const [danceStyles, setDanceStyles] = useState<DanceStyle[] | []>([]);
    const [locations, setLocations] = useState<Location[] | []>([]);
    const [instructors, setInstructors] = useState<Instructor[] | []>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getDanceStyles()
            .then(data => {
                setDanceStyles(data.data);
            })
            .catch(err => {
                setMessage("Cannot load required datas");
            });
        getAllLocations()
            .then(data => {
                setLocations(data.data);
            })
            .catch(err => {
                setMessage("Cannot load required datas");
            });
        getInstructors()
            .then(data => {
                setInstructors(data.data);
            })
            .catch(err => {
                setMessage("Cannot load required datas");
            });
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: {
                    error: "",
                    value: value,
                },
            };
        });
    };

    const handleSelect = (type: string) => (toSelect: number[]) => {
        setFormData(prev => {
            return {
                ...prev,
                [type]: {
                    value: toSelect,
                    error: ""
                }
            }
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formDataValidators = { ...formDataValidatorsRequired };
        if (type === FORM_ADD) {
            formDataValidators = Object.assign(formDataValidators, formDataValidatorsAdd);
        }
        if (formData.type.value === COURSE) {
            formDataValidators = Object.assign(formDataValidators, formDataValidatorsCourse);
        }
        if (formData.type.value === CHOREO) {
            formDataValidators = Object.assign(formDataValidators, formDataValidatorsChoreo);
        }
        if (validate(formData, formDataValidators)) {
            const group = {
                genderList: formData.genderList.value,
                danceLevel: formData.danceLevel.value,
                danceStyleId: formData.danceStyleId.value,
                locationId: formData.locationId.value,
                instructorIds: [user.employee?.id, ...formData.instructorIds.value],
                classroomDay: formData.classroomDay.value,
                classroomStartTime: formData.classroomStartTime.value,
                classroomDuration: formData.classroomDuration.value,
                name: formData.name.value,
            };

            // console.log("GROUP SUBMIT = ", group)

            if (type === FORM_ADD) {
                if (formData.type.value === COURSE) {
                    addGroupCourse(group)
                        .then(data => {
                            if (data.data.status === 200) {
                                setMessage(GROUP_ADD);
                            }
                            if (data.data.status === 500) {
                                setMessage("Error cannot add group");
                            }
                        })
                        .catch(err => {
                            setMessage("Error cannot add group");
                        })
                }
                if (formData.type.value === CHOREO) {
                    addGroupChoreo(group)
                        .then(data => {
                            if (data.data.status === 200) {
                                setMessage(GROUP_ADD);
                            }
                            if (data.data.status === 500) {
                                setMessage("Error cannot add group");
                            }
                            if (data.data.status === 501) {
                                setFormData(prev => {
                                    return {
                                        ...prev,
                                        name: {
                                            ...prev.name,
                                            error: "Name is not unique"
                                        }
                                    }
                                })
                            }
                        })
                        .catch(err => {
                            setMessage("Error cannot add group");
                        })
                }
            }
            if (type === FORM_EDIT) {

                if (formData.type.value === COURSE) {

                }
                if (formData.type.value === CHOREO) {

                }
            }
        }
    };



    return (
        message === GROUP_ADD || message === GROUP_UPDATE ?
            <div className='center'>
                <span className='main-message'>{message}</span>
            </div>
            :
            <form className='form group-form' onSubmit={handleSubmit}>
                <span className="main-error">{message}</span>

                {
                    type === FORM_ADD ?
                        <>
                            <label htmlFor='type'>Type <span>*</span></label>
                            <select id="type" name="type" value={formData.type.value} onChange={handleChange}>
                                <option value="">***</option>
                                <option value={COURSE}>Course</option>
                                <option value={CHOREO}>Choreo</option>
                            </select>
                            <span className="error">{formData.type.error}</span>

                            <label htmlFor='danceStyleId'>Style <span>*</span></label>
                            <select id="danceStyleId" name="danceStyleId" value={formData.danceStyleId.value} onChange={handleChange}>
                                <option value="">***</option>
                                {
                                    danceStyles.map(ds => {
                                        return <option key={`[group form style ]= ${ds.id}`} value={ds.id}>{ds.name}</option>
                                    })
                                }
                            </select>
                            <span className="error">{formData.danceStyleId.error}</span>


                            <label htmlFor='danceLevel'>Level <span>*</span></label>
                            <select id="danceLevel" name="danceLevel" value={formData.danceLevel.value} onChange={handleChange}>
                                <option value="">***</option>
                                {
                                    changeEnumToArray(DanceLevel).map((level, id) => {
                                        return <option key={`[group form level]= ${id}`} value={DanceLevel[level as DanceLevel] + ""}>{level + ""}</option>
                                    })
                                }
                            </select>
                            <span className="error">{formData.danceLevel.error}</span>

                            <label htmlFor='instructorIds'>Other Instructors</label>
                            <MultiSelect
                                all={instructors
                                    .filter(inst => {
                                        if (inst.user.id === user.id)
                                            return false;
                                        return true;
                                    })
                                    .map(inst => {
                                        return {
                                            id: inst.id,
                                            value: `${inst.user.firstname} ${inst.user.lastname}`,
                                            toString: () => `${inst.user.firstname} ${inst.user.lastname}`
                                        }
                                    })}
                                selected={formData.instructorIds.value}
                                select={handleSelect('instructorIds')}
                            />
                            <span className="error">{formData.instructorIds.error}</span>
                        </>
                        :
                        null
                }

                <label htmlFor='genderList'>Gender <span>*</span></label>
                <MultiSelect
                    all={[
                        {
                            id: 0,
                            value: `MALE`,
                            toString: () => `MALE`
                        },
                        {
                            id: 1,
                            value: `FEMALE`,
                            toString: () => `FEMALE`
                        },
                    ]}
                    selected={formData.genderList.value}
                    select={handleSelect('genderList')}
                />
                <span className="error">{formData.genderList.error}</span>

                <label htmlFor='locationId'>Location <span>*</span></label>
                <select id="locationId" name="locationId" value={formData.locationId.value} onChange={handleChange}>
                    <option value="">***</option>
                    {
                        locations.map(location => {
                            return <option key={`[group form location ]= ${location.id}`} value={location.id}>{location.adress}</option>
                        })
                    }
                </select>
                <span className="error">{formData.locationId.error}</span>

                {
                    formData.type.value === COURSE ?
                        <>
                            <label htmlFor='classroomDay'>Classroom day <span>*</span></label>
                            <select id="classroomDay" name="classroomDay" value={formData.classroomDay.value} onChange={handleChange}>
                                <option value="">***</option>
                                {
                                    changeEnumToArray(Days).map((day, id) => {
                                        return <option key={`[group form day ]= ${id}`} value={id}>{day + ""}</option>
                                    })
                                }
                            </select>
                            <span className="error">{formData.classroomDay.error}</span>

                            <label htmlFor='classroomStartTime'>Classroom start <span>*</span></label>
                            <input id="classroomStartTime" name="classroomStartTime" type="time" value={formData.classroomStartTime.value} onChange={handleChange}></input>
                            <span className="error">{formData.classroomStartTime.error}</span>

                            <label htmlFor='classroomDuration'>Classroom duration <span>*</span></label>
                            <input id="classroomDuration" name="classroomDuration" type="number" value={formData.classroomDuration.value} onChange={handleChange}></input>
                            <span className="error">{formData.classroomDuration.error}</span>
                        </>
                        :
                        null
                }

                {
                    formData.type.value === CHOREO ?
                        <>
                            <label htmlFor='name'>NAZWA <span>*</span></label>
                            <input id="name" name="name" value={formData.name.value} onChange={handleChange}></input>
                            <span className="error">{formData.name.error}</span>
                        </>
                        :
                        null
                }

                <button type='submit'>{id ? "Edit group" : "Add group"}</button>
            </form >
    )
}
