import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navTheme, setNavTheme] = useState('indigo');
    const [isSliderPaused, setIsSliderPaused] = useState(false);

    useEffect(() => {
        const handleSlideChange = (e) => {
            // Only cycle navbar colors if user is at the top of the page
            if (window.scrollY <= 20) {
                const themes = ['blue', 'indigo', 'orange'];
                setNavTheme(themes[e.detail.slide] || 'blue');
            }
        };

        // Initialize from localStorage
        const savedTheme = localStorage.getItem('globalTheme');
        if (savedTheme) {
            setNavTheme(savedTheme);
        }

        const handlePauseState = (e) => {
            if (e.detail && e.detail.isPaused !== undefined) {
                setIsSliderPaused(e.detail.isPaused);
            }
        };

        window.addEventListener('heroSlideChange', handleSlideChange);
        window.addEventListener('pageThemeChange', handlePauseState);
        
        return () => {
            window.removeEventListener('heroSlideChange', handleSlideChange);
            window.removeEventListener('pageThemeChange', handlePauseState);
        };
    }, []);

    useEffect(() => {
        // Handle scrolling state
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const dynamicStyles = {
        blue: { bg: "from-white via-[#e6e9f0] to-[#d0d6e3]", shadow: "hover:shadow-slate-200", syncText: "text-[#020817]", loginBtn: "text-[#020817] border-[#020817]", loginHoverBg: "bg-[#020817]", signupBtn: "bg-[#020817] border-[#020817]", signupTextHover: "hover:text-[#020817]", linkHover: "hover:text-[#020817]", logoBg: "bg-[#020817]", logoBorder: "border-[#020817]", logoText: "text-white" },
        indigo: { bg: "from-white via-[#f5e6e1] to-[#e8d5ce]", shadow: "hover:shadow-amber-200", syncText: "text-[#431407]", loginBtn: "text-[#431407] border-[#431407]", loginHoverBg: "bg-[#431407]", signupBtn: "bg-[#431407] border-[#431407]", signupTextHover: "hover:text-[#431407]", linkHover: "hover:text-[#431407]", logoBg: "bg-[#431407]", logoBorder: "border-[#431407]", logoText: "text-white" },
        orange: { bg: "from-white via-[#e3ebf7] to-[#c6d7f0]", shadow: "hover:shadow-blue-200", syncText: "text-blue-800", loginBtn: "text-blue-800 border-blue-800", loginHoverBg: "bg-blue-800", signupBtn: "bg-blue-800 border-blue-800", signupTextHover: "hover:text-blue-800", linkHover: "hover:text-blue-800", logoBg: "bg-blue-800", logoBorder: "border-blue-800", logoText: "text-white" }
    };

    const themeClasses = {
        blue: "bg-slate-200/95 border-slate-300 shadow-sm",
        indigo: "bg-slate-200/95 border-slate-300 shadow-sm",
        orange: "bg-slate-200/95 border-slate-300 shadow-sm"
    };

    const currentTheme = (scrolled && !isSliderPaused) ? 'blue' : navTheme;

    const activeNavClass = scrolled 
        ? `${themeClasses[currentTheme]} backdrop-blur-md shadow-md border-b`
        : "bg-slate-200 shadow-sm border-b border-gray-200";

    return (
        <motion.nav 
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`sticky top-0 z-50 transition-colors duration-500 ${activeNavClass}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-teal-600 mr-2 md:mr-8">
                            <motion.div 
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                style={{ transformStyle: "preserve-3d" }}
                                className="w-8 h-8 relative mr-3"
                            >
                                {/* Front Face (Original) */}
                                <div 
                                    style={{ backfaceVisibility: "hidden" }}
                                    className={`absolute inset-0 ${dynamicStyles[currentTheme].logoBg} rounded-lg flex items-center justify-center border ${dynamicStyles[currentTheme].logoBorder} transition-colors duration-500`}
                                >
                                    <GraduationCap className={`w-5 h-5 ${dynamicStyles[currentTheme].logoText} transition-colors duration-500`} />
                                </div>
                                {/* Back Face (New Color) */}
                                <div 
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                    className={`absolute inset-0 ${dynamicStyles[currentTheme].logoBg} rounded-lg flex items-center justify-center border ${dynamicStyles[currentTheme].logoBorder} transition-colors duration-500`}
                                >
                                    <GraduationCap className={`w-5 h-5 ${dynamicStyles[currentTheme].logoText} transition-colors duration-500`} />
                                </div>
                            </motion.div>
                            <span className="font-bold text-xl tracking-tight">
                                <span className="text-slate-800">Career</span>
                                <span className={`${dynamicStyles[currentTheme].syncText} transition-colors duration-500`}>Sync</span>
                            </span>
                        </Link>
                        
                        {/* Public Navigation Links with Hover Dropdown Cards */}
                        <div className="hidden lg:flex space-x-1 border-l pl-6 border-gray-200">
                            {[
                                {
                                    name: 'Home', href: '/',
                                    details: [
                                        { title: 'Overview', desc: 'Back to the main dashboard', link: '/' },
                                        { title: 'Platform Features', desc: 'See what CareerSync offers', link: '/' },
                                        { title: 'Success Stories', desc: 'Read about our alumni', link: '/' },
                                        { title: 'Testimonials', desc: 'What partners say about us', link: '/' }
                                    ]
                                },
                                {
                                    name: 'About', href: '/',
                                    details: [
                                        { title: 'Our Mission', desc: 'Learn about CareerSync', link: '/' },
                                        { title: 'Our Team', desc: 'Meet the creators behind the platform', link: '/' },
                                        { title: 'Careers', desc: 'Join our growing team', link: '/' },
                                        { title: 'Contact Us', desc: 'Get in touch with headquarters', link: '/' }
                                    ]
                                },
                                {
                                    name: 'Students', href: '/register',
                                    details: [
                                        { title: 'Skill Analysis', desc: 'Find your skill gaps with AI', link: '/skill-gap' },
                                        { title: 'Build Profile', desc: 'Showcase your portfolio to employers', link: '/profile' },
                                        { title: 'Career Paths', desc: 'Explore tech and non-tech roles', link: '/' },
                                        { title: 'Mock Interviews', desc: 'Practice with AI interviewers', link: '/' }
                                    ]
                                },
                                {
                                    name: 'Institutions', href: '/',
                                    details: [
                                        { title: 'TPO Dashboard', desc: 'Track comprehensive placement metrics', link: '/institution' },
                                        { title: 'Student Roster', desc: 'Manage your batches and departments', link: '/' },
                                        { title: 'Placement Reports', desc: 'Generate real-time analytics', link: '/' },
                                        { title: 'Alumni Network', desc: 'Connect with past graduates', link: '/' }
                                    ]
                                },
                                {
                                    name: 'Employers', href: '/',
                                    details: [
                                        { title: 'Post Opportunities', desc: 'Hire top campus talent quickly', link: '/employer' },
                                        { title: 'Talent Search', desc: 'Filter through verified students', link: '/' },
                                        { title: 'Company Profile', desc: 'Manage your employer brand', link: '/' },
                                        { title: 'Hiring Analytics', desc: 'Track your hiring pipeline', link: '/' }
                                    ]
                                },
                                {
                                    name: 'Jobs', href: '/jobs',
                                    details: [
                                        { title: 'Job Board', desc: 'Browse all active full-time jobs', link: '/jobs' },
                                        { title: 'Internships', desc: 'Start your career with summer roles', link: '/jobs' },
                                        { title: 'Saved Jobs', desc: 'View roles you bookmarked', link: '/' },
                                        { title: 'Application History', desc: 'Track your submitted applications', link: '/' }
                                    ]
                                },
                                {
                                    name: 'Mentorship', href: '/',
                                    details: [
                                        { title: 'Find a Mentor', desc: 'Connect with industry experts', link: '/' },
                                        { title: 'Become a Mentor', desc: 'Guide the next generation of talent', link: '/' },
                                        { title: 'Mentorship Programs', desc: 'Join structured 6-week cohorts', link: '/' },
                                        { title: 'Success Stories', desc: 'Read about successful mentor pairs', link: '/' }
                                    ]
                                },
                                {
                                    name: 'Events', href: '/',
                                    details: [
                                        { title: 'Career Fairs', desc: 'Upcoming campus hiring drives', link: '/' },
                                        { title: 'Workshops', desc: 'Skill-building technical sessions', link: '/' },
                                        { title: 'Webinars', desc: 'Learn from industry thought leaders', link: '/' },
                                        { title: 'Hackathons', desc: 'Compete and showcase your coding skills', link: '/' }
                                    ]
                                },
                                {
                                    name: 'Contact', href: '/',
                                    details: [
                                        { title: 'Support Helpdesk', desc: 'Get help with your account issues', link: '/' },
                                        { title: 'Partnerships', desc: 'Collaborate and partner with us', link: '/' },
                                        { title: 'Sales Inquiries', desc: 'Talk to our enterprise sales team', link: '/' },
                                        { title: 'FAQ', desc: 'Frequently asked questions', link: '/' }
                                    ]
                                }
                            ].map((item) => (
                                <div key={item.name} className="group relative">
                                    <Link 
                                        to={item.href} 
                                        className={`text-gray-600 ${dynamicStyles[currentTheme].linkHover} transition-all duration-300 px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors inline-flex items-center h-full`}
                                    >
                                        {item.name}
                                    </Link>
                                    
                                    {/* Floating Dropdown Card */}
                                    <div className="absolute left-0 mt-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:translate-y-1 group-hover:visible transition-all duration-200 z-50">
                                        <div className={`bg-gradient-to-r ${dynamicStyles[currentTheme].bg} rounded-xl shadow-xl border border-gray-100 p-3 overflow-hidden transition-colors duration-500`}>
                                            {item.details.map((detail, idx) => (
                                                <Link 
                                                    key={idx} 
                                                    to={detail.link}
                                                    className={`block p-3 rounded-lg hover:bg-white hover:shadow-lg ${dynamicStyles[currentTheme].shadow} transition-all duration-300`}
                                                >
                                                    <div className="font-semibold text-gray-900 text-sm">{detail.title}</div>
                                                    <div className="text-xs text-gray-500 mt-1">{detail.desc}</div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                {user.role === 'student' && (
                                    <>
                                        <Link to="/profile" className={`text-gray-700 ${dynamicStyles[currentTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Profile</Link>
                                        <Link to="/skill-gap" className={`text-gray-700 ${dynamicStyles[currentTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Skill Gap</Link>
                                        <Link to="/jobs" className={`text-gray-700 ${dynamicStyles[currentTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Opportunities</Link>
                                    </>
                                )}
                                {user.role === 'industry' && (
                                    <>
                                        <Link to="/employer" className={`text-gray-700 ${dynamicStyles[currentTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Dashboard</Link>
                                        <Link to="/jobs" className={`text-gray-700 ${dynamicStyles[currentTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>All Postings</Link>
                                    </>
                                )}
                                {['faculty', 'tpo', 'admin'].includes(user.role) && (
                                    <>
                                        <Link to="/institution" className={`text-gray-700 ${dynamicStyles[currentTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Analytics Dashboard</Link>
                                        <Link to="/jobs" className={`text-gray-700 ${dynamicStyles[currentTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>View Opportunities</Link>
                                    </>
                                )}
                                <span className="text-gray-500 text-sm hidden md:inline ml-4 border-l pl-4">
                                    {user.name} ({user.role})
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`group relative overflow-hidden px-2.5 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-normal bg-transparent border rounded-md transition-all duration-500 hover:text-white ${dynamicStyles[currentTheme].loginBtn}`}
                                >
                                    <span className={`absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 ${dynamicStyles[currentTheme].loginHoverBg}`}></span>
                                    <span className="relative z-10">Log in</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className={`ml-2 md:ml-3 group relative overflow-hidden px-2.5 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-normal text-white border rounded-md transition-all duration-500 ${dynamicStyles[currentTheme].signupBtn} ${dynamicStyles[currentTheme].signupTextHover}`}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                                    <span className="relative z-10">Sign up</span>
                                </Link>
                            </>
                        )}
                        {/* Mobile Hamburger Icon */}
                        <button 
                            className="lg:hidden ml-2 md:ml-4 p-1 md:p-1.5 text-gray-700 hover:text-black rounded-md hover:bg-black/5 transition"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-t border-gray-200 bg-white overflow-hidden shadow-xl"
                    >
                        <div className="px-6 py-5 flex flex-col space-y-5">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-semibold text-lg border-b border-gray-100 pb-2">Home</Link>
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-semibold text-lg border-b border-gray-100 pb-2">About</Link>
                            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-semibold text-lg border-b border-gray-100 pb-2">Students</Link>
                            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-semibold text-lg border-b border-gray-100 pb-2">Institutions</Link>
                            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-semibold text-lg border-b border-gray-100 pb-2">Companies</Link>
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-semibold text-lg">Contact</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;














