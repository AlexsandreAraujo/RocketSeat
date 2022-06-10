import React from 'react';

import GlobalStyle from './styles/global';
import SingIn from './pages/SignIn';
import SingUp from './pages/Signup';
import ToastContainer from './components/ToastContainer';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
    <>
        <AuthProvider>
            <SingIn />
        </AuthProvider>
        <ToastContainer />
        <GlobalStyle />
    </>
);

export default App;
