import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SingInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    name: string;
    signIn(credentials: SingInCredentials): Promise<void>;
}

interface Props {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const signIn = useCallback(
        async ({ email, password }: SingInCredentials) => {
            const response = await api.post('sessions', { email, password });
            console.log(response);
        },
        [],
    );
    return (
        <AuthContext.Provider value={{ name: 'Alexsandre', signIn }}>
            {children}
        </AuthContext.Provider>
    );
};
