import { lazy } from 'react';
import './Group.style.scss';
import { getGroup } from '../../../../app/api/group.api'
import { withApi } from '../../../../app/hoc/withApi'
import { Group as MainGroup, GroupChoreo, GroupCourse } from '../../../../app/model/group.model';
import { useAppSelector } from '../../../../app/hook/store.hook';
import { selectAuth } from '../../../../app/store/auth/authSlice';
import GroupInstructors from './GroupInstructors/GroupInstructors';
import GroupData from './GroupData/GroupData';

const GroupNews = lazy(() => import('./GroupNews/GroupNews'));

const GroupComponent = (props: { apiData?: MainGroup | GroupCourse | GroupChoreo }) => {

    const { apiData } = props;
    const danceStyle = apiData?.danceStyle && typeof apiData.danceStyle !== 'string' && apiData.danceStyle.name;
    const { id } = useAppSelector(selectAuth).user;

    return (
        <div className='group-component'>
            <h2
                style={{
                    backgroundImage: `linear-gradient(-15deg, rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.70)), url("/images/${danceStyle}.jpg")`
                }}
            >
                {
                    apiData && apiData?.name ?
                        (apiData as GroupChoreo).name
                        :
                        apiData?.danceLevel ?
                            `${danceStyle} ${apiData.danceLevel}`
                            :
                            null
                }
            </h2>

            <div className='content'>
                <GroupInstructors instructors={apiData?.instructors ? apiData.instructors : []} />
                <GroupData group={apiData} />
                <GroupNews userId={id} groupId={apiData?.id ? apiData.id : -1} />
            </div>
        </div>
    )
}

export const funGroup = (param: number) => {
    const Group = withApi(GroupComponent, "Cannot fetch group data", getGroup, param);
    return <Group />
}