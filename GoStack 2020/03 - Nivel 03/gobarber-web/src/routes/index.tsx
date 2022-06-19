import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './Route';

import SingIn from '../pages/SignIn';
import SingUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';

const RoutesProject: React.FC = () => (
    <Routes>
        <Route element={<PrivateRoute isSignInPage />}>
            <Route path="/" element={<SingIn />} />
        </Route>
        <Route path="/singup" element={<SingUp />} />
        <Route element={<PrivateRoute isPrivate />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
    </Routes>
);

export default RoutesProject;
