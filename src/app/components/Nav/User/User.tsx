import React from 'react';
import './User.style.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook/store.hook';
import { changeRole, logout, selectAuth } from '../../../store/auth/authSlice';

export default function User() {

    const navigate = useNavigate();
    const { role, user } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const handleChangeRole = () => {
        const { roles } = user;
        if (roles.length === 2) {
            if (roles[0] === role) {
                dispatch(changeRole(roles[1]));
            }
            if (roles[1] === role) {
                dispatch(changeRole(roles[0]));
            }
        }
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth/login");
    }

    return (
        <div className='user'>
            {
                user.id >= 0 ?
                    <>
                        <div className='user-grouping'>
                            <NavLink to="/profile" className="profile">
                                <span>{user.firstname}</span>
                                <span>{user.lastname}</span>
                            </NavLink>
                            {
                                user.roles.length > 1 ?
                                    <div className='user-roles'>
                                        <span className='role'>{role}</span>
                                        <button className='btn' onClick={handleChangeRole}>Change</button>
                                    </div>

                                    :
                                    null
                            }
                        </div>
                        <button className='btn' onClick={handleLogout}>LOGOUT</button>
                    </>
                    :
                    <NavLink to="/auth/login">login</NavLink>

            }
        </div>
    )
}
