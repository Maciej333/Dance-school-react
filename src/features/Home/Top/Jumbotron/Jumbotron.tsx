import React, { useEffect, useState } from 'react';
import { getSchoolAnns } from '../../../../app/api/announcement.api';
import { Announcement } from '../../../../app/model/announcement.model';
import './Jumbotron.style.scss';

export default function Jumbotron() {

    const [anns, setAnns] = useState<Announcement[]>([]);

    useEffect(() => {
        getSchoolAnns()
            .then(res => {
                setAnns(res.data);
            })
    }, []);

    return (
        anns && anns.length > 0 ?
            <div className='jumbotron'>
                <div className='news'>news !</div>
                <div className='content'>{anns[0].text}</div>
            </div>
            :
            null
    )
}
