import React, { useState } from 'react';
import './SingleElementOperations.style.scss';

export default function SingleElementOperations(props: { Operations: JSX.Element }) {

    const { Operations } = props;
    const [show, setShow] = useState(false);

    return (
        <div className="operations-btn-wrapper">
            <button
                className="btn operations-btn"
                onClick={() => setShow((prev) => !prev)}
            >
                Operations
            </button>
            <div
                className={`operations-list ${show ? "show" : ""
                    }`}
            >
                {Operations}
            </div>
        </div>
    )
}
