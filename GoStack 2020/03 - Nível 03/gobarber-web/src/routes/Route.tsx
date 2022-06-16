import React from 'react';
import {
    Navigate,
    Outlet,
    RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    isSignInPage?: boolean;
}

const PrivateRoute: React.FC<RouteProps> = ({
    isPrivate = false,
    isSignInPage = false,
}) => {
    const { user } = useAuth();

    if (isSignInPage && !!user) return <Navigate to="/dashboard" />;

    return isPrivate === !!user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
