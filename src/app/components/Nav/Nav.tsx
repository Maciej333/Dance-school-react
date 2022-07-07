import React, { MouseEvent, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Nav.style.scss';
import User from './User/User'
import ProtectedLink from './ProtectedLink/ProtectedLink';
import { UserRole } from '../../utils/enum/UserRole.enum';
import MultiLink from './MultiLink/MultiLink';


export default function Nav() {

    const location = useLocation();
    const [show, setShow] = useState(true);
    const [navType, setNavType] = useState("nav-relative");
    const [btnColor, setBtnColor] = useState("#15133C");

    useEffect(() => {
        if (location.pathname === "/") {
            setNavType("nav-fixed");
        } else {
            setNavType("nav-relative");
        }
        if (location.pathname === "/") {
            setBtnColor("#F1EEE9");
        } else {
            setBtnColor("#15133C");
        }
    }, [location.pathname])

    const handleClick = () => {
        setShow(prev => !prev);
    }

    const closeLinks = (e: MouseEvent<HTMLDivElement>) => {
        const element = e.target;
        if ((element as HTMLElement).tagName === 'A')
            setShow(false);
    }

    return (
        <nav className={`nav ${navType}`}>
            <div className='menu-btn' >
                <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 377 377"
                    onClick={handleClick}
                    style={{ fill: show ? "#15133C" : btnColor }}
                >
                    <rect x="75" y="73.5" width="302" height="30" />
                    <rect y="73.5" width="30" height="30" />
                    <rect y="273.5" width="30" height="30" />
                    <rect x="75" y="273.5" width="302" height="30" />
                    <rect y="173.5" width="30" height="30" />
                    <rect x="75" y="173.5" width="302" height="30" />
                </svg>
            </div>

            <div className={`menu-links ${show ? "show" : "right"}`} onClick={closeLinks}>
                <div className='links'>
                    <NavLink to="/">home</NavLink>

                    <MultiLink
                        name="multi"
                        links={[
                            <NavLink to="/2">link 1</NavLink>,
                        ]}
                    />
                    <NavLink to="/1">link</NavLink>

                    <ProtectedLink to="/3" name="link 2" auths={[UserRole.STUDENT]} />
                </div>
                <User />
            </div>
        </nav >
    )
}
