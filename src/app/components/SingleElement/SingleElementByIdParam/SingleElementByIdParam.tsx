import React, {
    ComponentType,
    createContext,
    useEffect,
    useState,
} from "react";
import { useParams } from "react-router-dom";
import { withApi } from "../../../hoc/withApi";
import ErrorLine from "../../ErrorLine/ErrorLine";

export const RefreshContext = createContext({
    value: true,
    refresh: () => {},
});

export default function SingleElementByIdParam(props: {
    component: ComponentType;
    method: (data: any) => Promise<any>;
}) {
    const { component, method } = props;
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
            {funSingleElementInterior(component, method, idNumber)}
        </RefreshContext.Provider>
    ) : (
        <ErrorLine msg="Invalid id param" />
    );
}

const funSingleElementInterior = (
    component: ComponentType,
    method: (data: any) => Promise<any>,
    elementId: number
) => {
    const SingleElement = withApi(
        component,
        "Cannot fetch element data",
        method,
        elementId
    );
    return <SingleElement />;
};
