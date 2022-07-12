import React from 'react'
import FilterAndResult from '../../app/components/FilterAndResult/FilterAndResult'
import GroupFilter, { initFilters } from './GroupFilter/GroupFilter'
import Groups from './Groups/Groups'

export default function Group() {
    return (
        <FilterAndResult
            Form={GroupFilter}
            Result={Groups}
            initFilters={initFilters}
        />
    )
}
