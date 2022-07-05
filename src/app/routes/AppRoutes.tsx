import React from 'react'
import { Routes, Route } from 'react-router-dom';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='' element={<h1>Hello</h1>} />

            <Route path="*" element={<>not found</>} />
        </Routes>
    )
}
