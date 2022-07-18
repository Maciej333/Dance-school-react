import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import './ReturnHeader.style.scss';
import { useNavigate } from 'react-router-dom';

export default function ReturnHeader(props: { name: string }) {

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    };

    return (
        <div className='return-header'>
            <FontAwesomeIcon
                icon={faLeftLong}
                className="return-btn"
                onClick={handleReturn}
            />
            <h2 className='return-header-name'>
                {props.name}
            </h2>
            <span></span>
        </div>
    )
}
