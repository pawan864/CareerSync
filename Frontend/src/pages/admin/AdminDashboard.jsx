import api from '../../services/api';
import React, { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Users, Building2, Activity, FileText, ShieldCheck, 
    Settings, LogOut, Menu, X, Bell, Search, AlertCircle, Database,
    UserCheck, ShieldAlert, BarChart2, Brain, MessageSquare, TrendingUp, CheckCircle, XCircle, Eye, Key, Link2, CreditCard, Plus, Edit3, Trash2, Power, Radio, RefreshCw, Send, Megaphone, Clock, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const VerificationModule = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Fetch from real backend
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/verifications/pending`)
            .then(res => res.json())
            .then(data => {
                if(data.success) setUsers(data.data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    const handleVerify = async (id, status) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/verifications/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            setUsers(users.filter(u => u._id !== id));
        } catch (error) {}
    };

    return (
        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Pending Verifications</h3>
            
            <div className="flex space-x-4 mb-6 border-b border-gray-800 pb-2">
                {['Students', 'Faculty', 'Institutions', 'Companies', 'Recruiters'].map((tab, i) => (
                    <button key={tab} className={`px-4 py-2 text-sm font-medium ${i === 0 ? 'text-red-400 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-300'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {loading ? <p className="text-gray-500 text-sm">Loading pending verifications...</p> : users.length === 0 ? <p className="text-gray-500 text-sm">No pending verifications found in database.</p> : users.map((u, i) => (
                    <div key={u._id || i} className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20 uppercase">
                                {(u.name || 'U').charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">{u.name} <span className="text-gray-500 text-[10px] uppercase ml-2 border border-gray-700 px-1.5 py-0.5 rounded">{u.role}</span></p>
                                <p className="text-gray-500 text-xs">{u.email} &bull; {u.institutionCode || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => handleVerify(u._id, 'approved')} className="px-3 py-1.5 bg-green-900/30 text-green-400 border border-green-500/30 rounded-lg text-xs font-medium hover:bg-green-900/50 flex items-center cursor-pointer transition-colors">
                                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                            </button>
                            <button onClick={() => handleVerify(u._id, 'rejected')} className="px-3 py-1.5 bg-red-900/30 text-red-400 border border-red-500/30 rounded-lg text-xs font-medium hover:bg-red-900/50 flex items-center cursor-pointer transition-colors">
                                <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
);
};

const ModerationModule = () => (
    <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Content & Opportunity Moderation</h3>
        
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
        <h3 className="text-lg font-bold text-white mb-2">Analytics & Reporting</h3>
        <p className="text-gray-500 text-sm mb-6">Exportable metrics and visual reporting for key stakeholders.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 flex flex-col justify-center items-center h-48">
                <BarChart2 className="w-10 h-10 text-blue-500 mb-3 opacity-50" />
                <p className="text-gray-400 font-medium">Placement Trends Chart</p>
                <p className="text-gray-600 text-xs mt-1">Updated 5 mins ago</p>
            </div>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 flex flex-col justify-center items-center h-48">
                <TrendingUp className="w-10 h-10 text-green-500 mb-3 opacity-50" />
                <p className="text-gray-400 font-medium">Internship Participation Map</p>
                <p className="text-gray-600 text-xs mt-1">Updated 12 mins ago</p>
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
            <h3 className="text-lg font-bold text-white mb-2">Industry Skill Demand Analytics</h3>
            <p className="text-gray-500 text-sm mb-6">Data aggregated from 4,500 active job postings over the last 24 hours.</p>
            
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
                <h4 className="text-white font-bold text-sm mb-1">AI Skill Extraction</h4>
                <p className="text-gray-500 text-xs">NLP extraction pipeline operating at 45 resumes/min. 0 backlog.</p>
            </div>
            <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-5">
                <Activity className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="text-white font-bold text-sm mb-1">AI Skill Matching</h4>
                <p className="text-gray-500 text-xs">Matching algorithm latency: 24ms. Precision threshold: 0.85.</p>
            </div>
            <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-5">
                <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="text-white font-bold text-sm mb-1">Path Recommendations</h4>
                <p className="text-gray-500 text-xs">Recommender system active. Generating paths for 1,200 students.</p>
            </div>
        </div>
    </div>
);

const FeedbackModule = () => (
    <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">UC-36/37/38: Feedback & Continuous Improvement</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-5">
                <h4 className="text-gray-300 font-semibold text-sm mb-4 border-b border-gray-800 pb-2">Student &rarr; Industry Feedback</h4>
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
                <h4 className="text-gray-300 font-semibold text-sm mb-4 border-b border-gray-800 pb-2">Industry &rarr; Student Feedback</h4>
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
            <h4 className="text-gray-300 font-semibold text-sm mb-2">Automated Skill Profile Updating </h4>
            <p className="text-gray-500 text-xs">
                System tracking updates: <span className="text-white font-medium">Skill Profile → Gap → Learning → Internship → Experience → Updated Profile</span>
            </p>
        </div>
    </div>
);


const NotificationsModule = () => {
    const [notifications, setNotifications] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingItem, setEditingItem] = React.useState(null);
    const [filterCategory, setFilterCategory] = React.useState('all');
    const [feedback, setFeedback] = React.useState('');
    const [isSaving, setIsSaving] = React.useState(false);

    const getLocalIsoDateTime = (d = new Date()) => {
        const pad = (n) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    const [form, setForm] = React.useState({
        title: '',
        description: '',
        category: 'drives',
        sender: 'Training & Placement Office',
        senderRole: 'Official Circular',
        priority: 'high',
        actionText: 'View Details',
        actionUrl: '/login',
        isTicker: true,
        isActive: true,
        createdAt: getLocalIsoDateTime()
    });

    const fetchNotices = async (isBackground = false) => {
        if (!isBackground) setLoading(true);
        try {
            const res = await api.get('/notifications?all=true');
            if (res.data && res.data.success) {
                setNotifications(res.data.data || []);
            }
        } catch (err) {
            console.error('Error fetching admin notifications:', err);
        } finally {
            if (!isBackground) setLoading(false);
        }
    };

    const formatAdminDateTime = (dateStr) => {
        if (!dateStr) return 'Just now';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return 'Just now';
            return d.toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Just now';
        }
    };

    React.useEffect(() => {
        fetchNotices();
    }, []);

    const showToast = (msg) => {
        setFeedback(msg);
        setTimeout(() => setFeedback(''), 3500);
    };

    const categoryDefaults = {
        drives: { actionText: 'View Eligibility', actionUrl: '/login', senderRole: 'Official Circular' },
        events: { actionText: 'Register Slot', actionUrl: '/register', senderRole: 'Campus Event' },
        notices: { actionText: 'Read Notice', actionUrl: '/jobs', senderRole: 'Administrative Notice' },
        academic: { actionText: 'Take Assessment', actionUrl: '/skill-gap', senderRole: 'Academic Assessment' }
    };

    const handleCategoryChange = (newCat) => {
        const defaults = categoryDefaults[newCat] || categoryDefaults.drives;
        setForm(prev => ({
            ...prev,
            category: newCat,
            senderRole: (!prev.senderRole || Object.values(categoryDefaults).some(d => d.senderRole === prev.senderRole)) ? defaults.senderRole : prev.senderRole,
            actionText: prev.noUrl ? '' : ((!prev.actionText || Object.values(categoryDefaults).some(d => d.actionText === prev.actionText)) ? defaults.actionText : prev.actionText),
            actionUrl: prev.noUrl ? '' : ((!prev.actionUrl || Object.values(categoryDefaults).some(d => d.actionUrl === prev.actionUrl)) ? defaults.actionUrl : prev.actionUrl)
        }));
    };

    const handleOpenCreate = () => {
        setEditingItem(null);
        setForm({
            title: '',
            description: '',
            category: 'drives',
            sender: 'Training & Placement Office',
            senderRole: categoryDefaults.drives.senderRole,
            priority: 'high',
            actionText: categoryDefaults.drives.actionText,
            actionUrl: categoryDefaults.drives.actionUrl,
            noUrl: false,
            isTicker: true,
            isActive: true,
            createdAt: getLocalIsoDateTime(new Date())
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item) => {
        setEditingItem(item);
        const itemDate = item.createdAt ? new Date(item.createdAt) : new Date();
        const hasNoUrl = !item.actionUrl || item.actionUrl.trim() === '' || item.actionUrl === 'none';
        setForm({
            title: item.title || '',
            description: item.description || '',
            category: item.category || 'drives',
            sender: item.sender || 'Training & Placement Office',
            senderRole: item.senderRole || 'Official Circular',
            priority: item.priority || 'normal',
            actionText: hasNoUrl ? '' : (item.actionText || 'View Details'),
            actionUrl: hasNoUrl ? '' : (item.actionUrl || '/login'),
            noUrl: hasNoUrl,
            isTicker: item.isTicker !== false,
            isActive: item.isActive !== false,
            createdAt: getLocalIsoDateTime(itemDate)
        });
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.description.trim()) {
            return alert('Title and description are required.');
        }

        setIsSaving(true);
        try {
            const def = categoryDefaults[form.category] || categoryDefaults.drives;
            const hasNoUrl = form.noUrl || form.actionUrl === '' || form.actionUrl === 'none';
            const payload = {
                ...form,
                actionText: hasNoUrl ? '' : (form.actionText?.trim() || def.actionText),
                actionUrl: hasNoUrl ? '' : (form.actionUrl?.trim() || def.actionUrl),
                senderRole: form.senderRole?.trim() || def.senderRole,
                sender: form.sender?.trim() || 'Training & Placement Office',
                createdAt: form.createdAt ? new Date(form.createdAt).toISOString() : new Date().toISOString()
            };
            let res;
            if (editingItem && editingItem._id) {
                res = await api.put(`/notifications/${editingItem._id}`, payload);
            } else {
                res = await api.post('/notifications', payload);
            }

            if (res.data && res.data.success) {
                const savedItem = res.data.data;
                if (editingItem) {
                    setNotifications(prev => prev.map(n => n._id === editingItem._id ? savedItem : n));
                } else {
                    setNotifications(prev => [savedItem, ...prev]);
                }

                showToast(editingItem ? 'Notification updated successfully!' : 'New notification published live!');
                setIsModalOpen(false);
                setEditingItem(null);

                // Broadcast real-time update
                window.dispatchEvent(new CustomEvent('careersync_notifications_updated', { detail: savedItem }));
                localStorage.setItem('careersync_notice_sync_time', Date.now().toString());

                // Background re-fetch to ensure sync with DB
                fetchNotices(true);
            } else {
                alert(res.data?.error || 'Failed to save notification');
            }
        } catch (err) {
            console.error('Error saving notification:', err);
            alert(err.response?.data?.error || 'Failed to update notification. Please check server.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleActive = async (item) => {
        try {
            const nextActive = !item.isActive;
            setNotifications(prev => prev.map(n => n._id === item._id ? { ...n, isActive: nextActive } : n));
            const res = await api.put(`/notifications/${item._id}`, { isActive: nextActive });
            if (res.data && res.data.success) {
                showToast(`${item.title.substring(0, 24)}... is now ${nextActive ? 'Active' : 'Inactive'}`);
                window.dispatchEvent(new CustomEvent('careersync_notifications_updated'));
                localStorage.setItem('careersync_notice_sync_time', Date.now().toString());
            }
        } catch (err) {
            console.error(err);
            fetchNotices();
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
        try {
            setNotifications(prev => prev.filter(n => n._id !== id));
            const res = await api.delete(`/notifications/${id}`);
            if (res.data && res.data.success) {
                showToast('Notification deleted from database.');
                window.dispatchEvent(new CustomEvent('careersync_notifications_updated'));
                localStorage.setItem('careersync_notice_sync_time', Date.now().toString());
            }
        } catch (err) {
            console.error(err);
            fetchNotices();
        }
    };

    const filtered = notifications.filter(n => {
        if (filterCategory === 'all') return true;
        if (filterCategory === 'active') return n.isActive;
        if (filterCategory === 'inactive') return !n.isActive;
        return n.category === filterCategory;
    });

    const activeCount = notifications.filter(n => n.isActive).length;
    const tickerCount = notifications.filter(n => n.isActive && n.isTicker !== false).length;

    return (
        <div className="space-y-6">
            {/* Header & Stats Banner */}
            <div className="bg-[#121212]/90 backdrop-blur-md border border-gray-800/80 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                                <Megaphone className="w-4 h-4" />
                            </span>
                            <h3 className="text-xl font-bold text-white tracking-tight">Broadcast & Notification Hub</h3>
                        </div>
                        <p className="text-gray-400 text-xs max-w-xl">
                            All updates posted here are instantly synchronized with the public homepage Marquee Ticker and Side Notification Center.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={fetchNotices}
                            className="p-2.5 rounded-xl bg-white/5 border border-gray-800 text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="Refresh Notifications"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-red-400' : ''}`} />
                        </button>
                        <button
                            type="button"
                            onClick={handleOpenCreate}
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold rounded-xl text-xs shadow-lg shadow-red-600/20 transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Announcement</span>
                        </button>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-gray-800/60">
                    <div className="bg-[#0a0a0a] border border-gray-800/80 rounded-xl p-3.5">
                        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Total Bulletins</p>
                        <p className="text-xl font-bold text-white mt-1">{notifications.length}</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-gray-800/80 rounded-xl p-3.5">
                        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Live Active</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1">{activeCount}</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-gray-800/80 rounded-xl p-3.5">
                        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">On Top Ticker</p>
                        <p className="text-xl font-bold text-amber-400 mt-1">{tickerCount}</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-gray-800/80 rounded-xl p-3.5">
                        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Sync Status</p>
                        <p className="text-xs font-bold text-blue-400 mt-2 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live to Public
                        </p>
                    </div>
                </div>
            </div>

            {/* Notification List Section */}
            <div className="bg-[#121212]/90 backdrop-blur-md border border-gray-800/80 rounded-2xl p-6">
                {feedback && (
                    <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fade-in">
                        <span>{feedback}</span>
                        <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                )}

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5 pb-3 border-b border-gray-800">
                    {[
                        { key: 'all', label: 'All Announcements' },
                        { key: 'drives', label: 'Recruitment Drives' },
                        { key: 'notices', label: 'Official Circulars' },
                        { key: 'events', label: 'Events' },
                        { key: 'active', label: 'Live Active' },
                        { key: 'inactive', label: 'Paused / Inactive' }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setFilterCategory(tab.key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                filterCategory === tab.key
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Items */}
                {loading ? (
                    <div className="py-16 text-center text-gray-500 text-xs">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-red-500 mb-2" />
                        Fetching live announcements from database...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-16 text-center text-gray-500">
                        <Bell className="w-8 h-8 mx-auto text-gray-700 mb-2 opacity-50" />
                        <p className="text-sm font-semibold text-gray-400">No announcements found in this view.</p>
                        <p className="text-xs text-gray-600 mt-1">Click "New Announcement" above to publish one.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((item) => (
                            <div 
                                key={item._id}
                                className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 bg-[#0a0a0a] flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 ${
                                    item.isActive 
                                        ? 'border-gray-800 hover:border-gray-700' 
                                        : 'border-gray-900 opacity-60 bg-[#070707]'
                                }`}
                            >
                                <div className="flex-1 space-y-1.5 min-w-0">
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border shrink-0 ${
                                            item.category === 'drives' 
                                                ? 'bg-blue-950/60 text-blue-400 border-blue-800' 
                                                : item.category === 'events'
                                                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                                                : 'bg-purple-950/60 text-purple-400 border-purple-800'
                                        }`}>
                                            {item.category}
                                        </span>

                                        <span className="text-gray-400 text-xs font-semibold truncate max-w-[140px] sm:max-w-none">
                                            {item.sender}
                                        </span>
                                        <span className="text-gray-600 text-xs">&bull;</span>
                                        <span className="text-gray-500 text-xs font-medium truncate max-w-[140px] sm:max-w-none">
                                            {item.senderRole}
                                        </span>

                                        {item.isTicker && item.isActive && (
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800 flex items-center gap-1 shrink-0">
                                                <Radio className="w-2.5 h-2.5 animate-pulse text-amber-400" /> Ticker Live
                                            </span>
                                        )}

                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                                            item.isActive 
                                                ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800' 
                                                : 'bg-gray-800 text-gray-400 border-gray-700'
                                        }`}>
                                            {item.isActive ? 'Active' : 'Paused'}
                                        </span>
                                    </div>

                                    <h4 className="text-sm font-bold text-white leading-snug break-words">
                                        {item.title}
                                    </h4>

                                    <p className="text-xs text-gray-400 leading-relaxed max-w-3xl break-words">
                                        {item.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-gray-500">
                                        <span className="break-all sm:break-normal">Action: {item.actionUrl && item.actionUrl.trim() !== '' && item.actionUrl !== 'none' ? (
                                            <><span className="text-gray-300 font-medium">{item.actionText}</span> &rarr; <code className="text-red-400">{item.actionUrl}</code></>
                                        ) : (
                                            <span className="text-amber-400 font-medium bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/50">No URL (Info only)</span>
                                        )}</span>
                                        <span className="hidden sm:inline">&bull;</span>
                                        <span className="flex items-center gap-1 text-gray-400 shrink-0">
                                            <Clock className="w-3 h-3 text-red-400 shrink-0" />
                                            <span>Message Time: {formatAdminDateTime(item.createdAt)}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 self-stretch sm:self-end md:self-center justify-end shrink-0 pt-2.5 md:pt-0 border-t border-gray-900 md:border-0">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleActive(item)}
                                        className={`flex-1 sm:flex-none justify-center px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                                            item.isActive 
                                                ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800 hover:bg-emerald-900/40' 
                                                : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
                                        }`}
                                        title={item.isActive ? 'Pause this notice' : 'Activate notice'}
                                    >
                                        <Power className="w-3.5 h-3.5" />
                                        <span>{item.isActive ? 'Active' : 'Enable'}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleOpenEdit(item)}
                                        className="p-2 rounded-lg bg-white/5 border border-gray-800 text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                        title="Edit notification"
                                    >
                                        <Edit3 className="w-4 h-4 text-blue-400" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item._id, item.title)}
                                        className="p-2 rounded-lg bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer"
                                        title="Delete notification"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4 sm:p-6 w-full max-w-xl max-h-[90dvh] overflow-y-auto my-auto relative shadow-2xl">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                                    <Bell className="w-4 h-4" />
                                </span>
                                <h3 className="text-lg font-bold text-white">
                                    {editingItem ? 'Edit Announcement' : 'Publish New Announcement'}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-3.5 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/60"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                    >
                                        <option value="drives">Recruitment Drives</option>
                                        <option value="notices">Official Circulars</option>
                                        <option value="events">Campus Events / Fairs</option>
                                        <option value="academic">Academic / Skill Assessment</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-300 mb-1">Priority</label>
                                    <select
                                        value={form.priority}
                                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                    >
                                        <option value="high">High (Urgent Announcement)</option>
                                        <option value="normal">Normal</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-300 mb-1">Issuing Authority / Sender</label>
                                    <input
                                        type="text"
                                        value={form.sender}
                                        onChange={(e) => setForm({ ...form, sender: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-300 mb-1">Circular Badge / Role</label>
                                    <input
                                        type="text"
                                        value={form.senderRole}
                                        onChange={(e) => setForm({ ...form, senderRole: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">Description *</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-3.5 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60 resize-none"
                                />
                            </div>

                            {/* Action Button & Redirect URL Configuration */}
                            <div className="p-3 bg-[#0a0a0a] border border-gray-800 rounded-xl space-y-2.5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                                        <Link2 className="w-3.5 h-3.5 text-red-400" />
                                        <span>Action &amp; Redirect URL</span>
                                    </label>
                                    <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(form.noUrl)}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                const def = categoryDefaults[form.category] || categoryDefaults.drives;
                                                setForm({
                                                    ...form,
                                                    noUrl: checked,
                                                    actionUrl: checked ? '' : def.actionUrl,
                                                    actionText: checked ? '' : def.actionText
                                                });
                                            }}
                                            className="rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                                        />
                                        <span className={form.noUrl ? "text-amber-400 font-bold" : "text-gray-400 hover:text-gray-200"}>
                                            No URL (Informational bulletin only)
                                        </span>
                                    </label>
                                </div>

                                {form.noUrl ? (
                                    <div className="p-2.5 rounded-lg bg-amber-950/25 border border-amber-800/40 text-[11px] text-amber-300 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                                        <span>"No URL" selected. This announcement will display as a pure notice without any redirect action button.</span>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-300 mb-1">Action Button Text</label>
                                            <input
                                                type="text"
                                                value={form.actionText}
                                                onChange={(e) => setForm({ ...form, actionText: e.target.value })}
                                                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-gray-300 mb-1">Redirect URL</label>
                                            <input
                                                type="text"
                                                value={form.actionUrl}
                                                onChange={(e) => setForm({ ...form, actionUrl: e.target.value })}
                                                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                            />
                                            <p className="text-[10px] text-gray-500 mt-1">
                                                Supports internal routes (e.g. <code className="text-red-400">/login</code>) or external URLs (e.g. <code className="text-red-400">https://careers.google.com</code>).
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Message Broadcast Time & Date */}
                            <div className="p-3 bg-[#0a0a0a] border border-gray-800 rounded-xl space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-red-400" />
                                        <span>Message Broadcast Time &amp; Date</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, createdAt: getLocalIsoDateTime(new Date()) })}
                                        className="text-[10px] font-semibold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/40 px-2 py-0.5 rounded border border-red-800/40 cursor-pointer transition-colors"
                                    >
                                        Set Current Time
                                    </button>
                                </div>
                                <input
                                    type="datetime-local"
                                    value={form.createdAt || ''}
                                    onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                />
                                <p className="text-[11px] text-gray-500">
                                    Configures exact message time. Determines relative time badge (<code className="text-red-400">Just now</code>, <code className="text-red-400">5m ago</code>) and chronological order in the public Notification Center &amp; History.
                                </p>
                            </div>

                            {/* Toggles */}
                            <div className="p-3 bg-[#0a0a0a] border border-gray-800 rounded-xl space-y-2">
                                <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isTicker}
                                        onChange={(e) => setForm({ ...form, isTicker: e.target.checked })}
                                        className="rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-0"
                                    />
                                    <span>Broadcast in top marquee scrolling ticker on Homepage</span>
                                </label>

                                <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isActive}
                                        onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                        className="rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-0"
                                    />
                                    <span>Active (Immediately visible to students & visitors)</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-xl border border-gray-800 hover:bg-white/5 text-gray-400 text-xs font-semibold cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-red-600/30 cursor-pointer disabled:opacity-50"
                                >
                                    {isSaving ? (
                                        <>
                                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5" />
                                            <span>{editingItem ? 'Update Announcement' : 'Publish Announcement'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminDashboard = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login', { state: { portal: 'Admin' } });
    };

    const sidebarItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'User Verification', icon: UserCheck },
        { name: 'Notifications', icon: Bell },
        { name: 'Content Moderation', icon: ShieldAlert },
        { name: 'Database Management', icon: Database },
        { name: 'Analytics & Reports', icon: BarChart2 },
        { name: 'AI Engine', icon: Brain },
        { name: 'Access Control', icon: Key },
        { name: 'API Integrations', icon: Link2 },
        { name: 'Billing', icon: CreditCard },
        { name: 'Feedback & Growth', icon: MessageSquare },
        { name: 'Security Audit', icon: ShieldCheck },
        { name: 'System Logs', icon: Activity },
        { name: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <OverviewModule />;
            case 'User Verification':
                return <VerificationModule />;
            case 'Notifications':
                return <NotificationsModule />;
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
        <div className="h-screen w-full max-w-[100vw] overflow-hidden bg-[#050505] flex">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-red-900/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Sidebar */}
            <motion.div 
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                className={`fixed md:relative w-64 h-full bg-[#0a0a0a] border-r border-gray-800/60 flex flex-col z-30 shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                {/* Brand */}
                <div className="h-20 flex items-center px-6 border-b border-gray-800/60">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-md">
                        <span className="text-black font-bold text-lg">C</span>
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
                            className={`w-full flex items-center py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 active:scale-95 ${
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
                        className="w-full flex items-center justify-center py-2 px-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 active:scale-95 text-xs font-semibold border border-red-500/20 hover:border-red-500 hover:shadow-[0_0_12px_rgba(239,68,68,0.3)] group"
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
            <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {/* Top Header */}
                <header className="h-20 border-b border-gray-800/60 bg-[#0a0a0a]/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 z-20">
                    <div className="flex items-center">
                        <button 
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 -ml-2 mr-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-white">{activeTab}</h1>
                            <p className="text-xs text-gray-500">System overview and management</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Search system logs..." 
                                className="pl-9 pr-4 py-2 bg-[#121212] border border-gray-800 rounded-full text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-white placeholder-gray-600 transition-all w-32 md:w-64"
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

export default AdminDashboard;
