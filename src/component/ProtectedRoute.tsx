import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type ProtectedRouteProps = {
    children: ReactElement;
    requiredRole: string[];
};

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user } = useAuth();
    if (user === null) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!requiredRole.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
