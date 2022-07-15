import React from 'react';
import ProtectedOperation from '../../../../app/components/SingleElement/ProtectedOperation/ProtectedOperation';
import { UserRole } from '../../../../app/utils/enum/UserRole.enum';

export default function GroupOperations(props: { openModal: (content: JSX.Element) => void }) {

    const modalABC = <p>ABC</p>
    const handleShowABC = () => {
        props.openModal(modalABC);
    }
    const modalDirector = <p>DIRECTOR</p>
    const handleShowDirector = () => {
        props.openModal(modalDirector);
    }

    return (
        <>
            <button className='btn' onClick={handleShowABC}>ABC</button>
            <ProtectedOperation roles={[UserRole.DIRECTOR]} onClick={handleShowDirector} name="director" />
        </>
    )
}
