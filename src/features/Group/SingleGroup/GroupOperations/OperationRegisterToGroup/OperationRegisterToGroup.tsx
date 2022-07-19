import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../../../App';
import { registerStudentToGroup } from '../../../../../app/api/group.api';
import { useAppSelector } from '../../../../../app/hook/store.hook';
import { selectAuth } from '../../../../../app/store/auth/authSlice';

export default function OperationRegisterToGroup(props: {
    closeModal: () => void;
    groupId: number;
}) {
    const { groupId } = props;
    const navigate = useNavigate();
    const { user } = useAppSelector(selectAuth);
    const { setValue } = useContext(ModalContext);

    const [error, setError] = useState("");

    useEffect(() => {
        registerStudentToGroup(groupId, user.student?.id ? user.student.id : -1)
            .then(data => {
                if (data.data.status === 200) {
                    navigate(`/group/${groupId}`);
                    setValue("Registered successfully");
                }
                if (data.data.status === 502) {
                    setError("Cannot register to group, insufficient level");
                }
                if (data.data.status === 501) {
                    setError("Cannot register to group, gender don't match");
                }
                if (data.data.status === 500) {
                    setError("Cannot register to group");
                }
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
