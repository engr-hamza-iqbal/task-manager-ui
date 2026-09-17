/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { logout as logoutRequest } from "../services/auth/auth.service.js";
const AuthContext = createContext(null);

const getTokenExpiry = (token) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return typeof payload.exp === "number" ? payload.exp * 1000 : null;
    } catch {
        return null;
    }
};

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });
    const loginUser = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    useEffect(() => {
        if (!token) return undefined;

        const expiresAt = getTokenExpiry(token);
        if (!expiresAt) return undefined;

        const logoutWhenExpired = () => {
            localStorage.removeItem("token");
            setToken(null);
        };

        const delay = expiresAt - Date.now();
        if (delay <= 0) {
            logoutWhenExpired();
            return undefined;
        }

        const timeoutId = setTimeout(logoutWhenExpired, delay);
        return () => clearTimeout(timeoutId);
    }, [token]);
    
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