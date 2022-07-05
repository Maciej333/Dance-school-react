import React from 'react'
import { NavLink } from 'react-router-dom';
import './Nav.style.scss';
import User from './User/User'

export default function Nav() {
    return (
        <nav className='nav'>
            <div className='links'>
                <NavLink to="/">link</NavLink>
            </div>
            <User />
        </nav>
    )
}
