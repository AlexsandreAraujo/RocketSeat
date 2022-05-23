import React from 'react';

import GlobalStyle from './styles/global';
import SingIn from './pages/SignIn';
import SingUp from './pages/Signup';

const App: React.FC = () => (
    <>
        <SingUp />
        <GlobalStyle />
    </>
);

export default App;
