import React, { useEffect, useState } from 'react';
import FilterAndResult from '../../../app/components/FilterAndResult/FilterAndResult';
import GroupsFilter, { initFilters } from './GroupsFilter/GroupsFilter';
import Groups from './Groups/Groups'
import GroupsMenu, { TGroupAll, TGroupInstructor, TGroupOpen, TGroupStudent } from './GroupsMenu/GroupsMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllGroups, getInstructorGroups, getOpenGroups, getStudentGroups } from "../../../app/api/group.api";
import { useAppSelector } from '../../../app/hook/store.hook';
import { selectAuth } from '../../../app/store/auth/authSlice';

export default function MultiGroups() {

    const { role } = useAppSelector(selectAuth);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [getGroupsType, setGetGroupsType] = useState(getOpenGroups);

    useEffect(() => {
        const typeState = state as { api: string, userId: number };
        if (typeState) {
            switch (typeState.api) {
                case TGroupStudent:
                    setGetGroupsType(getStudentGroups(typeState.userId));
                    break;
                case TGroupInstructor:
                    setGetGroupsType(getInstructorGroups(typeState.userId));
                    break;
                case TGroupAll:
                    setGetGroupsType(getAllGroups);
                    break;
                default:
                    setGetGroupsType(getOpenGroups);
                    break;
            }
        }
    }, [state]);

    useEffect(() => {
        navigate("/group", {
            state: {
                api: TGroupOpen,
                userId: 0
            }
        });
    }, [navigate, role]);

    return (
        <FilterAndResult
            Menu={<GroupsMenu />}
            Form={GroupsFilter}
            Result={Groups(() => getGroupsType)}
            initFilters={initFilters}
        />
    )
}
