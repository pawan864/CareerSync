import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

import { 
    GraduationCap, LogOut, User, BookOpen, Briefcase, FileText, BrainCircuit, MessageSquare, Calendar, Home, ChevronRight,
    Award, Users, Building2, Network, LayoutTemplate, Map, Bookmark, MailOpen, Settings, HelpCircle, Menu, X, ShieldAlert, AlertTriangle, RefreshCw, Power
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import ProfileBuilder from './ProfileBuilder';
import SkillCenter from './SkillCenter';
import OpportunityHub from './OpportunityHub';
import ApplicationTracker from './ApplicationTracker';
import InterviewPrep from './InterviewPrep';
import EventsHub from './EventsHub';

import ResumeBuilder from './ResumeBuilder';
import Certifications from './Certifications';
import SavedJobs from './SavedJobs';
import OfferLetters from './OfferLetters';
import CompanyInsights from './CompanyInsights';
import CareerPathways from './CareerPathways';
import Mentorship from './Mentorship';
import AlumniNetwork from './AlumniNetwork';
import DashboardSettings from './Settings';
import DashboardSupport from './DashboardSupport';

const StudentDashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [visibleItemIds, setVisibleItemIds] = useState(null);
    const [maintenanceInfo, setMaintenanceInfo] = useState({ isMaintenance: false, message: '' });

    const fetchNav = async () => {
        try {
            const res = await api.get('/admin/access-control/public/student');
            if (res.data?.success && res.data.data) {
                setMaintenanceInfo({
                    isMaintenance: Boolean(res.data.data.isMaintenance),
                    message: res.data.data.maintenanceMessage || 'Student portal is currently undergoing scheduled maintenance. Please check back shortly.'
                });
                if (res.data.data.sidebarItems) {
                    const ids = new Set(res.data.data.sidebarItems.map(i => i.id));
                    setVisibleItemIds(ids);
                }
            }
        } catch (e) {
            // Keep default nav items if fetch fails
        }
    };

    useEffect(() => {
        fetchNav();
    }, []);

    const handleDisableMaintenance = async () => {
        try {
            await api.put('/admin/access-control/role/student', { isMaintenance: false });
            setMaintenanceInfo(prev => ({ ...prev, isMaintenance: false }));
        } catch (err) {
            console.error('Error disabling maintenance mode:', err);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const defaultNavItems = [
        { id: 'home', label: 'Home Page', icon: Home, desc: 'Return to main site' },
        
        { id: 'profile', label: 'My Profile', icon: User, desc: 'Digital Resume & Details' },
        { id: 'resume', label: 'Resume Builder', icon: LayoutTemplate, desc: 'Create ATS-friendly CVs' },
        
        { id: 'skills', label: 'Skill Center', icon: BrainCircuit, desc: 'Assessments & Gaps' },
        { id: 'certifications', label: 'Certifications', icon: Award, desc: 'Manage verified credentials' },
        
        { id: 'opportunities', label: 'Opportunities', icon: Briefcase, desc: 'Jobs, Internships & Projects' },
        { id: 'applications', label: 'My Applications', icon: FileText, desc: 'Track your status' },
        { id: 'saved', label: 'Saved Jobs', icon: Bookmark, desc: 'Your bookmarked opportunities' },
        { id: 'offers', label: 'Offer Letters', icon: MailOpen, desc: 'Manage official documents' },
        
        { id: 'companies', label: 'Company Insights', icon: Building2, desc: 'Research top recruiters' },
        { id: 'pathways', label: 'Career Pathways', icon: Map, desc: 'Explore role roadmaps' },
        
        { id: 'interviews', label: 'Interview Prep', icon: MessageSquare, desc: 'AI Mocks & Practice' },
        { id: 'events', label: 'Events & Hacks', icon: Calendar, desc: 'Hackathons & Drives' },
        
        { id: 'mentorship', label: 'Mentorship', icon: Users, desc: 'Connect with industry mentors' },
        { id: 'alumni', label: 'Alumni Network', icon: Network, desc: 'Connect with graduates' },
        
        { id: 'settings', label: 'Settings', icon: Settings, desc: 'Account configuration' },
        { id: 'support', label: 'Help & Support', icon: HelpCircle, desc: 'Contact technical support' }
    ];

    const navItems = defaultNavItems.filter(item => {
        if (!visibleItemIds) return true;
        return visibleItemIds.has(item.id);
    });

    if (maintenanceInfo.isMaintenance && user?.role !== 'admin') {
        return (
            <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden font-sans">
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-md w-full bg-[#121212]/95 border border-amber-500/30 p-8 rounded-3xl shadow-2xl relative z-10 space-y-5 backdrop-blur-xl">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                        <ShieldAlert className="w-8 h-8 animate-bounce" />
                    </div>
                    <div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 inline-block mb-3">
                            Scheduled Maintenance
                        </span>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Student Portal Offline</h2>
                        <p className="text-xs text-gray-300 mt-3 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-gray-800">
                            {maintenanceInfo.message}
                        </p>
                    </div>
                    <div className="pt-2 flex flex-col gap-2.5">
                        <button
                            onClick={fetchNav}
                            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Check Status Again</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs border border-gray-800 transition-all cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-full max-w-[100vw] bg-gradient-to-r from-white via-blue-50 to-blue-100 font-sans overflow-hidden">
            {maintenanceInfo.isMaintenance && (
                <div className="bg-amber-500 text-black font-semibold text-xs px-4 py-2 flex items-center justify-between z-50 shadow-md">
                    <div className="flex items-center space-x-2">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>MAINTENANCE MODE ACTIVE: Students are currently blocked from this dashboard. (Admin bypass active)</span>
                    </div>
                    <button
                        onClick={handleDisableMaintenance}
                        className="px-3 py-1 bg-black text-white hover:bg-gray-800 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                        Disable Maintenance Now
                    </button>
                </div>
            )}
            <div className="flex flex-1 overflow-hidden">
            
            {/* Sidebar */}
            <motion.div 
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                className={`fixed md:relative w-72 h-full bg-white/95 backdrop-blur-md border-r border-blue-200 flex flex-col z-30 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                
                {/* Logo Area */}
                <div className="p-6 border-b border-blue-200 bg-white/40 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200">
                        <GraduationCap className="w-8 h-8 text-blue-800" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Career<span className="text-blue-900">Sync</span></h1>
                        <p className="text-xs text-blue-900 font-medium">Student Portal</p>
                    </div>
                </div>


                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <div className="text-xs text-blue-600 font-medium font-medium mb-3 px-3">Main Menu</div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                                className={`w-full flex items-center py-2 px-3 text-xs rounded-md transition-all active:scale-95 ${
                                    isActive 
                                    ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-900 border border-transparent'
                                }`}
                            >
                                
                                <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                <div className="text-left flex-1">
                                    <div className="text-sm font-medium">{item.label}</div>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4" />}
                            </button>
                        );
                    })}
                </div>

                {/* Footer Area */}
                <div className="p-4 border-t border-blue-200">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center py-2 px-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 active:scale-95 text-xs font-semibold border border-red-500/20 hover:border-red-500 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] group"
                    >
                        <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Secure Logout
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
            <div className="flex-1 flex flex-col relative z-10 overflow-hidden bg-transparent">
                {/* Top Header */}
                <header className="h-20 border-b border-gray-800 bg-gradient-to-r from-white via-blue-50 to-blue-100/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-10">
                    <div className="flex items-center">
                        <button 
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 -ml-2 mr-2 text-blue-900 rounded-lg hover:bg-blue-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                        <h2 className="text-2xl font-medium text-blue-900">
                            {navItems.find(i => i.id === activeTab)?.label}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {navItems.find(i => i.id === activeTab)?.desc}
                        </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                        <div className="flex flex-col text-right mr-2">
                            <span className="text-sm font-semibold text-blue-900">{user?.name || 'Student Name'}</span>
                            <span className="text-xs text-blue-600 font-medium uppercase flex items-center justify-end">
                                STUDENT
                            </span>
                        </div>
                        <div 
                            
                            className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold shadow-md border-2 border-white cursor-pointer hover:shadow-lg transition-all"
                        >
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        
                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-14 right-0 w-48 bg-white rounded-md shadow-lg border border-blue-100 py-2 z-50"
                                >
                                    <div className="px-4 py-2 border-b border-blue-50 mb-1">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || 'Student'}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email || 'student@careersync.com'}</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setActiveTab('profile');
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors flex items-center"
                                    >
                                         My Profile
                                    </button>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                                    >
                                         Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-1 overflow-y-auto p-2 relative">
                    {/* Background glow */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full  pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full  pointer-events-none"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full relative z-10"
                        >
                            
                            {activeTab === 'home' && <DashboardHome />}
                            {activeTab === 'profile' && <ProfileBuilder />}

                            {activeTab === 'skills' && <SkillCenter />}
                            {activeTab === 'opportunities' && <OpportunityHub />}
                            
                            {activeTab === 'applications' && <ApplicationTracker />}
                            {activeTab === 'interviews' && <InterviewPrep />}
                            {activeTab === 'events' && <EventsHub />}
                            
                            
                            {activeTab === 'resume' && <ResumeBuilder />}
                            {activeTab === 'certifications' && <Certifications />}
                            {activeTab === 'saved' && <SavedJobs />}
                            {activeTab === 'offers' && <OfferLetters />}
                            {activeTab === 'companies' && <CompanyInsights />}
                            {activeTab === 'pathways' && <CareerPathways />}
                            {activeTab === 'mentorship' && <Mentorship />}
                            {activeTab === 'alumni' && <AlumniNetwork />}
                            {activeTab === 'settings' && <DashboardSettings />}
                            {activeTab === 'support' && <DashboardSupport />}


                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
