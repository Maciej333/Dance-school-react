import React from 'react';
import './FooterContact.style.scss';

export default function FooterContact() {
    return (
        <div className='footer-section footer-contact'>
            <h3>Contact</h3>
            <a href="tel:+XXX-ZZZ-YYY" style={{ marginTop: '0px' }}><span>ICON</span>111-222-ZZZ</a>
            <a href="mailto: abc@danceXYZ.zzz"><span>ICON</span>dance.school@dance.com</a>
            <a href="https://pl-pl.facebook.com/"><span>ICON</span>facebook</a>
            <a href="https://www.instagram.com/"><span>ICON</span>instagram</a>
        </div>
    )
}
