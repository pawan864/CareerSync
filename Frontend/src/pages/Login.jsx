import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, ArrowRight, Mail, ArrowLeft } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [portal, setPortal] = useState('Student');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const slides = [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&h=800&auto=format&fit=crop", // Diverse students collaborating
        "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=1200&h=800&auto=format&fit=crop", // Professional Meeting / Placement
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&h=800&auto=format&fit=crop", // Industry Workspace
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&h=800&auto=format&fit=crop"  // University Campus
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3500); 
        return () => clearInterval(timer);
    }, [slides.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const success = await login(email, password);
            if (success) {
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during login.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center font-sans bg-gradient-to-r from-white via-blue-200 to-blue-600 p-4 sm:p-8">
            <div className="flex w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up min-h-[600px]">
                
                {/* Left Side - Dark Navy with Illustration */}
                <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#091024] p-10 relative animate-fade-in-left" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                    
                    {/* Slide Indicators */}
                    <div className="absolute top-10 right-10 flex space-x-2 z-20">
                        {slides.map((_, index) => (
                            <div 
                                key={index} 
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    currentSlide === index ? 'w-6 bg-blue-500' : 'w-2 bg-slate-600'
                                }`}
                            ></div>
                        ))}
                    </div>

                    {/* Logo */}
                    <Link to="/" className="flex items-center text-blue-500 z-10 w-fit">
                        <GraduationCap className="h-8 w-8 mr-2 bg-white rounded-full p-1 text-[#091024]" />
                        <span className="font-bold text-xl text-white tracking-widest uppercase">
                            Career<span className="text-blue-500">Sync</span>
                        </span>
                    </Link>

                    {/* Illustration Area - Slider */}
                    <div className="flex-1 relative mt-12 mb-10 overflow-hidden rounded-2xl border-4 border-[#1e293b] opacity-95 shadow-2xl">
                        <div 
                            className="flex absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {slides.map((slide, index) => (
                                <img 
                                    key={index}
                                    src={slide}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover flex-shrink-0"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="text-center px-4 z-10">
                        <p className="text-blue-100 italic text-lg font-serif mb-2">
                            "Bridging the gap between academia and industry. Join thousands of students and top-tier employers building the future of work together."
                        </p>
                        <p className="text-blue-300 text-sm font-semibold">— The CareerSync Network</p>
                    </div>
                </div>

                {/* Right Side - White Form */}
                <div className="w-full lg:w-1/2 p-10 sm:p-14 bg-white flex flex-col justify-center relative animate-fade-in-right" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                    
                    <Link to="/" className="text-gray-400 hover:text-gray-800 flex items-center text-sm font-medium w-fit mb-8 lg:mb-0 lg:absolute lg:top-8 lg:left-8">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Link>

                    <h2 className="text-[#0f172a] text-3xl font-bold mb-2">Welcome back</h2>
                    <p className="text-gray-500 text-sm mb-8">Login to your account to continue</p>

                    <div className="mb-6">
                        <div className="flex p-1 bg-gray-100 rounded-lg">
                            {['Student', 'Institution', 'Employer'].map((p) => (
                                <button 
                                    key={p}
                                    type="button"
                                    onClick={() => setPortal(p)}
                                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                        portal === p 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1.5">Email ID</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2.5 bg-[#f0f4f8] border-transparent text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full px-4 py-2.5 bg-[#f0f4f8] border-transparent text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-6 text-sm"
                        >
                            Sign In <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        <p className="text-gray-500 text-xs mb-3">Login With</p>
                        <div className="flex space-x-3 mb-6">
                            <button type="button" className="flex-1 flex items-center justify-center bg-transparent border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-md transition-colors">
                                <Mail className="w-3.5 h-3.5 mr-2" />
                                <span className="text-xs font-medium">EMAIL</span>
                            </button>
                            <button type="button" className="flex-1 flex items-center justify-center bg-transparent border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-md transition-colors">
                                <svg className="w-3.5 h-3.5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                                <span className="text-xs font-medium">GOOGLE</span>
                            </button>
                        </div>
                        
                        <p className="text-gray-400 text-xs mb-1">Don't have an account?</p>
                        <Link to="/register" className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors">
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

