import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, ArrowLeft, Mail } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useContext(AuthContext);
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (role) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const success = await register(formData);
            if (success) {
                navigate('/');
            } else {
                setError('Registration failed. Please check your details.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during registration.');
        }
    };

    return (
        <div className="min-h-screen flex w-full font-sans">
            {/* Left Side - Dark Navy */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#091024] flex-col justify-center px-16 relative overflow-hidden animate-fade-in-left">
                {/* Decorative dots / Slide Indicators */}
                <div className="absolute top-12 left-16 flex space-x-2">
                    {slides.map((_, index) => (
                        <div 
                            key={index} 
                            className={`h-2 rounded-full transition-all duration-500 ${
                                currentSlide === index ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600'
                            }`}
                        ></div>
                    ))}
                </div>

                <div className="z-10 mt-10">
                    <h1 className="text-white text-5xl font-bold leading-tight mb-4">
                        Connecting Top Campus<br />To Industry Leaders
                    </h1>
                    <p className="text-gray-400 text-lg mb-12 max-w-lg">
                        Orchestrate every step of the hiring and placement process with our integrated enterprise AI tools.
                    </p>
                    
                    {/* Laptop / Image Slider */}
                    <div className="w-full max-w-lg h-64 bg-[#111827] rounded-t-xl border-4 border-gray-800 shadow-2xl relative overflow-hidden">
                        <div 
                            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
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
                    <div className="w-full max-w-lg h-3 bg-gray-400 rounded-b-xl shadow-2xl mb-12 relative flex justify-center items-center">
                        <div className="w-16 h-1 bg-gray-300 rounded-b-md absolute top-0"></div>
                    </div>

                    <p className="text-gray-400 italic text-sm max-w-lg leading-relaxed mt-4">
                        "Bridging the gap between academia and industry. Join thousands of students, esteemed institutions, and top-tier employers building the future of work together."
                    </p>
                </div>
            </div>

            {/* Right Side - Very Dark */}
            <div className="w-full lg:w-1/2 bg-[#020617] flex flex-col relative px-8 sm:px-16 py-8 overflow-y-auto animate-fade-in-right">
                
                <Link to="/" className="text-gray-400 hover:text-white flex items-center text-sm font-medium w-fit mb-8 lg:mb-0 lg:absolute lg:top-8 lg:left-8">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Link>

                <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto mt-4 lg:mt-0">
                    
                    <div className="text-center mb-6">
                        <p className="text-gray-500 text-[10px] font-bold tracking-widest mb-2 uppercase">Select Portal</p>
                        <div className="flex justify-center space-x-2">
                            {[{id: 'student', label: 'Student'}, {id: 'tpo', label: 'Institution'}, {id: 'industry', label: 'Employer'}].map((p) => (
                                <button 
                                    key={p.id}
                                    onClick={() => handleRoleChange(p.id)}
                                    className={`px-3 py-1 rounded-md text-xs transition-colors border ${
                                        formData.role === p.id 
                                            ? 'bg-[#1e293b] border-blue-500 text-white' 
                                            : 'border-gray-800 text-gray-400 hover:border-gray-600'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center text-blue-500 mb-4">
                        <GraduationCap className="h-6 w-6 mr-2" />
                        <span className="font-bold text-xl text-white tracking-tight">
                            Career<span className="text-blue-500">Sync</span>
                        </span>
                    </div>

                    <p className="text-gray-400 text-xs mb-1">Join CareerSync</p>
                    <h2 className="text-white text-2xl font-bold mb-6">Create your account.</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded text-xs text-center">
                                {error}
                            </div>
                        )}
                        
                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
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
                            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 rounded-md transition-colors mt-2 text-sm"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <div className="text-gray-500 text-xs mb-4 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <span className="relative bg-[#020617] px-4 font-medium">OR</span>
                        </div>
                        
                        <p className="text-gray-400 text-xs mb-3">Sign Up With</p>
                        
                        <div className="flex space-x-3">
                            <button type="button" className="flex-1 flex items-center justify-center bg-transparent border border-gray-800 hover:border-gray-600 text-white py-2 rounded-md transition-colors">
                                <Mail className="w-3.5 h-3.5 mr-2" />
                                <span className="text-xs font-medium">EMAIL</span>
                            </button>
                            <button type="button" className="flex-1 flex items-center justify-center bg-transparent border border-gray-800 hover:border-gray-600 text-white py-2 rounded-md transition-colors">
                                <svg className="w-3.5 h-3.5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                                <span className="text-xs font-medium">GOOGLE</span>
                            </button>
                        </div>
                        
                        <div className="mt-6 border-t border-gray-800 pt-4">
                            <p className="text-gray-400 text-xs">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
