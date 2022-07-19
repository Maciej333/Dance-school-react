import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import ProfilePage from '../ProfilePage/ProfilePage';

export default function ProfileRoutes() {
    return (
        <Routes>
            <Route path="" element={<Outlet />}>
                <Route path="/" element={<ProfilePage />} />
            </Route>

        </Routes>
    )
}
