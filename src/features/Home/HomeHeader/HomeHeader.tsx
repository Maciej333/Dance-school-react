import React, { memo } from 'react'
import './HomeHeader.style.scss';

const HomeHeaderWraper = (props: { name: string }) => {
    return (
        <div className='header-wrapper'>
            <div className='line line-left' />
            <div className='header'>
                <h2>{props.name}</h2>
            </div>
            <div className='line line-right' />
        </div>
    )
}

const HomeHeader = memo(HomeHeaderWraper);
export default HomeHeader;
