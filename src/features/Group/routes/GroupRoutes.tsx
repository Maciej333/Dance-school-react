import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import ReturnHeader from '../../../app/components/ReturnHeader/ReturnHeader';
import ProtectedRoute from '../../../app/routes/ProtectedRoute/ProtectedRoute';
import { UserRole } from '../../../app/utils/enum/UserRole.enum';
import GroupForm, { FORM_ADD, FORM_EDIT } from '../GroupForm/GroupForm';
import MultiGroups from '../MultiGroups/MultiGroups';
import SingleGroup from '../SingleGroup/SingleGroup';

export default function GroupRoutes() {
    return (
        <Routes>
            <Route path="" element={<Outlet />}>
                <Route path="/" element={<MultiGroups />} />
                <Route
                    path="add"
                    element={
                        <ProtectedRoute auths={[UserRole.INSTRUCTOR]}>
                            <>
                                <ReturnHeader toNavigate="/group" name="Add group" />
                                <GroupForm type={FORM_ADD} />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <ProtectedRoute auths={[UserRole.DIRECTOR, UserRole.INSTRUCTOR]}>
                            <>
                                <ReturnHeader toNavigate="/group" withProp={true} name="Edit group" />
                                <GroupForm type={FORM_EDIT} />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route path=":id" element={<SingleGroup />} />
            </Route>

        </Routes>
    )
}
