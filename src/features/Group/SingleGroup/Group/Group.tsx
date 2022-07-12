import React from 'react'
import { getGroup } from '../../../../app/api/group.api'
import { withApi } from '../../../../app/hoc/withApi'
import { Group as MainGroup, GroupChoreo, GroupCourse } from '../../../../app/model/group.model'

const GroupComponent = (props: { apiData?: MainGroup | GroupCourse | GroupChoreo }) => {
    return (
        <div>
            Group
            {props.apiData?.danceLevel}
        </div>
    )
}

export const funGroup = (param: number) => {
    const Group = withApi(GroupComponent, "Cannot fetch group data", getGroup, param);
    return <Group />
}