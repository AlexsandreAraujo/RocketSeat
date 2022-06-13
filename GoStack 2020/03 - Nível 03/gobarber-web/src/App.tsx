import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import RoutesProject from './routes';

const App: React.FC = () => (
    <Router>
        <AppProvider>
            <RoutesProject />
        </AppProvider>

        <GlobalStyle />
    </Router>
);

export default App;
