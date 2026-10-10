import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowLeft, Eye, EyeOff, X, AlertCircle, Loader2, Server, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const AdminLogin = () => {
    const [email, setEmail] = useState('admin@careersync.com');
    const [password, setPassword] = useState('admin123');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [devOtp, setDevOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [userId, setUserId] = useState(null);
    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        let timer;
        if (otpSent && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [otpSent, timeLeft]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            if (!otpSent || timeLeft === 0) {
                const res = await login({ email, password, portal: 'Admin' });
                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    setOtp(['', '', '', '', '', '']); // clear old OTP
                    setSuccessMsg('OTP has been sent successfully to your registered mail id');
                    setIsSubmitting(false);
                    if (res.otp) {
                        setDevOtp(res.otp);
                        setTimeout(() => setDevOtp(''), 15000); // hide after 15s
                    }
                } else if (res.success) {
                    setTimeout(() => navigate('/admin-dashboard'), 800);
                } else {
                    setError('Invalid Admin credentials');
                    setIsSubmitting(false);
                }
            } else {
                const otpString = otp.join('');
                const res = await api.post('/auth/verify-otp', { userId, otp: otpString });
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    setTimeout(() => {
                        window.location.href = '/admin-dashboard';
                    }, 800);
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
            setIsSubmitting(false);
        }
    };

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 24 }
        }
    };

    return (

        <>
            
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 w-full h-full bg-[#050505] flex overflow-y-auto overflow-x-hidden p-4 font-sans"
        >
            {/* Animated Interactive Background Elements */}
            <motion.div 
                animate={{ 
                    x: [0, 50, 0, -50, 0],
                    y: [0, -50, 50, -30, 0],
                    scale: [1, 1.2, 0.8, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div 
                animate={{ 
                    x: [0, -60, 20, -20, 0],
                    y: [0, 40, -60, 40, 0],
                    scale: [1, 0.9, 1.3, 0.9, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[130px] pointer-events-none"
            />
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>

            <Link to="/" className="absolute top-8 left-8 text-gray-500 hover:text-white flex items-center text-sm font-medium transition-colors z-20 group px-4 py-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Portal
            </Link>

            <motion.div 
                initial={{ y: 30, scale: 0.9, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="m-auto w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-800/60 p-6 sm:p-8 rounded-2xl shadow-2xl relative z-10 before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/5 before:pointer-events-none"
            >
                <div className="flex flex-col items-center mb-8">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(220,38,38,0.3)] border border-red-500/30 cursor-pointer"
                    >
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center">
                        System Admin <Activity className="w-4 h-4 ml-2 text-red-500 animate-pulse" />
                    </h2>
                    <p className="text-gray-500 text-sm mt-1.5 flex items-center">
                        <Server className="w-3.5 h-3.5 mr-1.5 opacity-70" /> Authorized personnel only
                    </p>
                </div>

                <motion.form 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    onSubmit={(e) => { e.preventDefault(); }} 
                    className="space-y-5"
                >
                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="bg-red-950/50 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium flex items-center justify-center"
                            >
                                {error}
                            </motion.div>
                        )}
                        {successMsg && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="bg-green-950/50 border border-green-500/50 text-green-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium flex items-center justify-center"
                            >
                                {successMsg}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div variants={itemVariants}>
                        <label className="block text-gray-400 text-[10px] font-bold mb-1.5 uppercase tracking-widest">Admin Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                            </div>
                            <input
                                id="admin-email-input"
                                type="email"
                                required
                                disabled={otpSent}
                                
                                className={`autofill-admin w-full bg-transparent border border-gray-800 text-white placeholder-gray-500 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/70 transition-all text-sm shadow-inner ${otpSent ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-700'}`}
                                style={{ WebkitBoxShadow: (typeof window !== "undefined" && window.innerWidth >= 768) ? "0 0 0px 1000px #0a0a0a inset" : undefined }}
                                placeholder="admin@careersync.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label className="block text-gray-400 text-[10px] font-bold mb-1.5 uppercase tracking-widest">Master Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                            </div>
                            <input
                                id="admin-pwd-input"
                                type={showPassword ? "text" : "password"}
                                required
                                disabled={otpSent}
                                
                                className={`autofill-admin w-full bg-transparent border border-gray-800 text-white placeholder-gray-500 rounded-xl pl-11 pr-10 py-3 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/70 transition-all text-sm shadow-inner ${otpSent ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-700'}`}
                                style={{ WebkitBoxShadow: (typeof window !== "undefined" && window.innerWidth >= 768) ? "0 0 0px 1000px #0a0a0a inset" : undefined }}
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={otpSent}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me-admin" type="checkbox" className="h-3.5 w-3.5 text-red-600 focus:ring-red-500 border-gray-800 bg-transparent rounded cursor-pointer" />
                                <label htmlFor="remember-me-admin" className="ml-1.5 block text-xs text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">Remember me</label>
                            </div>
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {otpSent && timeLeft > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="pt-2"
                            >
                                <label className="block text-gray-400 text-[10px] font-bold mb-3 uppercase tracking-widest text-center">Enter 6-Digit OTP</label>
                                <div className="flex justify-between items-center gap-2 mb-2">
                                    {otp.map((data, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            name="otp"
                                            maxLength="1"
                                            className="w-11 h-12 text-center text-xl font-mono font-bold text-white bg-transparent border border-gray-800 rounded-xl focus:bg-[#151515] focus:ring-1 focus:ring-red-500/70 focus:border-red-500/70 transition-all outline-none shadow-inner"
                                            value={data}
                                            onChange={e => handleOtpChange(e.target, index)}
                                            onKeyDown={e => handleOtpKeyDown(e, index)}
                                            onFocus={e => e.target.select()}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-center mt-4">
                                    <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded border uppercase ${timeLeft > 0 ? 'bg-red-950/30 text-red-500 border-red-900/50' : 'bg-red-900 text-white border-red-500'}`}>
                                        {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, '0')} REMAINING` : 'OTP EXPIRED'}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div variants={itemVariants} className="pt-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`relative w-full overflow-hidden bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] active:scale-[0.98] text-sm tracking-widest uppercase ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {otpSent ? (timeLeft > 0 ? "Verifying..." : "Resending...") : "Sending OTP..."}
                                </span>
                            ) : (
                                otpSent ? (timeLeft > 0 ? "Login" : "Resend OTP") : "Send OTP"
                            )}
                            
                            {/* Interactive hover glare effect */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                        </button>
                    </motion.div>
                </motion.form>
                
                <div className="mt-8 pt-5 border-t border-gray-800/50 text-center flex flex-col items-center">
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider font-semibold">
                        Secure Network Connection Established
                    </p>
                    <div className="w-12 h-1 bg-gray-800 mt-3 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600/50 w-1/3 animate-[pulse_2s_ease-in-out_Infinity_alternate]"></div>
                    </div>
                </div>
            </motion.div>

            
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }

                .autofill-admin:-webkit-autofill,
                .autofill-admin:-webkit-autofill:hover,
                .autofill-admin:-webkit-autofill:focus,
                .autofill-admin:-webkit-autofill:active {
                    -webkit-text-fill-color: #ffffff !important;
                    caret-color: #ffffff;
                    transition: background-color 9999s ease-in-out 0s;
                }
            `}} />


            {/* Custom Interactive Dev OTP Toast */}
            <AnimatePresence>
                {devOtp && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="fixed top-8 right-8 z-[100] bg-[#0a0a0a]/95 backdrop-blur-md border border-red-900/50 shadow-2xl shadow-red-900/20 rounded-xl p-3 min-w-[160px] flex flex-col items-center gap-1"
                    >
                        <button onClick={() => setDevOtp('')} className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors">
                            <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="text-red-500 text-[10px] font-bold tracking-widest uppercase mb-1">Admin Auth Code</div>
                        <div className="text-center tracking-[0.3em] font-mono text-xl font-black text-white">
                            {devOtp}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
        </>
    );
};

export default AdminLogin;
