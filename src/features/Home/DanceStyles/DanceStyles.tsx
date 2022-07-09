import React, { useEffect, useState } from 'react';
import { getDanceStyles } from '../../../app/api/danceStyle.api';
import CardCarousel from '../../../app/components/CardCarousel/CardCarousel';
import { withApi } from '../../../app/hoc/withApi';
import { DanceStyle } from '../../../app/model/danceStyle.model';
import './DanceStyles.style.scss';
import StyleCard from './StyleCard/StyleCard';

const DanceStylesComponent = (props: { apiData?: any }) => {

  const [danceStyles, setDanceStyles] = useState<DanceStyle[]>([]);

  useEffect(() => {
    if (props.apiData) {
      setDanceStyles(props.apiData);
    }
  }, [props])

  return (
    <div className='dance-styles'>
      <CardCarousel
        cards={danceStyles}
        cardComponent={StyleCard}
      />
    </div>
  )
}
const DanceStyles = withApi(DanceStylesComponent, "Cannot fetch dance styles from server", getDanceStyles);
export default DanceStyles;