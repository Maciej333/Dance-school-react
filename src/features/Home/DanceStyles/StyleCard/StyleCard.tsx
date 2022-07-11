import React, { memo } from 'react';
import { DanceStyle } from '../../../../app/model/danceStyle.model';
import './StyleCard.style.scss';

const StyleCardComponent = (props: { element: DanceStyle }) => {
    const { element } = props;
    return (
        <div className='style-card'>
            <h3 className='name'>{element.name}</h3>
            <p className='country'>{element.countryOfOrigin}</p>
            <div className='description'>{element.description}</div>
            <div className='shadow'></div>
        </div>
    )
}
const StyleCard = memo(StyleCardComponent);
export default StyleCard;