import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../../features/Home/Home';
import Loading from '../components/Loading/Loading';
import NotFound from '../components/NotFound/NotFound';
import { UserRole } from '../utils/enum/UserRole.enum';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

const Auth = lazy(() => import("../../features/Auth/Auth"));
const Profile = lazy(() => import("../../features/Profile/Profile"));
const Group = lazy(() => import("../../features/Group/Group"));

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/*" element={<Suspense fallback={<Loading />}><Auth /></Suspense>} />
            <Route
                path="/profile/*"
                element={
                    <ProtectedRoute auths={[UserRole.DIRECTOR, UserRole.INSTRUCTOR, UserRole.STUDENT]}>
                        <Suspense fallback={<Loading />}>
                            <Profile />
                        </Suspense>
                    </ProtectedRoute>
                } />
            <Route path="/group/*" element={<Suspense fallback={<Loading />}><Group /></Suspense>} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
