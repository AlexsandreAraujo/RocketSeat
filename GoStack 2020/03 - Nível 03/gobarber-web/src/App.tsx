import React from 'react';

import GlobalStyle from './styles/global';
import SingIn from './pages/SignIn';
import SingUp from './pages/Signup';

import AppProvider from './hooks';

const App: React.FC = () => (
    <>
        <AppProvider>
            <SingIn />
        </AppProvider>
        <GlobalStyle />
    </>
);

export default App;
