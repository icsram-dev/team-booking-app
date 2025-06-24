import { createContext, useEffect, useState } from "react";
import { loginService, registerService } from "../services/authService";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const register = async (name, phoneNumber, email, password) => {
    
        const result = await registerService(name, phoneNumber, email, password);
        if (result.ok) {
            return { ok: true, message: result.message };
        }
        return { ok: false, message: result.message };
      };

    const login = async (email, password) => {

        const response = await loginService(email, password)

        if (response.message === 'Invalid email/password') {
            return { ok: false, message: 'Invalid email/password' }
        }

        const { token } = response;
        const tokenData = jwtDecode(token);

        localStorage.setItem('user', JSON.stringify({ ...tokenData, token }))

        setUser({ ...tokenData, token });
        
        return { ok: true, message: 'Successfull login' }
    };

    const logout = async () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        const lsUser = localStorage.getItem('user');
        if (lsUser) {

            setUser(JSON.parse(lsUser))
        }
        setIsLoading(false)
    }, [])

    const value = {
        user, login, register, logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;