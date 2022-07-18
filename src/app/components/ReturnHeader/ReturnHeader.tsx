import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import './ReturnHeader.style.scss';
import { useNavigate, useParams } from 'react-router-dom';

export default function ReturnHeader(props: { toNavigate: string, name: string, withProp?: boolean }) {

    const { toNavigate, withProp, name } = props;

    const navigate = useNavigate();
    const { id } = useParams();

    const handleReturn = () => {
        navigate(`${toNavigate}${withProp ? "/" + id : ''}`);
    };

    return (
        <div className='return-header'>
            <FontAwesomeIcon
                icon={faLeftLong}
                className="return-btn"
                onClick={handleReturn}
            />
            <h2 className='return-header-name'>
                {name}
            </h2>
            <span></span>
        </div>
    )
}
