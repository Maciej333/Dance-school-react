import React from 'react';
import { DanceStyle } from '../../../../app/model/danceStyle.model';
import './StyleCard.style.scss';

export default function StyleCard(props: { element: DanceStyle }) {
    const { element } = props;
    return (
        <div className='style-card'>
            <h3>{element.name}</h3>
        </div>
    )
}
