/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { logout as logoutRequest } from "../services/auth/auth.service.js";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });
    const loginUser = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }
    const logoutUser = async () => {
        try {
            await logoutRequest();
        } finally {
            localStorage.removeItem("token");
            setToken(null);
        }
    }
    const value = {
        token,
        isAuthenticated: Boolean(token),
        loginUser,
        logoutUser,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}