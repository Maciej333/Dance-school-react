import React from 'react';
import FilterAndResult from '../../../app/components/FilterAndResult/FilterAndResult';
import GroupsFilter, { initFilters } from './GroupsFilter/GroupsFilter';
import Groups from './Groups/Groups'
import GroupsMenu from './GroupsMenu/GroupsMenu';

export default function MultiGroups() {
    return (
        <FilterAndResult
            Menu={<GroupsMenu />}
            Form={GroupsFilter}
            Result={Groups}
            initFilters={initFilters}
        />
    )
}
