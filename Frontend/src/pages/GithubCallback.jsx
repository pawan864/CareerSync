import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const GithubCallback = () => {
    const { githubAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('Authenticating with GitHub...');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        if (code) {
            handleAuth(code);
        } else {
            setStatus('No authentication code found. Redirecting...');
            setTimeout(() => navigate('/login'), 2000);
        }
    }, [location]);

    const handleAuth = async (code) => {
        try {
            
            const role = localStorage.getItem('oauth_role') || 'student';
            const res = await githubAuth(code, role);
    
            if (res.success) {
                setStatus('Successfully authenticated! Redirecting...');
                
                setTimeout(() => {
                    const r = res.user?.role || 'student';
                    if (r === 'student') navigate('/student-dashboard');
                    else if (r === 'recruiter') navigate('/employer');
                    else if (r === 'faculty') navigate('/faculty-dashboard');
                    else if (r === 'admin') navigate('/admin-dashboard');
                    else if (r === 'tpo') navigate('/institution');
                    else navigate('/profile');
                }, 1000);
    
            } else {
                setStatus('Authentication failed: ' + (res.error || 'Unknown error'));
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (error) {
            setStatus('Authentication error occurred.');
            setTimeout(() => navigate('/login'), 3000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center"
            >
                <svg className="w-12 h-12 mb-4 animate-spin text-gray-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Please wait</h2>
                <p className="text-gray-500 text-sm">{status}</p>
            </motion.div>
        </div>
    );
};

export default GithubCallback;
