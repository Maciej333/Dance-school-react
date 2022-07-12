import React, { ChangeEvent, FormEvent, useState } from 'react'

const initFilters = {
    name: ""
}

export default function GroupFilter(props: { setFilters: (data: Object) => void }) {

    const [formData, setFormData] = useState({
        name: ""
    })

    const hangleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleClear = () => {
        setFormData(initFilters);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.setFilters(formData);
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <button className='form-clear' onClick={handleClear}>Clear</button>

            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={formData.name} onChange={hangleChange} />

            <button type='submit'>Submit</button>
        </form>
    )
}
