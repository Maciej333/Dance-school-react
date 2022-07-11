import React from 'react';
import { getSchoolAnns } from '../../../../app/api/announcement.api';
import { withApi } from '../../../../app/hoc/withApi';
import { Announcement } from '../../../../app/model/announcement.model';
import './Jumbotron.style.scss';

const JumbotronComponent = (props: { apiData?: Announcement[] }) => {
    const { apiData } = props;

    return (
        apiData && apiData.length > 0 ?
            <div className='jumbotron'>
                <div className='news'>news !</div>
                <div className='content'>{apiData[0].text}</div>
            </div>
            :
            null
    )
}

const Jumbotron = withApi(JumbotronComponent, '', getSchoolAnns);
export default Jumbotron;