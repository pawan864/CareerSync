import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const OtpVerification = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get userId from location state, if not present redirect to login
    const userId = location.state?.userId;

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, [userId, navigate]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const res = await api.post('/auth/verify-otp', { userId, otp: otpString });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                // Hard reload to refresh auth context and redirect to correct dashboard
                window.location.href = '/'; 
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid or expired OTP');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-[#f8fafc] flex items-center justify-center overflow-hidden font-sans">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl relative z-10 border border-gray-100"
            >
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Two-Step Verification</h2>
                    <p className="text-gray-500 text-sm mt-2 text-center flex items-center">
                        <Mail className="w-4 h-4 mr-1.5" /> Please check your mail
                    </p>
                    <p className="text-gray-400 text-xs mt-1 text-center">We've sent a 6-digit OTP to your registered email.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-between items-center gap-2">
                        {otp.map((data, index) => (
                            <input
                                className="w-12 h-14 text-center text-xl font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                onFocus={e => e.target.select()}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                    >
                        {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
                        ) : (
                            <>Verify & Login <ArrowRight className="w-4 h-4 ml-2" /></>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default OtpVerification;
