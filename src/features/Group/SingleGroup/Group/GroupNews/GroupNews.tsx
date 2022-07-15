import React, { useEffect, useState } from 'react';
import './GroupNews.style.scss';
import { Announcement } from '../../../../../app/model/announcement.model';
import { getGroupAnns } from '../../../../../app/api/announcement.api';

export default function GroupNews(props: { userId: number, groupId: number }) {

    const { userId, groupId } = props;
    const [groupNews, setGroupNews] = useState<Announcement[]>([]);

    useEffect(() => {
        if (userId > -1 && groupId > -1) {
            getGroupAnns(groupId)
                .then(data => {
                    setGroupNews(data.data);
                })
        }
    }, [userId, groupId])

    return (
        <div className={`flex ${userId > -1 && groupNews.length > 0 ? 'show' : 'hide'}`}>
            {
                groupNews.length > 0 ?
                    <>
                        <h3>News</h3>
                        {
                            groupNews.map((el, id) => {
                                return <p key={`[group news] = ${id}`}>{el.text}</p>
                            })
                        }
                    </>
                    :
                    null
            }
        </div>
    )
}
