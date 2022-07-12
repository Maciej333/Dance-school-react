import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import MultiGroups from '../MultiGroups/MultiGroups'
import SingleGroup from '../SingleGroup/SingleGroup'

export default function GroupRoutes() {
    return (
        <Routes>
            <Route path="" element={<Outlet />}>
                <Route path="/" element={<MultiGroups />} />
                <Route path=":id" element={<SingleGroup />} />
            </Route>

        </Routes>
    )
}
