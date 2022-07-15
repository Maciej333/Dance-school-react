import React from 'react'
import { Group, GroupChoreo, GroupCourse } from '../../../../../app/model/group.model'

export default function GroupData(props: { group: Group | GroupCourse | GroupChoreo | undefined }) {

    const { group } = props;

    return (
        <div className='flex'>
            <h3>Datas</h3>
            <span>style:</span>
            <span>{group?.danceStyle && typeof group.danceStyle !== 'string' && group.danceStyle.name}</span>
            <span>level:</span>
            <span>{group?.danceLevel}</span>
            <span>location:</span>
            <span>{typeof group?.location === "string" ? group.location : group?.location.adress}</span>
            <span>gender:</span>
            <span>{group?.genderList.join(" & ")}</span>
            <span>created at:</span>
            <span>{group?.createDate ? new Date(group.createDate).toLocaleDateString() : ""}</span>
            {
                group && !group?.name ?
                    <>
                        <span>day:</span>
                        <span>{(group as GroupCourse).classroomDay}</span>
                        <span>start:</span>
                        <span>{new Date('2000-01-01 ' + group.classroomStartTime).toLocaleTimeString().substring(0, 5)}</span>
                        <span>duration:</span>
                        <span>{(group as GroupCourse).classroomDuration} min</span>
                    </>
                    :
                    null
            }
        </div>
    )
}
