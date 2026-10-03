import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [navTheme, setNavTheme] = useState('indigo');

    useEffect(() => {
        // Sync Navbar with global theme changes
        const handleThemeChange = (e) => {
            setNavTheme(e.detail.theme || 'indigo');
        };
        
        // Initialize from localStorage
        const savedTheme = localStorage.getItem('globalTheme');
        if (savedTheme) {
            setNavTheme(savedTheme);
        }

        window.addEventListener('pageThemeChange', handleThemeChange);
        return () => window.removeEventListener('pageThemeChange', handleThemeChange);
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
        blue: { bg: "from-white via-blue-100 to-blue-300", shadow: "hover:shadow-blue-200", syncText: "text-blue-900", loginBtn: "text-blue-900 border-blue-900", loginHoverBg: "bg-blue-900", signupBtn: "bg-blue-900 border-blue-900", signupTextHover: "hover:text-blue-900", linkHover: "hover:text-blue-900", logoBg: "from-green-500/20 to-blue-600/20", logoBorder: "border-blue-200", logoText: "text-blue-800" },
        indigo: { bg: "from-white via-indigo-100 to-indigo-300", shadow: "hover:shadow-indigo-200", syncText: "text-indigo-900", loginBtn: "text-indigo-900 border-indigo-900", loginHoverBg: "bg-indigo-900", signupBtn: "bg-indigo-900 border-indigo-900", signupTextHover: "hover:text-indigo-900", linkHover: "hover:text-indigo-900", logoBg: "from-purple-500/20 to-indigo-600/20", logoBorder: "border-indigo-200", logoText: "text-indigo-800" },
        orange: { bg: "from-white via-orange-100 to-orange-300", shadow: "hover:shadow-orange-200", syncText: "text-orange-900", loginBtn: "text-orange-900 border-orange-900", loginHoverBg: "bg-orange-900", signupBtn: "bg-orange-900 border-orange-900", signupTextHover: "hover:text-orange-900", linkHover: "hover:text-orange-900", logoBg: "from-amber-500/20 to-orange-600/20", logoBorder: "border-orange-200", logoText: "text-orange-800" }
    };

    const themeClasses = {
        blue: "bg-blue-50/95 border-blue-200 shadow-blue-900/5",
        indigo: "bg-indigo-50/95 border-indigo-200 shadow-indigo-900/5",
        orange: "bg-orange-50/95 border-orange-200 shadow-orange-900/5"
    };

    const activeNavClass = scrolled 
        ? `${themeClasses[navTheme]} backdrop-blur-md shadow-md border-b`
        : "bg-white shadow-sm border-b border-gray-200";

    return (
        <nav className={`sticky top-0 z-50 transition-colors duration-500 ${activeNavClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-teal-600 mr-8">
                            <motion.div 
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                style={{ transformStyle: "preserve-3d" }}
                                className="w-8 h-8 relative mr-3"
                            >
                                {/* Front Face (Original) */}
                                <div 
                                    style={{ backfaceVisibility: "hidden" }}
                                    className={`absolute inset-0 bg-gradient-to-br ${dynamicStyles[navTheme].logoBg} rounded-lg flex items-center justify-center border ${dynamicStyles[navTheme].logoBorder} transition-colors duration-500`}
                                >
                                    <GraduationCap className={`w-5 h-5 ${dynamicStyles[navTheme].logoText} transition-colors duration-500`} />
                                </div>
                                {/* Back Face (New Color) */}
                                <div 
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                    className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-black/20 rounded-lg flex items-center justify-center border border-gray-300"
                                >
                                    <GraduationCap className="w-5 h-5 text-black" />
                                </div>
                            </motion.div>
                            <span className="font-bold text-xl tracking-tight">
                                <span className="text-slate-800">Career</span>
                                <span className={`${dynamicStyles[navTheme].syncText} transition-colors duration-500`}>Sync</span>
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
                                        className={`text-gray-600 ${dynamicStyles[navTheme].linkHover} transition-all duration-300 px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors inline-flex items-center h-full`}
                                    >
                                        {item.name}
                                    </Link>
                                    
                                    {/* Floating Dropdown Card */}
                                    <div className="absolute left-0 mt-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:translate-y-1 group-hover:visible transition-all duration-200 z-50">
                                        <div className={`bg-gradient-to-r ${dynamicStyles[navTheme].bg} rounded-xl shadow-xl border border-gray-100 p-3 overflow-hidden transition-colors duration-500`}>
                                            {item.details.map((detail, idx) => (
                                                <Link 
                                                    key={idx} 
                                                    to={detail.link}
                                                    className={`block p-3 rounded-lg hover:bg-white hover:shadow-lg ${dynamicStyles[navTheme].shadow} transition-all duration-300`}
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
                                        <Link to="/profile" className={`text-gray-700 ${dynamicStyles[navTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Profile</Link>
                                        <Link to="/skill-gap" className={`text-gray-700 ${dynamicStyles[navTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Skill Gap</Link>
                                        <Link to="/jobs" className={`text-gray-700 ${dynamicStyles[navTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Opportunities</Link>
                                    </>
                                )}
                                {user.role === 'industry' && (
                                    <>
                                        <Link to="/employer" className={`text-gray-700 ${dynamicStyles[navTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Dashboard</Link>
                                        <Link to="/jobs" className={`text-gray-700 ${dynamicStyles[navTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>All Postings</Link>
                                    </>
                                )}
                                {['faculty', 'tpo', 'admin'].includes(user.role) && (
                                    <>
                                        <Link to="/institution" className={`text-gray-700 ${dynamicStyles[navTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>Analytics Dashboard</Link>
                                        <Link to="/jobs" className={`text-gray-700 ${dynamicStyles[navTheme].linkHover} transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium`}>View Opportunities</Link>
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
                                    className={`group relative overflow-hidden px-5 py-2 text-sm font-medium bg-transparent border rounded-md transition-all duration-500 hover:text-white ${dynamicStyles[navTheme].loginBtn}`}
                                >
                                    <span className={`absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 ${dynamicStyles[navTheme].loginHoverBg}`}></span>
                                    <span className="relative z-10">Log in</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className={`ml-3 group relative overflow-hidden px-5 py-2 text-sm font-medium text-white border rounded-md transition-all duration-500 ${dynamicStyles[navTheme].signupBtn} ${dynamicStyles[navTheme].signupTextHover}`}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                                    <span className="relative z-10">Sign up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
