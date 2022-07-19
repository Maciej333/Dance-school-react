import React, { createContext, useState } from "react";
import "./SingleElement.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

export const SingleElementContext = createContext({
    openModal: (content: JSX.Element) => { },
    closeModal: () => { },
});

export default function SingleElement(props: {
    Operations: JSX.Element;
    toNavigate: string,
    children: JSX.Element;
}) {
    const { Operations, toNavigate, children } = props;
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

    const handleOpen = (content: JSX.Element) => {
        setModalContent(content);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleReturn = () => {
        navigate(toNavigate);
    };

    return (
        <>
            <SingleElementContext.Provider value={{ openModal: handleOpen, closeModal: handleClose }}>
                <div className="single-element">
                    <div className="operations">
                        {
                            toNavigate ?
                                <FontAwesomeIcon
                                    icon={faLeftLong}
                                    className="return-btn"
                                    onClick={handleReturn}
                                />
                                :
                                <span></span>
                        }
                        {
                            Operations ?
                                Operations
                                :
                                null
                        }
                    </div>
                    <div className="children">{children}</div>
                </div>
            </SingleElementContext.Provider>
            <Modal
                show={showModal}
                closeModal={handleClose}
                content={modalContent}
            />
        </>
    );
}
