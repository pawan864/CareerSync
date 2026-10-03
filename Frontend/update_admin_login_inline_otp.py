import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

if "import api from '../services/api';" not in content:
    content = content.replace("import { motion, AnimatePresence } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';\nimport api from '../services/api';")

old_state = """    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');"""
new_state = """    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [userId, setUserId] = useState(null);"""
content = content.replace(old_state, new_state)

old_submit = """    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const res = await login({ email, password, portal: 'Admin' });
            if (res.success && res.userId) {
                setTimeout(() => navigate('/otp-verify', { state: { userId: res.userId } }), 800); // slight delay for cool effect
            } else if (res.success) {
                setTimeout(() => navigate('/admin-dashboard'), 800);
            } else {
                setError('Invalid Admin credentials');
                setIsSubmitting(false);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
            setIsSubmitting(false);
        }
    };"""
new_submit = """    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            if (!otpSent) {
                const res = await login({ email, password, portal: 'Admin' });
                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setIsSubmitting(false);
                } else if (res.success) {
                    setTimeout(() => navigate('/admin-dashboard'), 800);
                } else {
                    setError('Invalid Admin credentials');
                    setIsSubmitting(false);
                }
            } else {
                const res = await api.post('/auth/verify-otp', { userId, otp });
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
    };"""
content = content.replace(old_submit, new_submit)

old_inputs = """                    <motion.div variants={itemVariants}>
                        <label className="block text-gray-400 text-[10px] font-bold mb-1.5 uppercase tracking-widest">Master Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                style={{ WebkitBoxShadow: '0 0 0px 1000px #0f0f0f inset', WebkitTextFillColor: '#f3f4f6' }}
                                className="w-full bg-[#0f0f0f] border border-gray-800 text-white rounded-xl pl-11 pr-10 py-3 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/70 transition-all text-sm hover:border-gray-700 shadow-inner"
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </motion.div>"""
new_inputs = """                    <motion.div variants={itemVariants}>
                        <label className="block text-gray-400 text-[10px] font-bold mb-1.5 uppercase tracking-widest">Master Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                disabled={otpSent}
                                style={{ WebkitBoxShadow: '0 0 0px 1000px #0f0f0f inset', WebkitTextFillColor: '#f3f4f6' }}
                                className={`w-full bg-[#0f0f0f] border border-gray-800 text-white rounded-xl pl-11 pr-10 py-3 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/70 transition-all text-sm shadow-inner ${otpSent ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-700'}`}
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
                    </motion.div>

                    <AnimatePresence>
                        {otpSent && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                            >
                                <label className="block text-gray-400 text-[10px] font-bold mb-1.5 uppercase tracking-widest mt-1">6-Digit OTP</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <ShieldCheck className="h-4 w-4 text-red-500 animate-pulse" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        maxLength="6"
                                        style={{ WebkitBoxShadow: '0 0 0px 1000px #0f0f0f inset', WebkitTextFillColor: '#f3f4f6' }}
                                        className="w-full bg-[#0f0f0f] border border-red-500/50 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm hover:border-red-500/70 shadow-inner tracking-[0.5em] font-mono"
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>"""
content = content.replace(old_inputs, new_inputs)

# Disable email input if otpSent
content = content.replace('type="email"\n                                required', 'type="email"\n                                required\n                                disabled={otpSent}')
content = content.replace('className="w-full bg-[#0f0f0f] border border-gray-800 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/70 transition-all text-sm hover:border-gray-700 shadow-inner"', 'className={`w-full bg-[#0f0f0f] border border-gray-800 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/70 transition-all text-sm shadow-inner ${otpSent ? \'opacity-50 cursor-not-allowed\' : \'hover:border-gray-700\'}`}')

# Change button text
old_button = """                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...
                                </span>
                            ) : (
                                "Authenticate"
                            )}"""
new_button = """                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {otpSent ? "Verifying..." : "Sending OTP..."}
                                </span>
                            ) : (
                                otpSent ? "Login" : "Send OTP"
                            )}"""
content = content.replace(old_button, new_button)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
