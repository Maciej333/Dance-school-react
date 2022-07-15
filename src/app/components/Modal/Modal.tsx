import React, { memo } from 'react';
import './Modal.style.scss';

const ModalComponent = (props: { show: boolean, closeModal: () => void, content: JSX.Element | null }) => {

    const { show, content } = props;

    return (
        show ?
            <div className='modal'>
                <div className='content'>
                    <button className='btn' onClick={() => props.closeModal()}>X</button>
                    {content}
                </div>
            </div>
            :
            null
    )
}

const Modal = memo(ModalComponent);
export default Modal;