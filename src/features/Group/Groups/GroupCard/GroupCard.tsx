import React from 'react';
import { Group, GroupChoreo, GroupCourse } from '../../../../app/model/group.model';
import './GroupCard.style.scss';

export default function GroupCard(props: { group: Group | GroupCourse | GroupChoreo }) {

    const { group } = props;

    return (
        <div className='group-card'>
            <div className='card-header'>
                {
                    group.name ?
                        (group as GroupChoreo).name
                        :
                        (typeof group.danceStyle === "string" ? group.danceStyle : group.danceStyle.name) + " " + group.danceLevel
                }
            </div>
            <div className='card-content'>
                <span>
                    {typeof group.location === "string" ? group.location : group.location.adress}
                </span>
                <span>
                    {group.genderList.join(' & ')}
                </span>
                {group.classroomStartTime ? <span>{(group as GroupCourse).classroomStartTime}</span> : ''}
            </div>
        </div>
    )
}
