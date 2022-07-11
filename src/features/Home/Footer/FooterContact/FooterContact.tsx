import React from 'react';
import './FooterContact.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function FooterContact() {
    return (
        <div className='footer-section footer-contact'>
            <h3>Contact</h3>
            <a href="tel:+XXX-ZZZ-YYY" style={{ marginTop: '0px' }}><FontAwesomeIcon icon={faPhone} />111-222-ZZZ</a>
            <a href="mailto: abc@danceXYZ.zzz"><FontAwesomeIcon icon={faEnvelope} />dance.school@dance.com</a>
            <a href="https://pl-pl.facebook.com/"><FontAwesomeIcon icon={faFacebook} />facebook</a>
            <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} />instagram</a>
        </div>
    )
}
