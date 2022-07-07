import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hook/store.hook';
import { selectAuth } from '../../../store/auth/authSlice';
import { UserRole } from '../../../utils/enum/UserRole.enum';

export default function ProtectedLink(props: { name: string, to: string, auths: number[] }) {

    const { name, to, auths } = props;
    const { roles } = useAppSelector(selectAuth).user;

    let inRole = false;

    roles.forEach(role => {
        if (auths.includes(+UserRole[role])) {
            inRole = true;
        }
    })

    if (inRole) {
        return <NavLink to={to}>{name}</NavLink>
    }

    return null;
}
