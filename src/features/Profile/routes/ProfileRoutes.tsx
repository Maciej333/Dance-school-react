import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

export default function ProfileRoutes() {
    return (
        <Routes>
            <Route path="" element={<Outlet />}>
                <Route path="" element={<p>Profile page</p>} />
            </Route>

        </Routes>
    )
}
