import React, { useEffect, useState } from 'react'
import { getOpenGroups } from '../../../app/api/group.api';
import { withApi } from '../../../app/hoc/withApi';
import { Group } from '../../../app/model/group.model';
import { groupFilters, initFilters } from '../GroupFilter/GroupFilter';

const GroupsComponent = (props: { apiData?: Group[], filters: groupFilters }) => {

    const { apiData, filters } = props;
    const [groupsData, setGroupsData] = useState<Group[]>([]);

    useEffect(() => {
        if (apiData) {
            if (filters === initFilters) {
                setGroupsData(apiData);
            } else {
                const groups = apiData
                    .filter(el => {
                        if (filters.style !== "") {
                            const elStyle = (typeof el.danceStyle === "string") ? el.danceStyle : el.danceStyle.name;
                            if (elStyle !== filters.style)
                                return false;
                        }
                        if (filters.level !== "") {
                            if (el.danceLevel !== filters.level)
                                return false;
                        }
                        if (filters.location !== "") {
                            const elLocation = (typeof el.location === "string") ? el.location : el.location.adress;
                            if (elLocation !== filters.location)
                                return false;
                        }
                        if (filters.gender !== "") {
                            if (!el.genderList.includes(filters.gender))
                                return false;
                        }
                        return true;
                    });
                setGroupsData(groups);
            }
        }
    }, [apiData, filters])

    return (
        <div className='groups'>
            {
                groupsData.length > 0 && groupsData
                    .map((el, id) => {
                        return <p
                            key={`[groups] = ${id}`}
                            style={{ backgroundColor: "red", padding: "20px" }}
                        >
                            {typeof el.danceStyle === "string" ? el.danceStyle : el.danceStyle.name}<br />
                            {el.danceLevel}<br />
                            {typeof el.location === "string" ? el.location : el.location.adress}<br />
                            {el.genderList}<br />
                        </p>
                    })
            }
        </div >
    )
}

const Groups = withApi(GroupsComponent, "Cannot fetch groups data", getOpenGroups);
export default Groups;