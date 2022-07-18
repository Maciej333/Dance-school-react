import React, { useState } from 'react';
import './OperationDeleteGroup.style.scss';
import { useNavigate } from 'react-router-dom';
import { deleteGroup } from '../../../../../app/api/group.api';
import ErrorLine from '../../../../../app/components/ErrorLine/ErrorLine';

export default function OperationDeleteGroup(props: {
    closeModal: () => void;
    groupId: number
}) {

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleConfirm = () => {
        deleteGroup(props.groupId)
            .then(data => {
                navigate("/group");
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
