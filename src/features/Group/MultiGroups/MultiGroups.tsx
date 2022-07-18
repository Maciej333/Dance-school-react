import React, { useEffect, useState } from 'react';
import FilterAndResult from '../../../app/components/FilterAndResult/FilterAndResult';
import GroupsFilter, { initFilters } from './GroupsFilter/GroupsFilter';
import Groups from './Groups/Groups'
import GroupsMenu, { TGroupAll, TGroupInstructor, TGroupStudent } from './GroupsMenu/GroupsMenu';
import { useLocation } from 'react-router-dom';
import { getAllGroups, getInstructorGroups, getOpenGroups, getStudentGroups } from "../../../app/api/group.api";

export default function MultiGroups() {

    const { state } = useLocation();
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

    return (
        <FilterAndResult
            Menu={<GroupsMenu />}
            Form={GroupsFilter}
            Result={Groups(() => getGroupsType)}
            initFilters={initFilters}
        />
    )
}
