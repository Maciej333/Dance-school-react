import React, { useContext } from 'react';
import './ModalMsg.style.scss';
import { ModalContext } from '../../../App';

export default function ModalMsg(props: { content: string }) {

    const modalContext = useContext(ModalContext);

    return (
        <div className="modal-msg">
            <div className="content">
                <button className="btn modal-close" onClick={() => modalContext.setValue('')}>
                    X
                </button>
                <p className='content-msg'>
                    {modalContext.value}
                </p>
            </div>
        </div>
    )
}
