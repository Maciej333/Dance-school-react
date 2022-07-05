import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login/Login';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='' element={<h1>Hello</h1>} />

            <Route path="/login" element={<Login />} />

            <Route path="*" element={<>not found</>} />
        </Routes>
    )
}
