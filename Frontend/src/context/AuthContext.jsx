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

    // Inactivity Timer (2 minutes)
    useEffect(() => {
        let timeoutId;
        let throttleTimeout;

        const handleTimeout = () => {
            if (user) {
                logout();
                window.location.href = '/login';
            }
        };

        const resetTimer = () => {
            clearTimeout(timeoutId);
            if (user) {
                timeoutId = setTimeout(handleTimeout, 2 * 60 * 1000); // 2 minutes
            }
        };

        const throttledResetTimer = () => {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(() => {
                    resetTimer();
                    throttleTimeout = null;
                }, 1000);
            }
        };

        if (user) {
            resetTimer();
            const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
            events.forEach(e => window.addEventListener(e, throttledResetTimer));

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(throttleTimeout);
                events.forEach(e => window.removeEventListener(e, throttledResetTimer));
            };
        }
    }, [user]);


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

        const googleAuth = async (credential, role, isRegister = false) => {
        try {
            const res = await api.post('/auth/google', { credential, role, isRegister });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                return { success: true, user: res.data.user };
            }
            return { success: false, error: res.data.error };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || err.message };
        }
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

    
    const githubAuth = async (code, role, isRegister = false) => {
        try {
            const res = await api.post('/auth/github', { code, role, isRegister });
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
