import os

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
dashboard_content = """import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Users, Building2, ShieldCheck, 
    Settings, LogOut, Bell, Search, Activity, 
    FileText, AlertCircle, Database
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin-login');
    };

    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'User Management', icon: Users },
        { name: 'Institutions', icon: Building2 },
        { name: 'System Logs', icon: Activity },
        { name: 'Reports', icon: FileText },
        { name: 'Security', icon: ShieldCheck },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
            {/* Background Effects matching AdminLogin */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"
            />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 pointer-events-none z-0"></div>

            {/* Sidebar */}
            <motion.div 
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                className="w-72 bg-[#0a0a0a]/90 backdrop-blur-xl border-r border-gray-800/60 flex flex-col z-20 relative shadow-2xl"
            >
                {/* Logo Area */}
                <div className="p-6 border-b border-gray-800/60 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-900 rounded-xl flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(220,38,38,0.2)] border border-red-500/30">
                        <ShieldCheck className="w-7 h-7 text-white" />
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
                            {/* Dashboard Stats Placeholder */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                {[
                                    { label: 'Total Users', value: '14,205', icon: Users, color: 'from-blue-600/20 to-blue-900/20', text: 'text-blue-400' },
                                    { label: 'Active Institutions', value: '482', icon: Building2, color: 'from-green-600/20 to-green-900/20', text: 'text-green-400' },
                                    { label: 'System Alerts', value: '3', icon: AlertCircle, color: 'from-red-600/20 to-red-900/20', text: 'text-red-400' },
                                    { label: 'Database Status', value: 'Healthy', icon: Database, color: 'from-purple-600/20 to-purple-900/20', text: 'text-purple-400' }
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

                            {/* Main Content Area Placeholder */}
                            <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                                    <Activity className="w-8 h-8 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{activeTab} Module</h3>
                                <p className="text-gray-500 max-w-md">
                                    This module is currently connected to the live database. Secure administrative privileges are required to modify these records.
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
"""

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(dashboard_content)
