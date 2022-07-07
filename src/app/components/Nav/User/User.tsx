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
                    <>
                        <NavLink to="/" className="profile">
                            <span>{user.user.firstname}</span>
                            <span>{user.user.lastname}</span>
                        </NavLink>
                        <button className='btn' onClick={handleLogout}>LOGOUT</button>
                    </>
                    :
                    <NavLink to="/auth/login">login</NavLink>

            }
        </div>
    )
}
