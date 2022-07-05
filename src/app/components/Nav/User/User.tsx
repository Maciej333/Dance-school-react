import React from 'react';
import './User.style.scss';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook/store.hook'
import { logout, selectAuth } from '../../../store/auth/authSlice'

export default function User() {

    const user = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className='user'>
            {
                user.user.id >= 0 ?
                    <div>
                        <p>{user.user.id}</p>
                        <p>{user.user.firstname}</p>
                        <p>{user.user.lastname}</p>
                        <button onClick={handleLogout}>LOGOUT</button>
                    </div>
                    :
                    <NavLink to="login">login</NavLink>

            }
        </div>
    )
}
