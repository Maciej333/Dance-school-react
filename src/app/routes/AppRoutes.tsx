import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../../features/Home/Home';
import Loading from '../components/Loading/Loading';
import NotFound from '../components/NotFound/NotFound';

const Auth = lazy(() => import("../../features/Auth/Auth"));
const Login = lazy(() => import("../../features/Auth/Login/Login"));

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/auth/*" element={<Suspense fallback={<Loading />}><Auth /></Suspense>}>
                <Route path="login" element={<Suspense fallback={<>...</>}><Login /></Suspense>} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
