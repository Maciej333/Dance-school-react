import React, { useEffect, useState } from 'react'
import { getOpenGroups } from '../../../app/api/group.api';
import { withApi } from '../../../app/hoc/withApi';
import { Group, GroupChoreo, GroupCourse } from '../../../app/model/group.model';
import { Days } from '../../../app/utils/enum/Days.enum';
import { changeEnumToArray } from '../../../app/utils/functions/changeEnumToArray';
import { groupFilters, initFilters } from '../GroupFilter/GroupFilter';
import GroupCard from './GroupCard/GroupCard';
import './Groups.style.scss';

const GroupsComponent = (props: { apiData?: Group[] | GroupCourse[] | GroupChoreo[], filters: groupFilters }) => {

    const { apiData, filters } = props;
    const [groupsData, setGroupsData] = useState<Group[] | GroupCourse[] | GroupChoreo[]>([]);

    useEffect(() => {
        if (apiData) {
            if (filters === initFilters) {
                setGroupsData(apiData);
            } else {
                const groups = apiData
                    .filter(el => {
                        if (filters.style !== "") {
                            const elStyle = (typeof el.danceStyle === "string") ? el.danceStyle : el.danceStyle.name;
                            if (elStyle !== filters.style)
                                return false;
                        }
                        if (filters.level !== "") {
                            if (el.danceLevel !== filters.level)
                                return false;
                        }
                        if (filters.location !== "") {
                            const elLocation = (typeof el.location === "string") ? el.location : el.location.adress;
                            if (elLocation !== filters.location)
                                return false;
                        }
                        if (filters.gender !== "") {
                            if (!el.genderList.includes(filters.gender))
                                return false;
                        }
                        return true;
                    });
                setGroupsData(groups);
            }
        }
    }, [apiData, filters])

    return (
        <div className='groups'>
            <h3>Course</h3>
            {
                changeEnumToArray(Days).map((el, id) => {
                    const dayGroups = groupsData.filter(group => {
                        if (group.classroomDay === el) {
                            return true;
                        }
                        return false;
                    })
                    if (dayGroups.length > 0)
                        return <React.Fragment key={`[day] = ${el + ""}`}>
                            <h4>{el + ""}</h4>
                            <div className='groups-flex'>
                                {
                                    dayGroups.map((el, id) => {
                                        return <GroupCard key={`[group] = ${id}`} group={el} />
                                    })
                                }
                            </div>
                        </React.Fragment>
                    return null;
                })
            }

            <h3>CHOREO</h3>
            <div className='groups-flex'>
                {
                    groupsData
                        .filter(el => {
                            if (el.name)
                                return true;
                            return false;
                        })
                        .map((el, id) => {
                            return <GroupCard key={`[group] = ${id}`} group={el} />
                        })
                }
            </div>
        </div >
    )
}

const Groups = withApi(GroupsComponent, "Cannot fetch groups data", getOpenGroups);
export default Groups;