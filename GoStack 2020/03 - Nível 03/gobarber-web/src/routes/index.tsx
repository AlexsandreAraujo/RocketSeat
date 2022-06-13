import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SingIn from '../pages/SignIn';
import SingUp from '../pages/Signup';

const RoutesProject: React.FC = () => (
    <Routes>
        <Route path="/" element={<SingIn />} />
        <Route path="/singup" element={<SingUp />} />
    </Routes>
);

export default RoutesProject;
