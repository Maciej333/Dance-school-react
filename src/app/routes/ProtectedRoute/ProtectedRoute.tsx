import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hook/store.hook";
import { selectAuth } from "../../store/auth/authSlice";
import { UserRole } from "../../utils/enum/UserRole.enum";

export type ProtectedRouteLocationState = {
    from: string,
    role: UserRole[]
}

export default function ProtectedRoute(props: { children: JSX.Element, auths: UserRole[] }) {

    const { children, auths } = props;
    const location = useLocation();
    const { role } = useAppSelector(selectAuth);

    let isRole = false;

    if (role && props.auths.includes(+UserRole[role])) {
        isRole = true;
    }

    if (!isRole) {
        return <Navigate to="/auth/login" state={{ from: location.pathname, role: auths }} replace />;
    }

    return children;
}
