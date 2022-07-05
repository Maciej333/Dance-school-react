import React, { useEffect } from "react";
import { useAppDispatch } from "../hook/store.hook";
import { refresh } from "../store/auth/authSlice";

export function withAuth(Component: React.ComponentType) {

    const NewComponent = () => {

        const dispatch = useAppDispatch();

        useEffect(() => {
            dispatch(refresh());
        }, [dispatch])

        return <Component />;
    };

    return NewComponent;
}