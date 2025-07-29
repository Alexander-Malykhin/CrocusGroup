import { useState, createContext, useContext } from 'react';
import getCookie from './getCookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(getCookie('utk'));
    const [user, setUser] = useState(true);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
