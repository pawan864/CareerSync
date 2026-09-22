import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-indigo-600 mr-8">
                            <GraduationCap className="h-8 w-8 mr-2" />
                            <span className="font-bold text-xl tracking-tight">
                                <span className="text-gray-900">Career</span>
                                <span className="text-indigo-600">Sync</span>
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
                                        className="text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors inline-flex items-center h-full"
                                    >
                                        {item.name}
                                    </Link>
                                    
                                    {/* Floating Dropdown Card */}
                                    <div className="absolute left-0 mt-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:translate-y-1 group-hover:visible transition-all duration-200 z-50">
                                        <div className="bg-gradient-to-r from-white via-blue-100 to-blue-300 rounded-xl shadow-xl border border-gray-100 p-3 overflow-hidden">
                                            {item.details.map((detail, idx) => (
                                                <Link 
                                                    key={idx} 
                                                    to={detail.link}
                                                    className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"
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
                                        <Link to="/profile" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                                        <Link to="/skill-gap" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Skill Gap</Link>
                                        <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Opportunities</Link>
                                    </>
                                )}
                                {user.role === 'industry' && (
                                    <>
                                        <Link to="/employer" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                        <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">All Postings</Link>
                                    </>
                                )}
                                {['faculty', 'tpo', 'admin'].includes(user.role) && (
                                    <>
                                        <Link to="/institution" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Analytics Dashboard</Link>
                                        <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">View Opportunities</Link>
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
                                    className="group relative overflow-hidden px-5 py-2 text-sm font-medium text-blue-600 bg-transparent border border-blue-600 rounded-md transition-colors duration-300 hover:text-white"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-blue-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                                    <span className="relative z-10">Log in</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="ml-3 group relative overflow-hidden px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md transition-colors duration-300 hover:text-blue-600"
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
