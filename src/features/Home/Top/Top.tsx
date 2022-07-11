import React from 'react';
import Jumbotron from './Jumbotron/Jumbotron';
import './Top.style.scss';

export default function Top() {
    return (
        <div className='top'>
            <div className='main-header'>
                <p>Our <span>passion</span></p>
                <p>Your <span>Happiness !</span></p>
            </div>
            <Jumbotron />
        </div>
    )
}
