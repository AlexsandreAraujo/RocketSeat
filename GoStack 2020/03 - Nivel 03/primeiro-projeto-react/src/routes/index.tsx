import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/repository';

const RoutesProject: React.FC = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
            path="/repositories/:owner/:repository"
            element={<Repository />}
        />
    </Routes>
);

export default RoutesProject;
