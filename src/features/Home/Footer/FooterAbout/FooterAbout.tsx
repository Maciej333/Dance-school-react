import React from 'react';
import { NavLink } from 'react-router-dom';
import './FooterAbout.style.scss';

export default function FooterAbout() {
    return (
        <div className='footer-section footer-about'>
            <h3>About US</h3>
            <p>We are the group of people who love to share their passion with others! If You want to experience an amazing adventure just join us!</p>
            <NavLink to="/group"><span>ICON</span>Our groups!</NavLink>
        </div>
    )
}
