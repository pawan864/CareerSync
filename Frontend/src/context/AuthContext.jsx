import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const res = await api.get('/auth/me');
                    if (res.data.success) {
                        setUser(res.data.data);
                    }
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        const res = await api.post('/auth/login', credentials);
        if (res.data.success) {
            if (res.data.userId) {
                // Return userId for OTP flow
                return { success: true, userId: res.data.userId, otp: res.data.otp };
            }
            // Fallback if no OTP required
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            return { success: true };
        }
        return { success: false };
    };

    const googleAuth = async (credential, role) => {
        const res = await api.post('/auth/google', { credential, role });
        if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            return { success: true, user: res.data.user };
        }
        return { success: false, error: res.data.error };
    };

    const register = async (userData) => {
        const res = await api.post('/auth/register', userData);
        if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            return true;
        }
        return false;
    };

    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
        try {
            await api.get('/auth/logout');
        } catch (error) {
            console.error(error);
        }
    };

    
    const githubAuth = async (code, role) => {
        try {
            const res = await api.post('/auth/github', { code, role });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                return { success: true, user: res.data.user };
            }
            return { success: false, error: res.data.error || 'GitHub auth failed' };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || err.message || 'GitHub auth failed' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, googleAuth, githubAuth, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
