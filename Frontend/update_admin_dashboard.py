import os

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'

content = """import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Users, Building2, Activity, FileText, ShieldCheck, 
    Settings, LogOut, Bell, Search, AlertCircle, Database,
    UserCheck, ShieldAlert, BarChart2, Brain, MessageSquare, TrendingUp, CheckCircle, XCircle, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');

    const handleLogout = () => {
        // In a real app, clear tokens here
        navigate('/admin-login');
    };

    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'User Verification', icon: UserCheck },
        { name: 'Content Moderation', icon: ShieldAlert },
        { name: 'Analytics & Reports', icon: BarChart2 },
        { name: 'AI Engine', icon: Brain },
        { name: 'Feedback & Growth', icon: MessageSquare },
        { name: 'System Logs', icon: Activity },
        { name: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <OverviewModule />;
            case 'User Verification':
                return <VerificationModule />;
            case 'Content Moderation':
                return <ModerationModule />;
            case 'Analytics & Reports':
                return <AnalyticsModule />;
            case 'AI Engine':
                return <AIEngineModule />;
            case 'Feedback & Growth':
                return <FeedbackModule />;
            default:
                return (
                    <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                            <Activity className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{activeTab} Module</h3>
                        <p className="text-gray-500 max-w-md">
                            This module is currently under construction.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-red-900/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Sidebar */}
            <motion.div 
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                className="w-64 bg-[#0a0a0a] border-r border-gray-800/60 flex flex-col relative z-20 shadow-2xl"
            >
                {/* Brand */}
                <div className="h-20 flex items-center px-6 border-b border-gray-800/60">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white">Career<span className="text-red-500">Sync</span></h2>
                        <span className="text-[10px] uppercase tracking-widest text-red-400 font-semibold">Admin Console</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto slim-scrollbar py-6 px-4 space-y-1.5">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                activeTab === item.name 
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[inset_0_0_20px_rgba(220,38,38,0.05)]' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.name ? 'text-red-400' : 'text-gray-500'}`} />
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* Logout Area */}
                <div className="p-4 border-t border-gray-800/60">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-white/10 group"
                    >
                        <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {/* Top Header */}
                <header className="h-20 border-b border-gray-800/60 bg-[#0a0a0a]/80 backdrop-blur-xl flex items-center justify-between px-8 z-20">
                    <div>
                        <h1 className="text-xl font-bold text-white">{activeTab}</h1>
                        <p className="text-xs text-gray-500">System overview and management</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Search system logs..." 
                                className="pl-9 pr-4 py-2 bg-[#121212] border border-gray-800 rounded-full text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-white placeholder-gray-600 transition-all w-64"
                            />
                        </div>
                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0a0a0a]"></span>
                        </button>
                        <div className="flex items-center space-x-3 pl-6 border-l border-gray-800">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-white leading-none">Super Admin</p>
                                <p className="text-[10px] text-red-400 font-medium">System Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold shadow-md border-2 border-red-500/20 cursor-pointer">
                                SA
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

/* =========================================
   MODULE COMPONENTS 
   ========================================= */

const OverviewModule = () => (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
                { label: 'Total Users', value: '14,205', icon: Users, color: 'from-blue-600/20 to-blue-900/20', text: 'text-blue-400' },
                { label: 'Active Institutions', value: '482', icon: Building2, color: 'from-green-600/20 to-green-900/20', text: 'text-green-400' },
                { label: 'System Alerts', value: '3', icon: AlertCircle, color: 'from-red-600/20 to-red-900/20', text: 'text-red-400' },
                { label: 'AI Operations / hr', value: '2.4k', icon: Brain, color: 'from-purple-600/20 to-purple-900/20', text: 'text-purple-400' }
            ].map((stat, i) => (
                <div key={i} className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 p-6 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-colors">
                    <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl group-hover:scale-110 transition-transform`}></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
                        <stat.icon className={`w-5 h-5 ${stat.text}`} />
                    </div>
                    <p className="text-3xl font-bold text-white relative z-10">{stat.value}</p>
                </div>
            ))}
        </div>
        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                <ShieldCheck className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">System Healthy</h3>
            <p className="text-gray-500 max-w-md">All core services, ML pipelines, and user verification APIs are running normally.</p>
        </div>
    </div>
);

const VerificationModule = () => (
    <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">UC-29: Pending Verifications</h3>
        
        <div className="flex space-x-4 mb-6 border-b border-gray-800 pb-2">
            {['Students', 'Faculty', 'Institutions', 'Companies', 'Recruiters'].map((tab, i) => (
                <button key={tab} className={`px-4 py-2 text-sm font-medium ${i === 0 ? 'text-red-400 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-300'}`}>
                    {tab}
                </button>
            ))}
        </div>

        <div className="space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">S{i}</div>
                        <div>
                            <p className="text-white font-medium text-sm">Student Name {i}</p>
                            <p className="text-gray-500 text-xs">University ID: 19283{i} • Pending Document Verification</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1.5 bg-green-900/30 text-green-400 border border-green-500/30 rounded-lg text-xs font-medium hover:bg-green-900/50 flex items-center">
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                        </button>
                        <button className="px-3 py-1.5 bg-red-900/30 text-red-400 border border-red-500/30 rounded-lg text-xs font-medium hover:bg-red-900/50 flex items-center">
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ModerationModule = () => (
    <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">UC-30: Content & Opportunity Moderation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Internship Listings', 'Job Postings', 'Training Programs'].map((title, idx) => (
                <div key={idx} className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-gray-300 font-semibold text-sm">{title}</h4>
                        <span className="bg-red-900/50 text-red-400 text-[10px] px-2 py-0.5 rounded-full border border-red-500/30">Requires Review</span>
                    </div>
                    <p className="text-white text-sm font-medium mb-1">Software Engineer Intern</p>
                    <p className="text-gray-500 text-xs mb-4">TechCorp Inc. • Posted 2h ago</p>
                    <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium transition-colors flex items-center justify-center">
                        <Eye className="w-3.5 h-3.5 mr-1.5" /> Review Content
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const AnalyticsModule = () => (
    <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-2">UC-31: Analytics & Reporting</h3>
        <p className="text-gray-500 text-sm mb-6">Generate insights across universities, departments, and industry partners.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 flex flex-col justify-center items-center h-48">
                <BarChart2 className="w-10 h-10 text-blue-500 mb-3 opacity-50" />
                <p className="text-gray-400 font-medium">Placement Trends Chart</p>
                <p className="text-gray-600 text-xs mt-1">Data visualization component</p>
            </div>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 flex flex-col justify-center items-center h-48">
                <TrendingUp className="w-10 h-10 text-green-500 mb-3 opacity-50" />
                <p className="text-gray-400 font-medium">Internship Participation Map</p>
                <p className="text-gray-600 text-xs mt-1">Geospatial visualization component</p>
            </div>
        </div>

        <div className="flex space-x-3">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-colors">Generate University Report</button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium border border-gray-700 transition-colors">Generate Industry Report</button>
        </div>
    </div>
);

const AIEngineModule = () => (
    <div className="space-y-6">
        {/* Skill Demand Analytics */}
        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">UC-35: Industry Skill Demand Analytics</h3>
            <p className="text-gray-500 text-sm mb-6">Aggregated real-time skill demand from active job/internship listings.</p>
            
            <div className="space-y-3">
                {[
                    { skill: 'Python', pct: 90, color: 'bg-blue-500' },
                    { skill: 'SQL', pct: 82, color: 'bg-blue-400' },
                    { skill: 'Cloud (AWS/Azure)', pct: 75, color: 'bg-cyan-500' },
                    { skill: 'AI/ML', pct: 68, color: 'bg-purple-500' },
                    { skill: 'DevOps', pct: 50, color: 'bg-green-500' },
                    { skill: 'Cybersecurity', pct: 45, color: 'bg-red-500' }
                ].map((s, idx) => (
                    <div key={idx} className="flex items-center">
                        <span className="w-32 text-xs font-medium text-gray-300">{s.skill}</span>
                        <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${s.pct}%` }}
                                transition={{ duration: 1, delay: idx * 0.1 }}
                                className={`h-full ${s.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-5">
                <Brain className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-white font-bold text-sm mb-1">UC-32: AI Skill Extraction</h4>
                <p className="text-gray-500 text-xs">Monitors resume NLP parsing engine status. Currently processing 45 resumes/min.</p>
            </div>
            <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-5">
                <Activity className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="text-white font-bold text-sm mb-1">UC-33: AI Skill Matching</h4>
                <p className="text-gray-500 text-xs">Evaluates student profile gap logic and matching algorithms against JD requirements.</p>
            </div>
            <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-5">
                <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="text-white font-bold text-sm mb-1">UC-34: Path Recommendations</h4>
                <p className="text-gray-500 text-xs">Manages recommendation engine based on academic background and industry demand.</p>
            </div>
        </div>
    </div>
);

const FeedbackModule = () => (
    <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">UC-36/37/38: Feedback & Continuous Improvement</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-5">
                <h4 className="text-gray-300 font-semibold text-sm mb-4 border-b border-gray-800 pb-2">Student -> Industry Feedback</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Mentorship Quality</span>
                        <span className="text-green-400 font-bold">4.8/5.0</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Work Environment</span>
                        <span className="text-green-400 font-bold">4.6/5.0</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-5">
                <h4 className="text-gray-300 font-semibold text-sm mb-4 border-b border-gray-800 pb-2">Industry -> Student Feedback</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Technical Skills</span>
                        <span className="text-blue-400 font-bold">4.2/5.0</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Problem Solving</span>
                        <span className="text-blue-400 font-bold">4.5/5.0</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-6 bg-[#0a0a0a] border border-gray-800 rounded-xl p-5">
            <h4 className="text-gray-300 font-semibold text-sm mb-2">Automated Skill Profile Updating (UC-38)</h4>
            <p className="text-gray-500 text-xs">
                System tracking updates: <span className="text-white font-medium">Skill Profile → Gap → Learning → Internship → Experience → Updated Profile</span>
            </p>
        </div>
    </div>
);

export default AdminDashboard;
"""

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
