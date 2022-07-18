import React, { useEffect, useState } from "react";
import { getGroup } from "../../../app/api/group.api";
import SingleElement from "../../../app/components/SingleElement/SingleElement";
import SingleElementByIdParam from "../../../app/components/SingleElement/SingleElementByIdParam/SingleElementByIdParam";
import { Group as TGroup } from "../../../app/model/group.model";
import Group from "./Group/Group";
import GroupOperations from "./GroupOperations/GroupOperations";

export default function SingleGroup() {
    return (
        <SingleElementByIdParam
            component={SingleGroupInteriorComponent}
            method={getGroup}
        />
    );
}

const SingleGroupInteriorComponent = (props: { apiData?: any }) => {
    const { apiData } = props;

    const [group, setGroup] = useState<TGroup | null>(null);

    useEffect(() => {
        if (apiData) {
            setGroup(apiData);
        }
    }, [apiData]);

    return (
        group && (
            <SingleElement Operations={GroupOperations(group)} toNavigate="/group">
                <Group group={group} />
            </SingleElement>
        )
    );
};
