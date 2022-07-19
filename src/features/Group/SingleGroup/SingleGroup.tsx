import React, { useEffect, useState } from "react";
import { getGroup } from "../../../app/api/group.api";
import SingleElement from "../../../app/components/SingleElement/SingleElement";
import SingleElementByIdParam from "../../../app/components/SingleElement/SingleElementByIdParam/SingleElementByIdParam";
import { useAppSelector } from "../../../app/hook/store.hook";
import { Group as TGroup } from "../../../app/model/group.model";
import { selectAuth } from "../../../app/store/auth/authSlice";
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

    const {user} = useAppSelector(selectAuth);
    const [group, setGroup] = useState<TGroup | null>(null);

    useEffect(() => {
        if (apiData) {
            setGroup(apiData);
        }
    }, [apiData]);

    return (
        group && (
            <SingleElement Operations={user.id > 0 ? GroupOperations(group) : null} toNavigate="/group">
                <Group group={group} />
            </SingleElement>
        )
    );
};
