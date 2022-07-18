import React from 'react'
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { useAppSelector } from '../hook/store.hook';
import { selectAuth } from '../store/auth/authSlice';

export default function withProtectedFromLogin(Component: React.ComponentType) {

    const NewComponent = () => {

        const { loading, user } = useAppSelector(selectAuth);

        if (loading) {
            return <Loading />;
        } else {
            if (user.id > 0)
                return <Navigate to="/profile" />;

            return <Component />;
        }
    };

    return NewComponent;
}
