import React, { useState } from 'react';
import './SingleElement.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

export default function SingleElement(props: { Operations: React.ComponentType<{ openModal: (content: JSX.Element) => void }> | null, children: JSX.Element | null }) {

    const { Operations, children } = props;
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const handleReturn = () => {
        navigate(-1);
    }

    const handleOpen = (content: JSX.Element) => {
        setShowModal(true);
        setModalContent(content);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className='single-element'>
                {
                    Operations ?
                        <div className='operations'>
                            <FontAwesomeIcon icon={faLeftLong} className="return-btn" onClick={handleReturn} />
                            <div className='operations-btn-wrapper'>
                                <button className='btn operations-btn' onClick={() => setShow(prev => !prev)}>Operations</button>
                                <div className={`operations-list ${show ? "show" : ""}`}>
                                    <Operations openModal={handleOpen} />
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
            <Modal show={showModal} closeModal={handleClose} content={modalContent} />
        </>
    )
}
