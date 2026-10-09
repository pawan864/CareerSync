import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Users, BookOpen, MessageSquare, TrendingUp, 
    LogOut, Menu, X, Bell, Search, GraduationCap, CheckCircle, BarChart2, ClipboardList, FolderOpen, Calendar, Mail, Settings, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'Student Management', icon: Users },
        { name: 'Curriculum & Mapping', icon: BookOpen },
        { name: 'Assignments & Grading', icon: ClipboardList },
        { name: 'Course Materials', icon: FolderOpen },
        { name: 'Schedule', icon: Calendar },
        { name: 'Mentorship', icon: MessageSquare },
        { name: 'Performance Analytics', icon: BarChart2 },
        { name: 'Industry Trends', icon: TrendingUp },
        { name: 'Messages', icon: Mail },
        { name: 'Settings', icon: Settings },
        { name: 'Help & Support', icon: HelpCircle },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <OverviewModule />;
            case 'Student Management':
                return <StudentManagementModule />;
            case 'Curriculum & Mapping':
                return <CurriculumModule />;
            default:
                return (
                    <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-[#1e3a8a]/10 rounded-full flex items-center justify-center mb-4">
                            <BookOpen className="w-8 h-8 text-[#1e3a8a]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{activeTab}</h3>
                        <p className="text-gray-500 max-w-md">
                            No records found for the current academic session.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen w-full max-w-[100vw] overflow-hidden bg-gray-50 flex">
            {/* Sidebar */}
            <motion.div 
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                className={`fixed md:relative w-64 h-full bg-[#1e3a8a] flex flex-col z-30 shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/90 via-[#1e3a8a]/80 to-[#172554] z-0"></div>
                
                {/* Brand */}
                <div className="h-20 flex items-center px-6 border-b border-blue-900/50 relative z-10 bg-black/30 shadow-inner">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white">Career<span className="text-amber-400">Sync</span></h2>
                        <span className="text-[10px] uppercase tracking-widest text-blue-300 font-semibold">Faculty Portal</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto slim-scrollbar py-6 px-4 space-y-1.5 relative z-10">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 active:scale-95 ${
                                activeTab === item.name 
                                ? 'bg-white/20 text-white shadow-sm' 
                                : 'text-blue-100 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.name ? 'text-white' : 'text-blue-200'}`} />
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* Logout Area */}
                <div className="p-4 border-t border-blue-900/50 relative z-10">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center py-2 px-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 active:scale-95 text-xs font-semibold border border-red-500/20 hover:border-red-500 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] group"
                    >
                        <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </motion.div>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 md:hidden" 
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative z-10 overflow-hidden bg-gray-50">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 z-20 shadow-sm">
                    <div className="flex items-center">
                        <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 mr-2 text-gray-400 hover:text-gray-800 rounded-lg hover:bg-gray-100"><Menu className="w-6 h-6" /></button>
                        <div>
                        <h1 className="text-xl font-bold text-gray-800">{activeTab}</h1>
                        <p className="text-xs text-gray-500">Academic & Mentorship Dashboard</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search students or courses..." 
                                className="pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 transition-all w-32 md:w-64"
                            />
                        </div>
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-800 leading-none">Dr. Smith</p>
                                <p className="text-[10px] text-[#1e3a8a] font-semibold">Computer Science</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold border-2 border-blue-200">
                                DS
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto slim-scrollbar p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

const OverviewModule = () => (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
                { label: 'Assigned Students', value: '142', icon: Users, color: 'bg-blue-100', text: 'text-blue-900' },
                { label: 'Courses Taught', value: '4', icon: BookOpen, color: 'bg-blue-100', text: 'text-blue-900' },
                { label: 'Pending Reviews', value: '12', icon: MessageSquare, color: 'bg-amber-100', text: 'text-amber-600' },
                { label: 'Avg Skill Match', value: '78%', icon: TrendingUp, color: 'bg-purple-100', text: 'text-purple-600' }
            ].map((stat, i) => (
                <div key={i} className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                        <div className={`p-2 rounded-lg ${stat.color}`}>
                            <stat.icon className={`w-5 h-5 ${stat.text}`} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
            ))}
        </div>
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Mentorship Activity</h3>
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                                S{i}
                            </div>
                            <div>
                                <p className="text-gray-800 font-medium text-sm">Student Name {i}</p>
                                <p className="text-gray-500 text-xs">Submitted Project Phase {i} for Review</p>
                            </div>
                        </div>
                        <button className="px-3 py-1.5 text-blue-900 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">
                            Review
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const StudentManagementModule = () => (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Student Assessment & Evaluation</h3>
        <p className="text-gray-500 text-sm mb-6">Filter and review student performance records.</p>
        
        <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold uppercase">
                            S{i}
                        </div>
                        <div>
                            <p className="text-gray-800 font-medium text-sm">John Doe {i} <span className="text-blue-900 text-[10px] uppercase ml-2 bg-blue-50 px-1.5 py-0.5 rounded font-bold">Top 10%</span></p>
                            <p className="text-gray-500 text-xs">CS Department &bull; Semester 6</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Skill Score</p>
                            <p className="text-sm font-bold text-gray-800">{85 + i}%</p>
                        </div>
                        <button className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-medium hover:bg-blue-800 transition-colors">
                            Evaluate
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const CurriculumModule = () => (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Curriculum Tracking & Mapping</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-gray-800 font-semibold text-sm">CS-301: Advanced Databases</h4>
                    <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">In Progress</span>
                </div>
                <p className="text-gray-500 text-xs mb-4">Syllabus revision pending department head approval.</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-right text-[10px] text-gray-500 font-medium">65% mapped to industry standards</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-gray-800 font-semibold text-sm">CS-305: Cloud Computing</h4>
                    <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Needs Review</span>
                </div>
                <p className="text-gray-500 text-xs mb-4">Outdated modules detected based on recent industry skill trends.</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-right text-[10px] text-gray-500 font-medium">40% mapped to industry standards</p>
            </div>
        </div>
    </div>
);

export default FacultyDashboard;
