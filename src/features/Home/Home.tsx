import React from 'react';
import DanceStyles from './DanceStyles/DanceStyles';
import Footer from './Footer/Footer';
import './Home.style.scss';
import HomeHeader from './HomeHeader/HomeHeader';
import Instructors from './Instructors/Instructors';
import Top from './Top/Top';

export default function Home() {
    return (
        <div
            className='home'
            style={{
                backgroundImage: `linear-gradient(-15deg, rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.80)), url("/images/home.jpg")`
            }}
        >

            <Top />
            <HomeHeader name="Our styles!" />
            <DanceStyles />
            <HomeHeader name="Our instructors!" />
            <Instructors />
            <Footer />
        </div>
    )
}
