import React from 'react';
import './Top.style.scss';

export default function Top() {
    return (
        <div
            className='top'
            style={{ backgroundImage: `linear-gradient(-15deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), url("/images/home.jpg")` }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
                <path d="M0 575L25 573.2C50 571.3 100 567.7 150 564.7C200 561.7 250 559.3 300 559.8C350 560.3 400 563.7 450 566.5C500 569.3 550 571.7 600 574.7C650 577.7 700 581.3 750 582C800 582.7 850 580.3 875 579.2L900 578L900 601L875 601C850 601 800 601 750 601C700 601 650 601 600 601C550 601 500 601 450 601C400 601 350 601 300 601C250 601 200 601 150 601C100 601 50 601 25 601L0 601Z"></path>
            </svg>
        </div>
    )
}
