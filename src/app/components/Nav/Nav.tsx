import React, { MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.style.scss';
import User from './User/User'
import MenuSVG from './menu.svg';
import ProtectedLink from './ProtectedLink/ProtectedLink';
import { UserRole } from '../../utils/enum/UserRole.enum';
import MultiLink from './MultiLink/MultiLink';


export default function Nav() {

    const [show, setShow] = useState(true);

    const handleClick = () => {
        setShow(prev => !prev);
    }

    const closeLinks = (e: MouseEvent<HTMLDivElement>) => {
        const element = e.target;
        if ((element as HTMLElement).tagName === 'A')
            setShow(false);
    }

    return (
        <nav className={`nav`}>
            <div className='menu-btn'>
                <img src={MenuSVG} alt="menu" onClick={handleClick} />
            </div>

            <div className={`menu-links ${show ? "show" : "right"}`} onClick={closeLinks}>
                <div className='links'>
                    <NavLink to="/1">link</NavLink>

                    <MultiLink
                        name="multi"
                        links={[
                            <NavLink to="/2">link 1</NavLink>,
                        ]}
                    />
                    <ProtectedLink to="/3" name="link 2" auths={[UserRole.STUDENT]} />
                </div>
                <User />
            </div>
        </nav>
    )
}
