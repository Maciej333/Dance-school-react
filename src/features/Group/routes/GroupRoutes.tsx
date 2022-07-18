import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import ReturnHeader from '../../../app/components/ReturnHeader/ReturnHeader';
import GroupForm, { FORM_ADD, FORM_EDIT } from '../GroupForm/GroupForm';
import MultiGroups from '../MultiGroups/MultiGroups';
import SingleGroup from '../SingleGroup/SingleGroup';

export default function GroupRoutes() {
    return (
        <Routes>
            <Route path="" element={<Outlet />}>
                <Route path="/" element={<MultiGroups />} />
                <Route path="add" element={<><ReturnHeader toNavigate="/group" name="Add group" /><GroupForm type={FORM_ADD} /></>} />
                <Route path="edit/:id" element={<><ReturnHeader toNavigate="/group" withProp={true} name="Edit group" /><GroupForm type={FORM_EDIT} /></>} />
                <Route path=":id" element={<SingleGroup />} />
            </Route>

        </Routes>
    )
}
