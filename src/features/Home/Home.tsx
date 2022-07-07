import React from 'react';
import DanceStyles from './DanceStyles/DanceStyles';
import Footer from './Footer/Footer';
import './Home.style.scss';
import Instructors from './Instructors/Instructors';
import Top from './Top/Top';

export default function Home() {
    return (
        <div className='home'>
            <Top />
            <DanceStyles />
            <Instructors />
            <Footer />
        </div>
    )
}
