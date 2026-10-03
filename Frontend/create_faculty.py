import os

faculty_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx'

content = """import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Users, BookOpen, MessageSquare, TrendingUp, 
    LogOut, Bell, Search, GraduationCap, CheckCircle, BarChart2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');

    const handleLogout = () => {
        navigate('/login');
    };

    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'Student Management', icon: Users },
        { name: 'Curriculum & Mapping', icon: BookOpen },
        { name: 'Mentorship', icon: MessageSquare },
        { name: 'Performance Analytics', icon: BarChart2 },
        { name: 'Industry Trends', icon: TrendingUp },
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
                        <div className="w-16 h-16 bg-[#047857]/10 rounded-full flex items-center justify-center mb-4">
                            <BookOpen className="w-8 h-8 text-[#047857]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{activeTab}</h3>
                        <p className="text-gray-500 max-w-md">
                            This academic module is currently being configured for your department.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <motion.div 
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                className="w-64 bg-[#047857] flex flex-col relative z-20 shadow-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#047857]/90 via-[#047857]/80 to-[#064e3b] z-0"></div>
                
                {/* Brand */}
                <div className="h-20 flex items-center px-6 border-b border-emerald-700/50 relative z-10">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white">Career<span className="text-emerald-200">Sync</span></h2>
                        <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold">Faculty Portal</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto slim-scrollbar py-6 px-4 space-y-1.5 relative z-10">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                activeTab === item.name 
                                ? 'bg-white/20 text-white shadow-sm' 
                                : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.name ? 'text-white' : 'text-emerald-200'}`} />
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* Logout Area */}
                <div className="p-4 border-t border-emerald-700/50 relative z-10">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center p-3 text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium group"
                    >
                        <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative z-10 overflow-hidden bg-gray-50">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-20 shadow-sm">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">{activeTab}</h1>
                        <p className="text-xs text-gray-500">Academic & Mentorship Dashboard</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search students or courses..." 
                                className="pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-800 transition-all w-64"
                            />
                        </div>
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-800 leading-none">Dr. Smith</p>
                                <p className="text-[10px] text-[#047857] font-semibold">Computer Science</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold border-2 border-emerald-200">
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
                { label: 'Assigned Students', value: '142', icon: Users, color: 'bg-blue-100', text: 'text-blue-600' },
                { label: 'Courses Taught', value: '4', icon: BookOpen, color: 'bg-emerald-100', text: 'text-emerald-600' },
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
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                                S{i}
                            </div>
                            <div>
                                <p className="text-gray-800 font-medium text-sm">Student Name {i}</p>
                                <p className="text-gray-500 text-xs">Submitted Project Phase {i} for Review</p>
                            </div>
                        </div>
                        <button className="px-3 py-1.5 text-emerald-600 border border-emerald-200 rounded-lg text-xs font-medium hover:bg-emerald-50 transition-colors">
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
        <h3 className="text-lg font-bold text-gray-800 mb-6">UC-9: Student Assessment & Evaluation</h3>
        <p className="text-gray-500 text-sm mb-6">Track and evaluate your assigned students' academic and skill progression.</p>
        
        <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold uppercase">
                            S{i}
                        </div>
                        <div>
                            <p className="text-gray-800 font-medium text-sm">John Doe {i} <span className="text-emerald-600 text-[10px] uppercase ml-2 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">Top 10%</span></p>
                            <p className="text-gray-500 text-xs">CS Department &bull; Semester 6</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Skill Score</p>
                            <p className="text-sm font-bold text-gray-800">{85 + i}%</p>
                        </div>
                        <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors">
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
        <h3 className="text-lg font-bold text-gray-800 mb-6">UC-8: Curriculum Tracking & Mapping</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-gray-800 font-semibold text-sm">CS-301: Advanced Databases</h4>
                    <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">In Progress</span>
                </div>
                <p className="text-gray-500 text-xs mb-4">Currently tracking alignment with emerging industry demand (NoSQL, Vector DBs).</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-right text-[10px] text-gray-500 font-medium">65% mapped to industry standards</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-gray-800 font-semibold text-sm">CS-305: Cloud Computing</h4>
                    <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Needs Review</span>
                </div>
                <p className="text-gray-500 text-xs mb-4">Industry demand for AWS/Azure has shifted. Curriculum requires updating.</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-right text-[10px] text-gray-500 font-medium">40% mapped to industry standards</p>
            </div>
        </div>
    </div>
);

export default FacultyDashboard;
"""

with open(faculty_path, 'w', encoding='utf-8') as f:
    f.write(content)
