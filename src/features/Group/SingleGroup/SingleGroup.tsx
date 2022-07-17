import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroup } from "../../../app/api/group.api";
import ErrorLine from "../../../app/components/ErrorLine/ErrorLine";
import SingleElement from "../../../app/components/SingleElement/SingleElement";
import { withApi } from "../../../app/hoc/withApi";
import { Group as TGroup } from "../../../app/model/group.model";
import Group from "./Group/Group";
import GroupOperations from "./GroupOperations/GroupOperations";

export const RefreshContext = createContext({
    value: true,
    refresh: () => {},
});

export default function SingleGroup() {
    const { id } = useParams();
    const [idNumber, setIdNumber] = useState<number>(0);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        if (id?.match(/\d+/)) setIdNumber(+id);
    }, [id, refresh]);

    const handleRefresh = () => {
        setRefresh((prev) => !prev);
    };

    return idNumber > 0 ? (
        <RefreshContext.Provider
            value={{ value: refresh, refresh: handleRefresh }}
        >
            {funSingleGroupInterior(idNumber)}
        </RefreshContext.Provider>
    ) : (
        <ErrorLine msg="Invalid id param" />
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
            <SingleElement Operations={GroupOperations(group)}>
                <Group group={group} />
            </SingleElement>
        )
    );
};

const funSingleGroupInterior = (groupId: number) => {
    const SingleGroupInterior = withApi(
        SingleGroupInteriorComponent,
        "Cannot fetch group data",
        getGroup,
        groupId
    );
    return <SingleGroupInterior />;
};
