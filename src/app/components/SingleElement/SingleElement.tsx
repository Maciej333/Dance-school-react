import React, { useState } from 'react';
import './SingleElement.style.scss';

export default function SingleElement(props: { Operations: React.ComponentType | null, children: JSX.Element | null }) {

    const { Operations, children } = props;

    const [show, setShow] = useState(false);

    return (
        <div className='single-element'>
            {
                Operations ?
                    <div className='operations'>
                        <button className='btn operations-btn' onClick={() => setShow(prev => !prev)}>Operations</button>
                        <div className={`operations-list ${show ? "show" : ""}`}>
                            <Operations />
                        </div>
                    </div>
                    :
                    null
            }
            <div className='children'>
                {
                    children
                }
            </div>
        </div>
    )
}
