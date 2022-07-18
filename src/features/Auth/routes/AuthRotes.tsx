import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="" element={<Outlet />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

        </Routes>
    )
}
