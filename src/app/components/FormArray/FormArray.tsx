import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import './FormArray.style.scss';

export default function FormArray(props: {
    labelText: string,
    formData: any[]
    setFormData: (newFormData: any[]) => void
}) {

    const { labelText, formData, setFormData } = props;

    const [formArray, setFormArray] = useState<any[]>([]);

    useEffect(() => {
        setFormArray(formData);
    }, [formData]);

    const handleTabElChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newFormData = [...formArray];
        newFormData[Number(name)] = value;
        setFormData(newFormData);
    }

    const addTabEl = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormData([...formArray, ""]);
    }

    const deleteTabEl = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        const newFormData = [...formArray].filter(
            (el, id) => {
                if (id === index) {
                    return false;
                }
                return true;
            }
        );
        setFormData(newFormData);
    }

    return (
        <>
            <label>{labelText} <span>*</span></label>
            <div className='form-array'>
                {
                    formArray.map((element, index) => {
                        return <div
                            key={`[form array element][${index}]`}
                            className="form-array-el"
                        >
                            <input
                                id={`${index}`}
                                name={`${index}`}
                                className="form-array-input"
                                value={element}
                                onChange={handleTabElChange}
                            ></input>
                            <button className='form-array-delete' onClick={(e) => { deleteTabEl(e, index) }}>X</button>
                        </div>
                    })
                }
                <button onClick={addTabEl}>Add</button>
            </div>
        </>
    )
}
