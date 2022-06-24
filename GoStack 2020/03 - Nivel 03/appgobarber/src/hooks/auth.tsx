import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SingInCredentials): Promise<void>;
  signOut(): void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);
      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }: SingInCredentials) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whithin an AuthProvider');
  }

  return context;
}
