import React, { memo } from 'react';
import { useAppSelector } from '../../../hook/store.hook';
import { selectAuth } from '../../../store/auth/authSlice';
import { UserRole } from '../../../utils/enum/UserRole.enum';

const ProtectedOperationComponent = (props: { roles: UserRole[], onClick: () => void, name: string }) => {

    const { role } = useAppSelector(selectAuth);

    let isRole = false;
    if (role && props.roles.includes(+UserRole[role])) {
        isRole = true;
    }

    const handleClick = () => {
        props.onClick();
    }

    return (
        isRole ?
            <button className='btn' onClick={handleClick}>{props.name}</button>
            :
            null
    )
}

const ProtectedOperation = memo(ProtectedOperationComponent);
export default ProtectedOperation;