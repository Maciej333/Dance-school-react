import React, { MouseEvent, useState } from 'react';
import './FilterAndResult.style.scss';

const noCloseClass = "no-close";

export default function FilterAndResult(
    props: {
        Form: React.ComponentType<{ setFilters: (data: Object) => void }>,
        Result: React.ComponentType<{ filters: any }>,
        initFilters: Object
    }
) {

    const { Form, Result, initFilters } = props;
    const [show, setShow] = useState(false);
    const [filters, setFilters] = useState(initFilters);

    const handleFilters = (object: Object) => {
        setFilters(object);
    }

    const handleClose = (e: MouseEvent) => {
        if (!((e.target as HTMLElement).classList.contains(noCloseClass))) {
            setShow(false);
        }
    }

    return (
        <div className='filter-result'>
            <div className={`filter ${show ? 'show' : ''}`} onSubmit={() => setShow(false)}>
                <button className='btn fixed-btn' onClick={() => setShow(false)}>X</button>
                {
                    Form ? <Form setFilters={handleFilters} /> : null
                }
            </div>

            <div className='result' onClick={handleClose}>
                <button className={`btn fixed-btn ${noCloseClass}`} onClick={() => setShow(true)}>filters</button>
                {
                    Result ? <Result filters={filters} /> : null
                }
            </div>
        </div >
    )
}
