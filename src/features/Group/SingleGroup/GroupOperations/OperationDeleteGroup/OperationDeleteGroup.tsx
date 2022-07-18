import React, { useContext, useState } from 'react';
import './OperationDeleteGroup.style.scss';
import { useNavigate } from 'react-router-dom';
import { deleteGroup } from '../../../../../app/api/group.api';
import ErrorLine from '../../../../../app/components/ErrorLine/ErrorLine';
import { ModalContext } from '../../../../../App';

export default function OperationDeleteGroup(props: {
    closeModal: () => void;
    groupId: number
}) {

    const { setValue } = useContext(ModalContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleConfirm = () => {
        deleteGroup(props.groupId)
            .then(data => {
                navigate("/group");
                setValue("Group was deleted")
            })
            .catch(err => {
                setError("Error deleting group")
            })
    }

    return (
        <>
            {
                error ?
                    <ErrorLine msg={error} />
                    :
                    null
            }
            <div className='operation-delete-group'>
                <p className='delete-content'>Delete the group ?</p>
                <button className='btn' onClick={handleConfirm}>Confirm</button>
            </div>
        </>

    )
}
