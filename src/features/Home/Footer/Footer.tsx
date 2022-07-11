import React from 'react';
import './Footer.style.scss';
import FooterAbout from './FooterAbout/FooterAbout';
import FooterContact from './FooterContact/FooterContact';
import FooterLocations from './FooterLocations/FooterLocations';

export default function Footer() {
  return (
    <div className='footer'>
      <FooterAbout />
      <FooterContact />
      <FooterLocations />
    </div>
  )
}
