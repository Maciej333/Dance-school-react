import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import GroupForm, { FORM_ADD, FORM_EDIT } from '../GroupForm/GroupForm'
import MultiGroups from '../MultiGroups/MultiGroups'
import SingleGroup from '../SingleGroup/SingleGroup'

export default function GroupRoutes() {
    return (
        <Routes>
            <Route path="" element={<Outlet />}>
                <Route path="/" element={<MultiGroups />} />
                <Route path="add" element={<GroupForm type={FORM_ADD}/>} />
                <Route path="edit/:id" element={<GroupForm type={FORM_EDIT}/>} />
                <Route path=":id" element={<SingleGroup />} />
            </Route>

        </Routes>
    )
}
