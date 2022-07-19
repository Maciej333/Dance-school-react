import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../../app/routes/ProtectedRoute/ProtectedRoute';
import { UserRole } from '../../../app/utils/enum/UserRole.enum';
import ProfileForm from '../ProfileForm/ProfileForm';
import ProfileFormAddStudent from '../ProfileFormAddStudent/ProfileFormAddStudent';
import ProfileFormEditPassword from '../ProfileFormEditPassword/ProfileFormEditPassword';
import ProfilePage from '../ProfilePage/ProfilePage';

export default function ProfileRoutes() {
    return (
        <Routes>
            <Route path="" element={<Outlet />}>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/edit" element={<ProfileForm />} />
                <Route path="/password" element={<ProfileFormEditPassword />} />
                <Route
                    path="/student"
                    element={
                        <ProtectedRoute auths={[UserRole.DIRECTOR, UserRole.INSTRUCTOR]}>
                            <ProfileFormAddStudent />
                        </ProtectedRoute>
                    } />
            </Route>

        </Routes>
    )
}
