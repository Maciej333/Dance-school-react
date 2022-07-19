import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../../../App';
import { unregisterStudentFromGroup } from '../../../../../app/api/group.api';
import { useAppSelector } from '../../../../../app/hook/store.hook';
import { selectAuth } from '../../../../../app/store/auth/authSlice';

export default function OperationUnregisterFromGroup(props: {
    closeModal: () => void;
    groupId: number;
}) {
    const { groupId } = props;
    const navigate = useNavigate();
    const { user } = useAppSelector(selectAuth);
    const { setValue } = useContext(ModalContext);

    const [error, setError] = useState("");

    useEffect(() => {
        unregisterStudentFromGroup(groupId, user.student?.id ? user.student.id : -1)
            .then(data => {
                navigate(`/group/${groupId}`);
                setValue("Unregistered successfully");
            })
            .catch(err => {
                setError("Cannot register to group");
            })
    }, []);

    return (
        <div>
            <p style={{ color: '#ff0000', fontWeight: '650' }}>{error}</p>
        </div>
    )
}
