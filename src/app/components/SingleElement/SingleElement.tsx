import React, { useState } from 'react';
import './SingleElement.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function SingleElement(props: { Operations: React.ComponentType | null, children: JSX.Element | null }) {

    const { Operations, children } = props;
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleReturn = () => {
        navigate(-1);
    }
    return (
        <div className='single-element'>
            {
                Operations ?
                    <div className='operations'>
                        <FontAwesomeIcon icon={faLeftLong} className="return-btn" onClick={handleReturn} />
                        <div className='operations-btn-wrapper'>
                            <button className='btn operations-btn' onClick={() => setShow(prev => !prev)}>Operations</button>
                            <div className={`operations-list ${show ? "show" : ""}`}>
                                <Operations />
                            </div>
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
