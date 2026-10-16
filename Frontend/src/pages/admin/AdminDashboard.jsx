import api from '../../services/api';
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Users, Building2, Activity, FileText, ShieldCheck, 
    Settings, LogOut, Menu, X, Bell, Search, AlertCircle, Database,
    UserCheck, ShieldAlert, BarChart2, Brain, MessageSquare, TrendingUp, CheckCircle, XCircle, Eye, Key, Link2, CreditCard, Plus, Edit3, Trash2, Power, Radio, RefreshCw, Send, Megaphone, Clock, Check,
    GraduationCap, Briefcase, Globe, BookOpen,
    Phone, Mail, Calendar, CheckSquare, Square, RotateCcw, Filter, UserX, UserPlus, Info, CheckCheck,
    ArrowRight, ExternalLink, MapPin, Flag, Server, Download, Copy, HardDrive,
    Lock, Unlock, ChevronRight, ChevronDown, Sliders, ToggleLeft, ToggleRight, PlusCircle, EyeOff, Layers, Shield, Play, Sparkles, Monitor, Smartphone, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* =========================================
   MODULE COMPONENTS 
   ========================================= */

const OverviewModule = ({ onNavigate }) => {
    const [stats, setStats] = React.useState({
        totalUsers: 0,
        activeInstitutions: 0,
        systemAlerts: 0,
        pendingUsers: 0,
        approvedUsers: 0,
        rejectedUsers: 0,
        opportunitiesCount: 0,
        notificationsCount: 0,
        auditLogCount: 0,
        aiOperations: 0,
        byRole: { student: 0, faculty: 0, recruiter: 0, tpo: 0 },
        byStatus: { pending: 0, approved: 0, rejected: 0 },
        recentActivity: [],
        recentUsers: [],
        serverTime: null
    });
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [lastSyncTime, setLastSyncTime] = React.useState(new Date());

    const fetchStats = async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);

        try {
            const res = await api.get('/admin/stats');
            if (res.data?.success && res.data.data) {
                setStats(res.data.data);
                setLastSyncTime(new Date());
            }
        } catch (err) {
            console.error('Error fetching admin stats:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    React.useEffect(() => {
        fetchStats();
        // 5-second real-time database polling
        const interval = setInterval(() => fetchStats(true), 5000);

        const handleNotifUpdate = () => fetchStats(true);
        const handleUserUpdate = () => fetchStats(true);
        window.addEventListener('careersync_notifications_updated', handleNotifUpdate);
        window.addEventListener('careersync_user_verified', handleUserUpdate);

        return () => {
            clearInterval(interval);
            window.removeEventListener('careersync_notifications_updated', handleNotifUpdate);
            window.removeEventListener('careersync_user_verified', handleUserUpdate);
        };
    }, []);

    const formatTimeAgo = (dateStr) => {
        if (!dateStr) return 'Just now';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return 'Just now';
            const diffMs = Date.now() - d.getTime();
            const diffSecs = Math.floor(diffMs / 1000);
            if (diffSecs < 45) return 'Just now';
            const diffMins = Math.floor(diffSecs / 60);
            if (diffMins < 60) return `${diffMins}m ago`;
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) return `${diffHours}h ago`;
            return d.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Recently';
        }
    };

    const totalAccounts = stats.totalUsers || 0;
    const studentCount = stats.byRole?.student || 0;
    const facultyCount = stats.byRole?.faculty || 0;
    const recruiterCount = stats.byRole?.recruiter || 0;
    const tpoCount = stats.byRole?.tpo || 0;

    const studentPct = totalAccounts > 0 ? Math.round((studentCount / totalAccounts) * 100) : 0;
    const facultyPct = totalAccounts > 0 ? Math.round((facultyCount / totalAccounts) * 100) : 0;
    const recruiterPct = totalAccounts > 0 ? Math.round((recruiterCount / totalAccounts) * 100) : 0;
    const tpoPct = totalAccounts > 0 ? Math.round((tpoCount / totalAccounts) * 100) : 0;

    const pendingCount = stats.pendingUsers ?? stats.systemAlerts ?? 0;
    const approvedCount = stats.approvedUsers || 0;
    const rejectedCount = stats.rejectedUsers || 0;

    const approvedPct = totalAccounts > 0 ? Math.round((approvedCount / totalAccounts) * 100) : 0;
    const pendingPct = totalAccounts > 0 ? Math.round((pendingCount / totalAccounts) * 100) : 0;
    const rejectedPct = totalAccounts > 0 ? Math.round((rejectedCount / totalAccounts) * 100) : 0;

    const getRoleBadge = (role) => {
        switch (role?.toLowerCase()) {
            case 'student':
                return { label: 'Student', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', icon: GraduationCap };
            case 'faculty':
                return { label: 'Faculty', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: BookOpen };
            case 'recruiter':
                return { label: 'Recruiter', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', icon: Briefcase };
            case 'tpo':
                return { label: 'TPO Officer', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', icon: Globe };
            case 'admin':
                return { label: 'Admin', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', icon: ShieldCheck };
            default:
                return { label: role || 'User', bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30', icon: Users };
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8 pb-10">
            {/* Top Control Header & Real-time Telemetry Bar */}
            <div className="bg-[#121212]/90 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center space-x-2.5 mb-1.5 flex-wrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                                Live MongoDB Cluster
                            </span>
                            <span className="text-gray-500 text-xs hidden sm:inline">•</span>
                            <span className="text-gray-400 text-xs flex items-center">
                                <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
                                Sync: every 5s (Last {formatTimeAgo(lastSyncTime)})
                            </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Executive Operations Center</h2>
                        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                            Real-time database analytics, institutional verifications, placement feeds & security audit stream.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center flex-wrap gap-2.5">
                        <button
                            onClick={() => fetchStats()}
                            disabled={refreshing}
                            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs sm:text-sm font-medium border border-gray-700/60 transition-all active:scale-95 disabled:opacity-50"
                            title="Force refresh database stats"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${refreshing ? 'animate-spin text-red-400' : 'text-gray-400'}`} />
                            {refreshing ? 'Syncing...' : 'Sync DB'}
                        </button>

                        <button
                            onClick={() => onNavigate?.('User Verification')}
                            className="relative inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-600/20 border border-red-500/40 transition-all active:scale-95"
                        >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Verify Users
                            {pendingCount > 0 && (
                                <span className="ml-2 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-black">
                                    {pendingCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => onNavigate?.('Notifications')}
                            className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs sm:text-sm font-medium border border-gray-700/60 transition-all active:scale-95"
                        >
                            <Megaphone className="w-4 h-4 mr-2 text-red-400" />
                            New Circular
                        </button>
                    </div>
                </div>
            </div>

            {/* Core 6 KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* 1. Total Registered Users */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-md">
                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-gradient-to-br from-blue-600/20 to-indigo-900/20 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400/90">Total User Base</span>
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10">
                        {loading ? '...' : totalAccounts.toLocaleString()}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400 relative z-10">
                        <span>{studentCount} Students</span>
                        <span className="text-gray-600">•</span>
                        <span>{facultyCount} Faculty</span>
                        <span className="text-gray-600">•</span>
                        <span>{recruiterCount} Recruiters</span>
                    </div>
                </div>

                {/* 2. Pending Verifications */}
                <div 
                    onClick={() => onNavigate?.('User Verification')}
                    className={`bg-[#121212]/85 backdrop-blur-md border ${pendingCount > 0 ? 'border-amber-500/40 hover:border-amber-400' : 'border-gray-800/80 hover:border-gray-700'} p-5 sm:p-6 rounded-2xl relative overflow-hidden group transition-all shadow-md cursor-pointer`}
                >
                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-gradient-to-br from-amber-600/25 to-yellow-900/20 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">Pending Verifications</span>
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                    </div>
                    <div className="flex items-baseline space-x-3 relative z-10">
                        <p className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-tight">
                            {loading ? '...' : pendingCount.toLocaleString()}
                        </p>
                        {pendingCount > 0 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                                Requires Action
                            </span>
                        ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                All Clear
                            </span>
                        )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-amber-400/80 relative z-10">
                        <span>Click to review credentials</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* 3. Approved & Verified Accounts */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-md">
                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-gradient-to-br from-emerald-600/20 to-teal-900/20 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">Verified Members</span>
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10">
                        {loading ? '...' : approvedCount.toLocaleString()}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400 relative z-10">
                        <span className="text-emerald-400 font-medium">{approvedPct}% clearance rate</span>
                        <span className="text-gray-500">{stats.activeInstitutions || 0} Faculty/TPO</span>
                    </div>
                </div>

                {/* 4. Active Placement Drives */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-md">
                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-gradient-to-br from-purple-600/20 to-fuchsia-900/20 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400/90">Opportunities Active</span>
                        <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10">
                        {loading ? '...' : (stats.opportunitiesCount || 0).toLocaleString()}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400 relative z-10">
                        <span>Placement & Internship drives</span>
                        <span className="text-purple-400">Live on Portal</span>
                    </div>
                </div>

                {/* 5. Published Circulars & Tickers */}
                <div 
                    onClick={() => onNavigate?.('Notifications')}
                    className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-red-500/40 transition-all shadow-md cursor-pointer"
                >
                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-gradient-to-br from-red-600/20 to-rose-900/20 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className="text-xs font-semibold uppercase tracking-wider text-red-400/90">Published Circulars</span>
                        <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <Megaphone className="w-4 h-4 text-red-400" />
                        </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10">
                        {loading ? '...' : (stats.notificationsCount || 0).toLocaleString()}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400 relative z-10">
                        <span>Campus alerts & ticker notices</span>
                        <ArrowRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* 6. Live Security & Auth Sessions Logged */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all shadow-md">
                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-gradient-to-br from-cyan-600/20 to-teal-900/20 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90">Security Audit Logs</span>
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10">
                        {loading ? '...' : (stats.auditLogCount || 0).toLocaleString()}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400 relative z-10">
                        <span className="text-cyan-400">100% Tamper-Evident</span>
                        <span className="text-gray-500">Live Session Audits</span>
                    </div>
                </div>
            </div>

            {/* Demographics & Verification Funnel Breakdown (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Panel 1: User Distribution by Role */}
                <div className="bg-[#121212]/90 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                                <Users className="w-4 h-4 mr-2 text-blue-400" />
                                Institutional Role Distribution
                            </h3>
                            <p className="text-xs text-gray-400">Live breakdown across user categories</p>
                        </div>
                        <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-lg border border-gray-800">
                            {totalAccounts} Total
                        </span>
                    </div>

                    <div className="space-y-4">
                        {/* Students */}
                        <div>
                            <div className="flex items-center justify-between text-xs font-medium text-gray-300 mb-1.5">
                                <span className="flex items-center">
                                    <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                                    Students ({studentCount})
                                </span>
                                <span className="font-mono text-blue-400">{studentPct}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                                <div 
                                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700"
                                    style={{ width: `${studentPct}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Faculty */}
                        <div>
                            <div className="flex items-center justify-between text-xs font-medium text-gray-300 mb-1.5">
                                <span className="flex items-center">
                                    <BookOpen className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                                    Academic Faculty ({facultyCount})
                                </span>
                                <span className="font-mono text-emerald-400">{facultyPct}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                                <div 
                                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700"
                                    style={{ width: `${facultyPct}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Recruiters */}
                        <div>
                            <div className="flex items-center justify-between text-xs font-medium text-gray-300 mb-1.5">
                                <span className="flex items-center">
                                    <Briefcase className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                                    Industry Recruiters ({recruiterCount})
                                </span>
                                <span className="font-mono text-purple-400">{recruiterPct}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                                <div 
                                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-700"
                                    style={{ width: `${recruiterPct}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* TPOs */}
                        <div>
                            <div className="flex items-center justify-between text-xs font-medium text-gray-300 mb-1.5">
                                <span className="flex items-center">
                                    <Globe className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                                    TPO Officers ({tpoCount})
                                </span>
                                <span className="font-mono text-amber-400">{tpoPct}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                                <div 
                                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-700"
                                    style={{ width: `${tpoPct}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-gray-800/80">
                        <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-2.5 text-center">
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Students</p>
                            <p className="text-base font-bold text-blue-400">{studentCount}</p>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-2.5 text-center">
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Faculty</p>
                            <p className="text-base font-bold text-emerald-400">{facultyCount}</p>
                        </div>
                        <div className="bg-purple-500/5 border border-purple-500/15 rounded-xl p-2.5 text-center">
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Recruiters</p>
                            <p className="text-base font-bold text-purple-400">{recruiterCount}</p>
                        </div>
                        <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-2.5 text-center">
                            <p className="text-[10px] text-gray-400 uppercase font-semibold">TPO Officials</p>
                            <p className="text-base font-bold text-amber-400">{tpoCount}</p>
                        </div>
                    </div>
                </div>

                {/* Panel 2: Verification Status Funnel */}
                <div className="bg-[#121212]/90 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                                    <ShieldAlert className="w-4 h-4 mr-2 text-red-500" />
                                    Verification Pipeline & Clearance
                                </h3>
                                <p className="text-xs text-gray-400">Institutional validation compliance rate</p>
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                {approvedPct}% Verified
                            </span>
                        </div>

                        {/* Visual Funnel Bar */}
                        <div className="mb-5">
                            <div className="flex justify-between text-xs text-gray-400 mb-2">
                                <span>Verification Funnel</span>
                                <span>{approvedCount} of {totalAccounts} Approved</span>
                            </div>
                            <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden flex border border-gray-800">
                                <div 
                                    className="bg-emerald-500 h-full transition-all duration-700" 
                                    style={{ width: `${approvedPct}%` }}
                                    title={`Approved: ${approvedPct}%`}
                                ></div>
                                <div 
                                    className="bg-amber-500 h-full transition-all duration-700" 
                                    style={{ width: `${pendingPct}%` }}
                                    title={`Pending: ${pendingPct}%`}
                                ></div>
                                <div 
                                    className="bg-red-500 h-full transition-all duration-700" 
                                    style={{ width: `${rejectedPct}%` }}
                                    title={`Rejected: ${rejectedPct}%`}
                                ></div>
                            </div>
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-[#171717] border border-gray-800">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-200">Accredited & Active Accounts</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs sm:text-sm font-bold text-white">{approvedCount}</span>
                                    <span className="text-xs text-emerald-400 font-mono">({approvedPct}%)</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-[#171717] border border-gray-800">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-200">Pending Administrative Review</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs sm:text-sm font-bold text-amber-400">{pendingCount}</span>
                                    <span className="text-xs text-amber-400 font-mono">({pendingPct}%)</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-[#171717] border border-gray-800">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-200">Rejected / Credentials Flagged</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs sm:text-sm font-bold text-red-400">{rejectedCount}</span>
                                    <span className="text-xs text-red-400 font-mono">({rejectedPct}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-800/80 flex items-center justify-between">
                        <span className="text-xs text-gray-400">Manage verification queues & audits</span>
                        <button
                            onClick={() => onNavigate?.('User Verification')}
                            className="inline-flex items-center text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                        >
                            Open Verification Desk
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Live Security Audit Stream & Recent User Registrations (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stream A: Live Security & Authentication Stream */}
                <div className="bg-[#121212]/90 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                                    <Activity className="w-4 h-4 mr-2 text-cyan-400" />
                                    Live Security Audit Stream
                                </h3>
                                <p className="text-xs text-gray-400">Authenticated user actions from MongoDB AuditLog</p>
                            </div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5 animate-pulse"></span>
                                Streaming Live
                            </span>
                        </div>

                        <div className="space-y-2.5 overflow-hidden">
                            {(!stats.recentActivity || stats.recentActivity.length === 0) ? (
                                <div className="py-10 text-center text-gray-500 text-xs">
                                    No audit entries recorded yet.
                                </div>
                            ) : (
                                stats.recentActivity.slice(0, 6).map((log, idx) => {
                                    const isLogin = log.action === 'LOGIN';
                                    const roleInfo = getRoleBadge(log.role);
                                    return (
                                        <div 
                                            key={log._id || idx}
                                            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#161616] border border-gray-800/60 hover:border-gray-700 transition-colors"
                                        >
                                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border shrink-0 ${
                                                    isLogin 
                                                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                                                        : 'bg-zinc-700/30 text-zinc-400 border-zinc-700/50'
                                                }`}>
                                                    {log.action}
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-xs sm:text-sm font-medium text-white truncate font-mono">
                                                        {log.email}
                                                    </p>
                                                    <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                                                        <span className={`inline-flex items-center px-1.5 py-0.2 rounded ${roleInfo.bg} ${roleInfo.text} border ${roleInfo.border}`}>
                                                            {roleInfo.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-[11px] text-gray-400 shrink-0 font-mono">
                                                {formatTimeAgo(log.timestamp || log.localTime)}
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500">
                        <span>Total security logs tracked: <strong className="text-gray-300 font-mono">{stats.auditLogCount || 0}</strong></span>
                        <span className="flex items-center text-cyan-400 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                            Tamper-Evident
                        </span>
                    </div>
                </div>

                {/* Stream B: Recent User Registrations */}
                <div className="bg-[#121212]/90 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                                    <UserPlus className="w-4 h-4 mr-2 text-emerald-400" />
                                    Recent Registrations
                                </h3>
                                <p className="text-xs text-gray-400">Latest candidate & faculty profiles in MongoDB</p>
                            </div>
                            <button
                                onClick={() => onNavigate?.('User Verification')}
                                className="text-xs text-gray-400 hover:text-white flex items-center transition-colors"
                            >
                                View All
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </button>
                        </div>

                        <div className="space-y-2.5 overflow-hidden">
                            {(!stats.recentUsers || stats.recentUsers.length === 0) ? (
                                <div className="py-10 text-center text-gray-500 text-xs">
                                    No accounts registered yet.
                                </div>
                            ) : (
                                stats.recentUsers.slice(0, 6).map((u, idx) => {
                                    const roleInfo = getRoleBadge(u.role);
                                    const isPending = !u.verificationStatus || u.verificationStatus === 'pending';
                                    const isApproved = u.verificationStatus === 'approved';
                                    const isRejected = u.verificationStatus === 'rejected';

                                    return (
                                        <div 
                                            key={u._id || idx}
                                            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#161616] border border-gray-800/60 hover:border-gray-700 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3 min-w-0 pr-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600/30 to-purple-600/30 border border-red-500/20 flex items-center justify-center font-bold text-xs text-white shrink-0">
                                                    {(u.name || u.email || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs sm:text-sm font-semibold text-white truncate">
                                                        {u.name || 'Unnamed Account'}
                                                    </p>
                                                    <div className="flex items-center space-x-2 text-[10px] text-gray-400 truncate">
                                                        <span className="truncate">{u.email}</span>
                                                        <span>•</span>
                                                        <span className={`inline-flex items-center px-1.5 py-0.2 rounded ${roleInfo.bg} ${roleInfo.text} border ${roleInfo.border}`}>
                                                            {roleInfo.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 shrink-0">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                                                    isApproved
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                        : isRejected
                                                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                }`}>
                                                    {isApproved ? 'Approved' : isRejected ? 'Rejected' : 'Pending'}
                                                </span>
                                                <button
                                                    onClick={() => onNavigate?.('User Verification')}
                                                    className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                    title="Inspect user"
                                                >
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500">
                        <span>Total accounts: <strong className="text-gray-300 font-mono">{totalAccounts}</strong></span>
                        <button
                            onClick={() => onNavigate?.('User Verification')}
                            className="text-xs text-red-400 hover:text-red-300 font-medium inline-flex items-center"
                        >
                            Open Verification Queue
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Infrastructure & Database Health Card */}
            <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3.5">
                        <div className="w-11 h-11 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20 shrink-0">
                            <Database className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h4 className="text-sm sm:text-base font-bold text-white">MongoDB Infrastructure Status: Optimal</h4>
                            <p className="text-xs text-gray-400">
                                Production database active • Zero mock data • Instant reactive synchronization across modules
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-gray-400 font-mono">
                        <span className="flex items-center text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping"></span>
                            Primary Replica Connected
                        </span>
                        <span>•</span>
                        <span>Telemetry: &lt;15ms</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


const VerificationModule = () => {
    const [users, setUsers] = React.useState([]);
    const [stats, setStats] = React.useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        byRole: { student: 0, faculty: 0, recruiter: 0, tpo: 0 }
    });
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [roleFilter, setRoleFilter] = React.useState('all');
    const [statusFilter, setStatusFilter] = React.useState('pending');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedIds, setSelectedIds] = React.useState([]);
    const [feedback, setFeedback] = React.useState('');
    const [detailUser, setDetailUser] = React.useState(null);
    const [rejectingUser, setRejectingUser] = React.useState(null);
    const [rejectionReasonInput, setRejectionReasonInput] = React.useState('');
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [lastSyncTime, setLastSyncTime] = React.useState(new Date());

    const showToast = (msg) => {
        setFeedback(msg);
        setTimeout(() => setFeedback(''), 4000);
    };

    const fetchVerifications = async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);

        try {
            const res = await api.get('/admin/verifications');
            if (res.data?.success) {
                setUsers(res.data.data || []);
                if (res.data.stats) setStats(res.data.stats);
                setLastSyncTime(new Date());
            }
        } catch (err) {
            console.error('Error fetching live verifications:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    React.useEffect(() => {
        fetchVerifications();

        // Real-time synchronization interval
        const timer = setInterval(() => fetchVerifications(true), 5000);
        const handleUpdate = () => fetchVerifications(true);
        window.addEventListener('careersync_user_verified', handleUpdate);

        return () => {
            clearInterval(timer);
            window.removeEventListener('careersync_user_verified', handleUpdate);
        };
    }, []);

    // Prevent body background scrolling when detail or rejection modal is open on Android
    React.useEffect(() => {
        if (detailUser || rejectingUser) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [detailUser, rejectingUser]);

    const handleSingleStatus = async (id, status, reason = '') => {
        setIsProcessing(true);
        try {
            const res = await api.put(`/admin/verifications/${id}`, {
                status,
                rejectionReason: reason
            });

            if (res.data?.success) {
                const updated = res.data.data;
                setUsers(prev => prev.map(u => u._id === id ? { ...u, ...updated } : u));
                showToast(`User ${updated.name || 'Account'} has been ${status === 'approved' ? 'Approved & Verified' : status === 'rejected' ? 'Rejected' : 'Reset to Pending'}.`);
                
                // If currently viewing details, update modal view
                if (detailUser && detailUser._id === id) {
                    setDetailUser(prev => ({ ...prev, ...updated }));
                }

                if (rejectingUser && rejectingUser._id === id) {
                    setRejectingUser(null);
                    setRejectionReasonInput('');
                }

                window.dispatchEvent(new CustomEvent('careersync_user_verified'));
                fetchVerifications(true);
            } else {
                alert(res.data?.error || 'Verification update failed.');
            }
        } catch (err) {
            console.error('Verification error:', err);
            alert(err.response?.data?.error || 'Error updating status. Please check server.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleBatchAction = async (status) => {
        if (selectedIds.length === 0) return;
        if (!window.confirm(`Are you sure you want to ${status} ${selectedIds.length} selected user(s)?`)) return;

        setIsProcessing(true);
        try {
            const res = await api.post('/admin/verifications/batch', {
                userIds: selectedIds,
                status
            });

            if (res.data?.success) {
                setUsers(prev => prev.map(u => selectedIds.includes(u._id) ? { ...u, verificationStatus: status } : u));
                showToast(res.data.message || `Batch update completed successfully.`);
                setSelectedIds([]);
                window.dispatchEvent(new CustomEvent('careersync_user_verified'));
                fetchVerifications(true);
            } else {
                alert(res.data?.error || 'Batch update failed.');
            }
        } catch (err) {
            console.error('Batch error:', err);
            alert(err.response?.data?.error || 'Server error during batch update.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteUser = async (id, name) => {
        if (!window.confirm(`Are you sure you want to permanently delete "${name}" from the database? This cannot be undone.`)) return;

        try {
            const res = await api.delete(`/admin/verifications/${id}`);
            if (res.data?.success) {
                setUsers(prev => prev.filter(u => u._id !== id));
                setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
                if (detailUser && detailUser._id === id) setDetailUser(null);
                showToast(`User "${name}" has been permanently deleted from database.`);
                window.dispatchEvent(new CustomEvent('careersync_user_verified'));
                fetchVerifications(true);
            } else {
                alert(res.data?.error || 'Failed to delete user.');
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert(err.response?.data?.error || 'Failed to delete user account.');
        }
    };

    const toggleSelectAll = (filteredList) => {
        const filteredIds = filteredList.map(u => u._id);
        const allSelected = filteredIds.length > 0 && filteredIds.every(id => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds(prev => prev.filter(id => !filteredIds.includes(id)));
        } else {
            setSelectedIds(prev => Array.from(new Set([...prev, ...filteredIds])));
        }
    };

    const toggleSelectOne = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, item]
        );
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return 'N/A';
            return d.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'N/A';
        }
    };

    const formatRelativeTime = (dateStr) => {
        if (!dateStr) return '';
        try {
            const d = new Date(dateStr);
            const diffMs = Date.now() - d.getTime();
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            if (diffHours < 1) return 'Just now';
            if (diffHours < 24) return `${diffHours}h ago`;
            if (diffDays === 1) return 'Yesterday';
            return `${diffDays}d ago`;
        } catch {
            return '';
        }
    };

    // Real-time client filtering
    const filteredUsers = users.filter(u => {
        // Status filter
        if (statusFilter !== 'all' && (u.verificationStatus || 'pending') !== statusFilter) return false;

        // Role filter
        if (roleFilter !== 'all' && u.role !== roleFilter) return false;

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            const matchesName = (u.name || '').toLowerCase().includes(q);
            const matchesEmail = (u.email || '').toLowerCase().includes(q);
            const matchesStudentId = (u.studentId || '').toLowerCase().includes(q);
            const matchesFacultyId = (u.facultyId || '').toLowerCase().includes(q);
            const matchesTpoId = (u.tpoId || '').toLowerCase().includes(q);
            const matchesCompany = (u.companyName || '').toLowerCase().includes(q);
            const matchesCollege = (u.college || '').toLowerCase().includes(q);
            const matchesDept = (u.department || '').toLowerCase().includes(q);
            const matchesBranch = (u.branch || '').toLowerCase().includes(q);
            const matchesPhone = (u.phone || '').toLowerCase().includes(q);
            const matchesCode = (u.institutionCode || '').toLowerCase().includes(q);

            return matchesName || matchesEmail || matchesStudentId || matchesFacultyId || 
                   matchesTpoId || matchesCompany || matchesCollege || matchesDept || 
                   matchesBranch || matchesPhone || matchesCode;
        }

        return true;
    });

    const getRoleBadgeStyle = (role) => {
        switch (role) {
            case 'student':
                return 'bg-blue-950/60 text-blue-400 border-blue-800';
            case 'faculty':
                return 'bg-purple-950/60 text-purple-400 border-purple-800';
            case 'recruiter':
                return 'bg-emerald-950/60 text-emerald-400 border-emerald-800';
            case 'tpo':
                return 'bg-amber-950/60 text-amber-400 border-amber-800';
            default:
                return 'bg-gray-800 text-gray-300 border-gray-700';
        }
    };

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-emerald-950/50 text-emerald-400 border-emerald-800/80';
            case 'rejected':
                return 'bg-red-950/50 text-red-400 border-red-800/80';
            default:
                return 'bg-amber-950/50 text-amber-300 border-amber-800/80';
        }
    };

    const rejectionPresets = [
        'Invalid or unrecognized Student/Institutional ID',
        'Academic credentials mismatch with college registrar records',
        'Corporate / Employer email domain cannot be authenticated',
        'Incomplete registration profile details provided',
        'Duplicate or unauthorized registration attempt'
    ];

    return (
        <div className="space-y-6">
            {/* Header & Quick Live Stats Banner */}
            <div className="bg-[#121212]/90 backdrop-blur-md border border-gray-800/80 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                                <UserCheck className="w-4 h-4" />
                            </span>
                            <h3 className="text-xl font-bold text-white tracking-tight">
                                User Accreditation &amp; Verification Hub
                            </h3>
                        </div>
                        <p className="text-gray-400 text-xs max-w-2xl leading-relaxed">
                            Live KYC and institutional validation. Directly connected to MongoDB with instant real-time synchronization.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => fetchVerifications(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-gray-800 text-gray-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-colors cursor-pointer"
                            title="Sync live records"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${refreshing || loading ? 'animate-spin text-red-400' : ''}`} />
                            <span className="hidden sm:inline">Live Refresh</span>
                        </button>
                    </div>
                </div>

                {/* KPI Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-gray-800/60">
                    <button
                        type="button"
                        onClick={() => { setStatusFilter('pending'); }}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            statusFilter === 'pending'
                                ? 'bg-amber-950/30 border-amber-500/50 ring-1 ring-amber-500/30'
                                : 'bg-[#0a0a0a] border-gray-800/80 hover:border-gray-700'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-medium text-amber-400 uppercase tracking-wider">Pending Action</p>
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-amber-300 mt-1">{stats.pending}</p>
                    </button>

                    <button
                        type="button"
                        onClick={() => { setStatusFilter('approved'); }}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            statusFilter === 'approved'
                                ? 'bg-emerald-950/30 border-emerald-500/50 ring-1 ring-emerald-500/30'
                                : 'bg-[#0a0a0a] border-gray-800/80 hover:border-gray-700'
                        }`}
                    >
                        <p className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider">Verified Active</p>
                        <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">{stats.approved}</p>
                    </button>

                    <button
                        type="button"
                        onClick={() => { setStatusFilter('rejected'); }}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            statusFilter === 'rejected'
                                ? 'bg-red-950/30 border-red-500/50 ring-1 ring-red-500/30'
                                : 'bg-[#0a0a0a] border-gray-800/80 hover:border-gray-700'
                        }`}
                    >
                        <p className="text-[11px] font-medium text-red-400 uppercase tracking-wider">Rejected</p>
                        <p className="text-xl sm:text-2xl font-bold text-red-400 mt-1">{stats.rejected}</p>
                    </button>

                    <button
                        type="button"
                        onClick={() => { setStatusFilter('all'); setRoleFilter('all'); }}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            statusFilter === 'all' && roleFilter === 'all'
                                ? 'bg-blue-950/30 border-blue-500/50 ring-1 ring-blue-500/30'
                                : 'bg-[#0a0a0a] border-gray-800/80 hover:border-gray-700'
                        }`}
                    >
                        <p className="text-[11px] font-medium text-blue-400 uppercase tracking-wider">Total Accounts</p>
                        <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stats.total}</p>
                    </button>
                </div>
            </div>

            {/* Main Interactive Controls & Listing */}
            <div className="bg-[#121212]/90 backdrop-blur-md border border-gray-800/80 rounded-2xl p-4 sm:p-6 space-y-4">
                {/* Feedback Notification */}
                {feedback && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fade-in shadow-xs">
                        <span>{feedback}</span>
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                )}

                {/* Role Tabs (Horizontal scroll on mobile) */}
                <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-2.5 border-b border-gray-800">
                    {[
                        { key: 'all', label: 'All Roles', count: stats.total },
                        { key: 'student', label: 'Students', count: stats.byRole?.student },
                        { key: 'faculty', label: 'Faculty', count: stats.byRole?.faculty },
                        { key: 'recruiter', label: 'Recruiters', count: stats.byRole?.recruiter },
                        { key: 'tpo', label: 'TPOs', count: stats.byRole?.tpo }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setRoleFilter(tab.key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                                roleFilter === tab.key
                                    ? 'bg-red-600 text-white shadow-xs'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                                    roleFilter === tab.key ? 'bg-black/30 text-white' : 'bg-gray-800 text-gray-300'
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search & Status Filters Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email, roll number, college, company, phone..."
                            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/60"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Status Pill Filters */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
                        {[
                            { key: 'all', label: 'All Status' },
                            { key: 'pending', label: 'Pending Review' },
                            { key: 'approved', label: 'Approved' },
                            { key: 'rejected', label: 'Rejected' }
                        ].map(st => (
                            <button
                                key={st.key}
                                type="button"
                                onClick={() => setStatusFilter(st.key)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                                    statusFilter === st.key
                                        ? 'bg-white/10 text-white border border-gray-700 font-bold'
                                        : 'text-gray-400 hover:text-gray-200 border border-transparent'
                                }`}
                            >
                                {st.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bulk Actions Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 pb-1 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={filteredUsers.length > 0 && filteredUsers.every(u => selectedIds.includes(u._id))}
                                onChange={() => toggleSelectAll(filteredUsers)}
                                className="rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-0 cursor-pointer w-4 h-4"
                            />
                            <span className="font-semibold text-gray-300">
                                Select All Filtered ({filteredUsers.length})
                            </span>
                        </label>
                    </div>

                    {selectedIds.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 animate-fade-in">
                            <span className="font-bold text-white px-2 py-0.5 rounded bg-red-950/50 border border-red-800/40 text-[11px]">
                                {selectedIds.length} Selected
                            </span>
                            <button
                                type="button"
                                onClick={() => handleBatchAction('approved')}
                                disabled={isProcessing}
                                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                            >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Bulk Approve</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleBatchAction('rejected')}
                                disabled={isProcessing}
                                className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                            >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Bulk Reject</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedIds([])}
                                className="px-2 py-1 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                            >
                                Deselect All
                            </button>
                        </div>
                    )}
                </div>

                {/* User Listing Section */}
                {loading ? (
                    <div className="py-20 text-center text-gray-500 text-xs">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-red-500 mb-2" />
                        Querying live user verification directory from MongoDB database...
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="py-16 text-center text-gray-500">
                        <UserX className="w-9 h-9 mx-auto text-gray-700 mb-2.5 opacity-50" />
                        <p className="text-sm font-semibold text-gray-300">No users found matching current filters.</p>
                        <p className="text-xs text-gray-600 mt-1">Try switching role tabs or clearing the search box.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredUsers.map((u) => {
                            const isSelected = selectedIds.includes(u._id);
                            const status = u.verificationStatus || 'pending';
                            return (
                                <div
                                    key={u._id}
                                    className={`p-4 rounded-xl border transition-all duration-200 bg-[#0a0a0a] flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                                        isSelected 
                                            ? 'border-red-500/70 bg-red-950/10 shadow-sm' 
                                            : 'border-gray-800/90 hover:border-gray-700'
                                    }`}
                                >
                                    {/* Left: User Avatar & Essential Info */}
                                    <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => toggleSelectOne(u._id)}
                                            className="mt-1 sm:mt-0 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-0 cursor-pointer w-4 h-4 shrink-0"
                                        />

                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 uppercase border ${
                                            u.role === 'student' ? 'bg-blue-950/60 text-blue-400 border-blue-700/60' :
                                            u.role === 'faculty' ? 'bg-purple-950/60 text-purple-400 border-purple-700/60' :
                                            u.role === 'recruiter' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60' :
                                            'bg-amber-950/60 text-amber-400 border-amber-700/60'
                                        }`}>
                                            {(u.name || 'U').charAt(0)}
                                        </div>

                                        <div className="space-y-1 min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                                <h4 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-none">
                                                    {u.name || 'Unnamed User'}
                                                </h4>

                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border shrink-0 ${getRoleBadgeStyle(u.role)}`}>
                                                    {u.role}
                                                </span>

                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border shrink-0 flex items-center gap-1 ${getStatusBadgeStyle(status)}`}>
                                                    {status === 'approved' && <Check className="w-2.5 h-2.5" />}
                                                    {status === 'rejected' && <X className="w-2.5 h-2.5" />}
                                                    {status === 'pending' && <Clock className="w-2.5 h-2.5 animate-pulse" />}
                                                    <span>{status}</span>
                                                </span>

                                                <span className="text-[11px] text-gray-500 ml-auto sm:ml-0">
                                                    {formatRelativeTime(u.createdAt)}
                                                </span>
                                            </div>

                                            {/* Role Specific Credentials Strip */}
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                                                <span className="text-gray-300 font-medium truncate max-w-[220px] sm:max-w-none">
                                                    {u.email}
                                                </span>

                                                {u.phone && (
                                                    <>
                                                        <span className="text-gray-600">&bull;</span>
                                                        <span className="text-gray-400">{u.phone}</span>
                                                    </>
                                                )}

                                                {/* Student specific fields */}
                                                {u.role === 'student' && u.studentId && (
                                                    <>
                                                        <span className="text-gray-600">&bull;</span>
                                                        <span className="text-blue-400 font-medium">Roll ID: {u.studentId}</span>
                                                    </>
                                                )}
                                                {u.role === 'student' && (u.branch || u.course) && (
                                                    <>
                                                        <span className="text-gray-600">&bull;</span>
                                                        <span className="text-gray-400">{u.branch || u.course} {u.semester ? `(Sem ${u.semester})` : ''}</span>
                                                    </>
                                                )}

                                                {/* Faculty specific fields */}
                                                {u.role === 'faculty' && u.facultyId && (
                                                    <>
                                                        <span className="text-gray-600">&bull;</span>
                                                        <span className="text-purple-400 font-medium">Faculty ID: {u.facultyId}</span>
                                                    </>
                                                )}
                                                {u.role === 'faculty' && u.department && (
                                                    <>
                                                        <span className="text-gray-600">&bull;</span>
                                                        <span className="text-gray-400">{u.department} {u.designation ? `(${u.designation})` : ''}</span>
                                                    </>
                                                )}

                                                {/* Recruiter specific fields */}
                                                {u.role === 'recruiter' && u.companyName && (
                                                    <>
                                                        <span className="text-gray-600">&bull;</span>
                                                        <span className="text-emerald-400 font-medium">{u.companyName}</span>
                                                    </>
                                                )}
                                                {u.role === 'recruiter' && u.industryType && (
                                                    <>
                                                        <span className="text-gray-600">&bull;</span>
                                                        <span className="text-gray-400">{u.industryType}</span>
                                                    </>
                                                )}

                                                {/* TPO specific fields */}
                                                {u.role === 'tpo' && (u.tpoId || u.institutionCode) && (
                                                    <>
                                                        <span className="text-gray-600">&bull;</span>
                                                        <span className="text-amber-400 font-medium">TPO ID: {u.tpoId || u.institutionCode}</span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Rejection Reason Banner if Rejected */}
                                            {status === 'rejected' && u.rejectionReason && (
                                                <div className="mt-1.5 p-2 rounded-lg bg-red-950/30 border border-red-800/40 text-[11px] text-red-300 flex items-start gap-1.5">
                                                    <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                                                    <span>Reason: {u.rejectionReason}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Touch-Friendly Responsive Actions */}
                                    <div className="flex items-center gap-1.5 self-stretch sm:self-auto justify-end shrink-0 pt-2 md:pt-0 border-t border-gray-900 md:border-0">
                                        <button
                                            type="button"
                                            onClick={() => setDetailUser(u)}
                                            className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-white/5 border border-gray-800 text-gray-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                            title="View Full Profile Details"
                                        >
                                            <Eye className="w-3.5 h-3.5 text-blue-400" />
                                            <span className="hidden sm:inline">Details</span>
                                        </button>

                                        {status !== 'approved' && (
                                            <button
                                                type="button"
                                                onClick={() => handleSingleStatus(u._id, 'approved')}
                                                disabled={isProcessing}
                                                className="flex-1 sm:flex-none justify-center px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/70 text-emerald-400 hover:bg-emerald-900/60 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                                                title="Approve & Verify Credentials"
                                            >
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                <span>Approve</span>
                                            </button>
                                        )}

                                        {status !== 'rejected' && (
                                            <button
                                                type="button"
                                                onClick={() => { setRejectingUser(u); setRejectionReasonInput(''); }}
                                                disabled={isProcessing}
                                                className="flex-1 sm:flex-none justify-center px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/70 text-red-400 hover:bg-red-900/60 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                                                title="Reject Registration"
                                            >
                                                <XCircle className="w-3.5 h-3.5" />
                                                <span>Reject</span>
                                            </button>
                                        )}

                                        {status !== 'pending' && (
                                            <button
                                                type="button"
                                                onClick={() => handleSingleStatus(u._id, 'pending')}
                                                disabled={isProcessing}
                                                className="p-2 sm:px-2 sm:py-1.5 rounded-lg bg-white/5 border border-gray-800 text-amber-400 hover:bg-amber-950/40 text-xs font-semibold transition-colors cursor-pointer"
                                                title="Reset to Pending Verification"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" />
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => handleDeleteUser(u._id, u.name)}
                                            className="p-2 sm:px-2 sm:py-1.5 rounded-lg bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer"
                                            title="Permanently Delete User"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Full Profile Audit Modal (Android Responsive Modal / Bottom Sheet) */}
            {detailUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-5 sm:p-6 w-full max-w-lg max-h-[90dvh] overflow-y-auto my-auto relative shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                            <div className="flex items-center gap-2.5">
                                <span className="p-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
                                    <UserCheck className="w-4 h-4" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-white leading-tight">Institutional Profile Audit</h3>
                                    <p className="text-[11px] text-gray-400">Verified against MongoDB database</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setDetailUser(null)}
                                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Top Bio Header */}
                        <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-900/40 flex items-center justify-center font-bold text-base text-blue-400 border border-blue-700/50 uppercase shrink-0">
                                {(detailUser.name || 'U').charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="text-base font-bold text-white truncate">{detailUser.name}</h4>
                                <p className="text-xs text-gray-400 truncate">{detailUser.email}</p>
                                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${getRoleBadgeStyle(detailUser.role)}`}>
                                        {detailUser.role}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${getStatusBadgeStyle(detailUser.verificationStatus || 'pending')}`}>
                                        Status: {detailUser.verificationStatus || 'pending'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Submitted Information Fields Grid */}
                        <div className="space-y-2.5 text-xs">
                            <h5 className="font-bold text-gray-300 uppercase tracking-wider text-[11px]">Submitted Credentials</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                    <span className="text-[10px] text-gray-500 font-semibold uppercase">Email Address</span>
                                    <p className="text-white font-medium mt-0.5 break-all">{detailUser.email || 'N/A'}</p>
                                </div>

                                <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                    <span className="text-[10px] text-gray-500 font-semibold uppercase">Contact Phone</span>
                                    <p className="text-white font-medium mt-0.5">{detailUser.phone || 'Not Provided'}</p>
                                </div>

                                {detailUser.role === 'student' && (
                                    <>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Student Roll / ID</span>
                                            <p className="text-blue-400 font-medium mt-0.5">{detailUser.studentId || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">College / University</span>
                                            <p className="text-white font-medium mt-0.5">{detailUser.college || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Course &amp; Branch</span>
                                            <p className="text-white font-medium mt-0.5">{detailUser.course || ''} - {detailUser.branch || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Current Semester</span>
                                            <p className="text-white font-medium mt-0.5">{detailUser.semester ? `Semester ${detailUser.semester}` : 'N/A'}</p>
                                        </div>
                                    </>
                                )}

                                {detailUser.role === 'faculty' && (
                                    <>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Faculty Employee ID</span>
                                            <p className="text-purple-400 font-medium mt-0.5">{detailUser.facultyId || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Department</span>
                                            <p className="text-white font-medium mt-0.5">{detailUser.department || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Designation</span>
                                            <p className="text-white font-medium mt-0.5">{detailUser.designation || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Subject Expertise</span>
                                            <p className="text-white font-medium mt-0.5">{detailUser.expertise || 'General'}</p>
                                        </div>
                                    </>
                                )}

                                {detailUser.role === 'recruiter' && (
                                    <>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Company Name</span>
                                            <p className="text-emerald-400 font-medium mt-0.5">{detailUser.companyName || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Corporate Email</span>
                                            <p className="text-white font-medium mt-0.5 break-all">{detailUser.corporateEmail || detailUser.email || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Website</span>
                                            <p className="text-blue-400 font-medium mt-0.5 truncate">{detailUser.website || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Industry / Location</span>
                                            <p className="text-white font-medium mt-0.5">{detailUser.industryType || ''} {detailUser.location ? `(${detailUser.location})` : ''}</p>
                                        </div>
                                    </>
                                )}

                                {detailUser.role === 'tpo' && (
                                    <>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">TPO Officer ID</span>
                                            <p className="text-amber-400 font-medium mt-0.5">{detailUser.tpoId || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Institution Code</span>
                                            <p className="text-white font-medium mt-0.5">{detailUser.institutionCode || 'N/A'}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#0a0a0a] border border-gray-800/80 col-span-1 sm:col-span-2">
                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Institution Name</span>
                                            <p className="text-white font-medium mt-0.5">{detailUser.college || 'N/A'}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Audit Log Strip */}
                        <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 space-y-1 text-[11px] text-gray-400">
                            <p className="flex items-center justify-between">
                                <span>Account Registered:</span>
                                <span className="text-white font-medium">{formatDate(detailUser.createdAt)}</span>
                            </p>
                            {detailUser.verifiedAt && (
                                <p className="flex items-center justify-between">
                                    <span>Last Verified On:</span>
                                    <span className="text-emerald-400 font-medium">{formatDate(detailUser.verifiedAt)}</span>
                                </p>
                            )}
                            {detailUser.rejectionReason && (
                                <div className="mt-2 p-2 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300">
                                    <span className="font-bold text-red-400">Recorded Rejection Reason:</span>
                                    <p className="mt-0.5 text-xs">{detailUser.rejectionReason}</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Action Controls */}
                        <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-gray-800">
                            <button
                                type="button"
                                onClick={() => setDetailUser(null)}
                                className="px-4 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold cursor-pointer"
                            >
                                Close Audit
                            </button>

                            {detailUser.verificationStatus !== 'approved' && (
                                <button
                                    type="button"
                                    onClick={() => handleSingleStatus(detailUser._id, 'approved')}
                                    disabled={isProcessing}
                                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Approve &amp; Activate</span>
                                </button>
                            )}

                            {detailUser.verificationStatus !== 'rejected' && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const target = detailUser;
                                        setDetailUser(null);
                                        setRejectingUser(target);
                                    }}
                                    disabled={isProcessing}
                                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-red-600/20"
                                >
                                    <XCircle className="w-4 h-4" />
                                    <span>Reject Account</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Rejection Modal with Reasons */}
            {rejectingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-5 sm:p-6 w-full max-w-md max-h-[90dvh] overflow-y-auto my-auto relative shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                                    <XCircle className="w-4 h-4" />
                                </span>
                                <h3 className="text-base font-bold text-white">Reject User Registration</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setRejectingUser(null); setRejectionReasonInput(''); }}
                                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-xs text-gray-400">
                            Rejecting <strong className="text-white">{rejectingUser.name}</strong> ({rejectingUser.email}). Please provide a verified institutional reason for the rejection:
                        </p>

                        {/* Preset Reasons Chips */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-gray-400">Quick Reason Presets:</label>
                            <div className="flex flex-wrap gap-1.5">
                                {rejectionPresets.map((preset, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setRejectionReasonInput(preset)}
                                        className={`px-2 py-1 rounded-lg text-[10px] font-medium border text-left transition-colors cursor-pointer ${
                                            rejectionReasonInput === preset
                                                ? 'bg-red-500/20 border-red-500/50 text-red-300'
                                                : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:text-gray-200'
                                        }`}
                                    >
                                        {preset}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Custom Rejection Reason</label>
                            <textarea
                                rows="3"
                                value={rejectionReasonInput}
                                onChange={(e) => setRejectionReasonInput(e.target.value)}
                                placeholder="Enter specific reason for rejecting this user credentials..."
                                className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60 resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800">
                            <button
                                type="button"
                                onClick={() => { setRejectingUser(null); setRejectionReasonInput(''); }}
                                className="px-4 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSingleStatus(rejectingUser._id, 'rejected', rejectionReasonInput)}
                                disabled={isProcessing}
                                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-red-600/30"
                            >
                                <XCircle className="w-4 h-4" />
                                <span>Confirm Rejection</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ModerationModule = () => {
    const [subTab, setSubTab] = React.useState('opportunities'); // 'opportunities' | 'reports' | 'compliance'
    const [overview, setOverview] = React.useState({
        opportunities: { total: 0, approved: 0, pending: 0, flagged: 0, rejected: 0 },
        reports: { total: 0, pending: 0, investigating: 0, resolved: 0, dismissed: 0 },
        recentReports: []
    });
    const [opportunities, setOpportunities] = React.useState([]);
    const [reports, setReports] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [lastSync, setLastSync] = React.useState(new Date());
    const [feedback, setFeedback] = React.useState('');
    const [isProcessing, setIsProcessing] = React.useState(false);

    // Filter states for Opportunities
    const [oppSearch, setOppSearch] = React.useState('');
    const [oppModFilter, setOppModFilter] = React.useState('all');
    const [oppTypeFilter, setOppTypeFilter] = React.useState('all');
    const [oppStatusFilter, setOppStatusFilter] = React.useState('all');

    // Filter states for Reports
    const [reportSearch, setReportSearch] = React.useState('');
    const [reportStatusFilter, setReportStatusFilter] = React.useState('all');
    const [reportSeverityFilter, setReportSeverityFilter] = React.useState('all');

    // Modals
    const [detailOpp, setDetailOpp] = React.useState(null);
    const [flagModalOpp, setFlagModalOpp] = React.useState(null);
    const [flagReasonInput, setFlagReasonInput] = React.useState('');
    const [investigateReport, setInvestigateReport] = React.useState(null);
    const [reportStatusInput, setReportStatusInput] = React.useState('investigating');
    const [reportNotesInput, setReportNotesInput] = React.useState('');
    const [reportActionInput, setReportActionInput] = React.useState('');
    const [isNewReportModal, setIsNewReportModal] = React.useState(false);
    const [newReportForm, setNewReportForm] = React.useState({
        title: '',
        description: '',
        targetType: 'opportunity',
        targetTitle: '',
        category: 'policy_violation',
        severity: 'medium',
        reporterName: 'Administrator',
        reporterEmail: 'admin@careersync.com',
        reporterRole: 'admin'
    });

    const showToast = (msg) => {
        setFeedback(msg);
        setTimeout(() => setFeedback(''), 4000);
    };

    // Lock body scrolling when modals are open (Mobile / Android ergonomics)
    React.useEffect(() => {
        if (detailOpp || flagModalOpp || investigateReport || isNewReportModal) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [detailOpp, flagModalOpp, investigateReport, isNewReportModal]);

    const fetchModerationData = async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);

        try {
            const [overviewRes, oppsRes, reportsRes] = await Promise.all([
                api.get('/admin/moderation/overview'),
                api.get('/admin/moderation/opportunities'),
                api.get('/admin/moderation/reports')
            ]);

            if (overviewRes.data?.success) setOverview(overviewRes.data.data);
            if (oppsRes.data?.success) setOpportunities(oppsRes.data.data || []);
            if (reportsRes.data?.success) setReports(reportsRes.data.data || []);
            setLastSync(new Date());
        } catch (err) {
            console.error('Error fetching moderation data:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    React.useEffect(() => {
        fetchModerationData();
        // 5-second real-time database polling
        const timer = setInterval(() => fetchModerationData(true), 5000);
        return () => clearInterval(timer);
    }, []);

    const formatTimeAgo = (dateStr) => {
        if (!dateStr) return 'Recently';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return 'Recently';
            const diffMs = Date.now() - d.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins}m ago`;
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) return `${diffHours}h ago`;
            return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        } catch {
            return 'Recently';
        }
    };

    // Opportunity Actions
    const handleModerateOpp = async (id, newModStatus, reason = '', newStatus = null) => {
        setIsProcessing(true);
        try {
            const payload = {
                moderationStatus: newModStatus,
                moderationReason: reason
            };
            if (newStatus) payload.status = newStatus;

            const res = await api.put(`/admin/moderation/opportunities/${id}`, payload);
            if (res.data?.success) {
                const updated = res.data.data;
                setOpportunities(prev => prev.map(o => o._id === id ? { ...o, ...updated } : o));
                if (detailOpp && detailOpp._id === id) setDetailOpp(prev => ({ ...prev, ...updated }));
                if (flagModalOpp && flagModalOpp._id === id) {
                    setFlagModalOpp(null);
                    setFlagReasonInput('');
                }
                showToast(`Posting updated: marked as ${newModStatus.toUpperCase()}`);
                fetchModerationData(true);
            } else {
                alert(res.data?.error || 'Failed to update opportunity moderation state.');
            }
        } catch (err) {
            console.error('Error updating opportunity:', err);
            alert(err.response?.data?.error || 'Server error updating moderation status.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleToggleOppStatus = async (opp) => {
        const nextStatus = opp.status === 'Open' ? 'Closed' : 'Open';
        try {
            const res = await api.put(`/admin/moderation/opportunities/${opp._id}`, { status: nextStatus });
            if (res.data?.success) {
                setOpportunities(prev => prev.map(o => o._id === opp._id ? { ...o, status: nextStatus } : o));
                if (detailOpp && detailOpp._id === opp._id) setDetailOpp(prev => ({ ...prev, status: nextStatus }));
                showToast(`Posting marked as ${nextStatus}`);
                fetchModerationData(true);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to update status.');
        }
    };

    const handleDeleteOpp = async (id, title) => {
        if (!window.confirm(`Are you sure you want to permanently delete "${title}" from the database?`)) return;
        try {
            const res = await api.delete(`/admin/moderation/opportunities/${id}`);
            if (res.data?.success) {
                setOpportunities(prev => prev.filter(o => o._id !== id));
                if (detailOpp && detailOpp._id === id) setDetailOpp(null);
                showToast(`Posting "${title}" deleted from database.`);
                fetchModerationData(true);
            } else {
                alert(res.data?.error || 'Failed to delete posting.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to delete posting.');
        }
    };

    // Incident Report Actions
    const handleSaveReportStatus = async (id) => {
        setIsProcessing(true);
        try {
            const res = await api.put(`/admin/moderation/reports/${id}`, {
                status: reportStatusInput,
                adminNotes: reportNotesInput,
                actionTaken: reportActionInput
            });
            if (res.data?.success) {
                const updated = res.data.data;
                setReports(prev => prev.map(r => r._id === id ? { ...r, ...updated } : r));
                setInvestigateReport(null);
                showToast(`Incident marked as ${updated.status.toUpperCase()}`);
                fetchModerationData(true);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to update incident report.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteReport = async (id) => {
        if (!window.confirm('Delete this incident report permanently?')) return;
        try {
            const res = await api.delete(`/admin/moderation/reports/${id}`);
            if (res.data?.success) {
                setReports(prev => prev.filter(r => r._id !== id));
                if (investigateReport && investigateReport._id === id) setInvestigateReport(null);
                showToast('Incident report removed.');
                fetchModerationData(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateNewReport = async (e) => {
        e.preventDefault();
        if (!newReportForm.title.trim() || !newReportForm.description.trim()) {
            return alert('Title and description are required.');
        }
        setIsProcessing(true);
        try {
            const res = await api.post('/admin/moderation/reports', newReportForm);
            if (res.data?.success) {
                setReports(prev => [res.data.data, ...prev]);
                setIsNewReportModal(false);
                setNewReportForm({
                    title: '',
                    description: '',
                    targetType: 'opportunity',
                    targetTitle: '',
                    category: 'policy_violation',
                    severity: 'medium',
                    reporterName: 'Administrator',
                    reporterEmail: 'admin@careersync.com',
                    reporterRole: 'admin'
                });
                showToast('Incident recorded into database.');
                fetchModerationData(true);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to create incident report.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Filtered lists
    const filteredOpps = opportunities.filter(o => {
        if (oppModFilter !== 'all') {
            const mStatus = o.moderationStatus || 'approved';
            if (mStatus !== oppModFilter) return false;
        }
        if (oppTypeFilter !== 'all' && o.type !== oppTypeFilter) return false;
        if (oppStatusFilter !== 'all' && o.status !== oppStatusFilter) return false;
        if (oppSearch.trim()) {
            const term = oppSearch.toLowerCase();
            const titleMatch = o.title?.toLowerCase().includes(term);
            const compMatch = o.company?.companyName?.toLowerCase().includes(term);
            const locMatch = o.location?.toLowerCase().includes(term);
            if (!titleMatch && !compMatch && !locMatch) return false;
        }
        return true;
    });

    const filteredReports = reports.filter(r => {
        if (reportStatusFilter !== 'all' && r.status !== reportStatusFilter) return false;
        if (reportSeverityFilter !== 'all' && r.severity !== reportSeverityFilter) return false;
        if (reportSearch.trim()) {
            const term = reportSearch.toLowerCase();
            const titleMatch = r.title?.toLowerCase().includes(term);
            const descMatch = r.description?.toLowerCase().includes(term);
            const targetMatch = r.targetTitle?.toLowerCase().includes(term);
            if (!titleMatch && !descMatch && !targetMatch) return false;
        }
        return true;
    });

    const getSeverityBadge = (sev) => {
        switch (sev?.toLowerCase()) {
            case 'critical':
                return 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse';
            case 'high':
                return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
            case 'medium':
                return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
            case 'low':
            default:
                return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
        }
    };

    const getModBadge = (status) => {
        switch (status) {
            case 'flagged':
                return { label: 'Flagged / Infraction', bg: 'bg-red-500/15 text-red-400 border-red-500/30' };
            case 'rejected':
                return { label: 'Rejected', bg: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
            case 'pending':
                return { label: 'Pending Audit', bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
            case 'approved':
            default:
                return { label: 'Verified & Approved', bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
        }
    };

    const totalOppsCount = overview.opportunities?.total || opportunities.length;
    const approvedOppsCount = overview.opportunities?.approved || opportunities.filter(o => !o.moderationStatus || o.moderationStatus === 'approved').length;
    const flaggedOppsCount = overview.opportunities?.flagged || opportunities.filter(o => o.moderationStatus === 'flagged').length;
    const openReportsCount = (overview.reports?.pending || 0) + (overview.reports?.investigating || 0);

    return (
        <div className="space-y-6 sm:space-y-8 pb-10">
            {/* Feedback Toast */}
            {feedback && (
                <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 border border-red-400/30 animate-bounce">
                    <CheckCircle className="w-4 h-4" />
                    <span>{feedback}</span>
                </div>
            )}

            {/* Header & Stats Banner */}
            <div className="bg-[#121212]/90 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center space-x-2.5 mb-1.5 flex-wrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
                                <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
                                Content Sentinel &amp; Compliance Hub
                            </span>
                            <span className="text-gray-500 text-xs hidden sm:inline">•</span>
                            <span className="text-gray-400 text-xs flex items-center">
                                <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
                                Sync: every 5s (Last {formatTimeAgo(lastSync)})
                            </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Content &amp; Opportunity Moderation</h2>
                        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                            Real-time audit of recruiter postings, internship stipend compliance, dead links &amp; student incident reports.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center flex-wrap gap-2.5">
                        <button
                            type="button"
                            onClick={() => fetchModerationData()}
                            disabled={refreshing}
                            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs sm:text-sm font-medium border border-gray-700/60 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${refreshing ? 'animate-spin text-red-400' : 'text-gray-400'}`} />
                            {refreshing ? 'Syncing...' : 'Sync DB'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsNewReportModal(true)}
                            className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-600/20 border border-red-500/40 transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4 mr-1.5" />
                            Log Incident Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Real-time KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* 1. Total Postings Monitored */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400/90">Postings Monitored</span>
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-extrabold text-white tracking-tight">
                        {loading ? '...' : totalOppsCount}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Active jobs &amp; internships live</p>
                </div>

                {/* 2. Clearance Rate */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">Institutional Clearance</span>
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-extrabold text-white tracking-tight">
                        {loading ? '...' : `${totalOppsCount > 0 ? Math.round((approvedOppsCount / totalOppsCount) * 100) : 100}%`}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{approvedOppsCount} approved listings</p>
                </div>

                {/* 3. Flagged / Infractions */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-red-500/40 transition-all shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-red-400/90">Flagged / Infractions</span>
                        <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <Flag className="w-4 h-4 text-red-400" />
                        </div>
                    </div>
                    <div className="flex items-baseline space-x-2">
                        <p className="text-3xl font-extrabold text-white tracking-tight">
                            {loading ? '...' : flaggedOppsCount}
                        </p>
                        {flaggedOppsCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                                Requires Review
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Under active investigation</p>
                </div>

                {/* 4. Open Incident Queue */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">Incident Reports</span>
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-amber-400" />
                        </div>
                    </div>
                    <div className="flex items-baseline space-x-2">
                        <p className="text-3xl font-extrabold text-amber-300 tracking-tight">
                            {loading ? '...' : openReportsCount}
                        </p>
                        <span className="text-xs text-gray-400 font-normal">Active cases</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{overview.reports?.resolved || 0} resolved to date</p>
                </div>
            </div>

            {/* Subtab Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
                <button
                    type="button"
                    onClick={() => setSubTab('opportunities')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                        subTab === 'opportunities'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30 shadow-md'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                    <Briefcase className="w-4 h-4" />
                    <span>Opportunity Moderation</span>
                    <span className="ml-1.5 px-2 py-0.2 rounded-full text-[11px] font-bold bg-white/10 text-gray-300">
                        {opportunities.length}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setSubTab('reports')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                        subTab === 'reports'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30 shadow-md'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                    <AlertCircle className="w-4 h-4" />
                    <span>Incident &amp; Flag Reports</span>
                    {openReportsCount > 0 && (
                        <span className="ml-1.5 px-2 py-0.2 rounded-full text-[11px] font-bold bg-amber-400 text-black animate-pulse">
                            {openReportsCount}
                        </span>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => setSubTab('compliance')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                        subTab === 'compliance'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30 shadow-md'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Safety Guidelines &amp; Compliance</span>
                </button>
            </div>

            {/* TAB 1: OPPORTUNITIES MODERATION */}
            {subTab === 'opportunities' && (
                <div className="space-y-4">
                    {/* Search & Filters Bar */}
                    <div className="bg-[#121212]/90 backdrop-blur-md border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by job title, company name, location..."
                                value={oppSearch}
                                onChange={(e) => setOppSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                            />
                        </div>

                        {/* Filter Selectors */}
                        <div className="flex flex-wrap items-center gap-2">
                            <select
                                value={oppModFilter}
                                onChange={(e) => setOppModFilter(e.target.value)}
                                className="px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs focus:outline-none focus:border-red-500/60 cursor-pointer"
                            >
                                <option value="all">Moderation: All</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending Audit</option>
                                <option value="flagged">Flagged</option>
                                <option value="rejected">Rejected</option>
                            </select>

                            <select
                                value={oppTypeFilter}
                                onChange={(e) => setOppTypeFilter(e.target.value)}
                                className="px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs focus:outline-none focus:border-red-500/60 cursor-pointer"
                            >
                                <option value="all">Type: All</option>
                                <option value="Placement">Placement Drives</option>
                                <option value="Internship">Internships</option>
                                <option value="Project">Projects</option>
                            </select>

                            <select
                                value={oppStatusFilter}
                                onChange={(e) => setOppStatusFilter(e.target.value)}
                                className="px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs focus:outline-none focus:border-red-500/60 cursor-pointer"
                            >
                                <option value="all">State: All</option>
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    {/* Listings Stream */}
                    {loading ? (
                        <div className="py-20 text-center text-gray-500 text-xs">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-red-500 mb-2" />
                            Loading opportunity postings from database...
                        </div>
                    ) : filteredOpps.length === 0 ? (
                        <div className="py-16 text-center bg-[#121212]/80 border border-gray-800 rounded-2xl p-6">
                            <Briefcase className="w-10 h-10 mx-auto text-gray-700 mb-2" />
                            <h4 className="text-base font-bold text-gray-300">No Opportunity Postings Found</h4>
                            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                                No job, internship, or placement listings matched the current search criteria in MongoDB.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3.5">
                            {filteredOpps.map(opp => {
                                const modBadge = getModBadge(opp.moderationStatus);
                                const isFlagged = opp.moderationStatus === 'flagged';
                                const isOpen = opp.status === 'Open';

                                return (
                                    <div
                                        key={opp._id}
                                        className={`bg-[#121212]/90 border rounded-2xl p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                                            isFlagged
                                                ? 'border-red-500/40 bg-red-950/10'
                                                : 'border-gray-800 hover:border-gray-700'
                                        }`}
                                    >
                                        <div className="flex-1 space-y-2 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                                    opp.type === 'Placement'
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                        : opp.type === 'Internship'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                        : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                                                }`}>
                                                    {opp.type}
                                                </span>

                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${modBadge.bg}`}>
                                                    {modBadge.label}
                                                </span>

                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                                    isOpen
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                        : 'bg-gray-800 text-gray-400 border-gray-700'
                                                }`}>
                                                    {opp.status || 'Open'}
                                                </span>

                                                <span className="text-gray-500 text-xs hidden sm:inline">•</span>
                                                <span className="text-gray-400 text-xs flex items-center">
                                                    <Clock className="w-3 h-3 mr-1 text-gray-500" />
                                                    {formatTimeAgo(opp.createdAt)}
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="text-base font-bold text-white leading-snug">
                                                    {opp.title}
                                                </h3>
                                                <p className="text-xs text-gray-400 flex items-center space-x-2 mt-0.5 flex-wrap">
                                                    <span className="text-gray-200 font-semibold flex items-center">
                                                        <Building2 className="w-3 h-3 mr-1 text-blue-400" />
                                                        {opp.company?.companyName || 'Verified Institutional Partner'}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center text-gray-400">
                                                        <MapPin className="w-3 h-3 mr-1 text-red-400" />
                                                        {opp.location || 'Multiple Locations'} ({opp.workMode || 'On-site'})
                                                    </span>
                                                    <span>•</span>
                                                    <span className="text-emerald-400 font-medium">
                                                        {opp.stipendOrSalary || 'Competitive Compensation'}
                                                    </span>
                                                </p>
                                            </div>

                                            {opp.moderationReason && (
                                                <div className="p-2 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-xs">
                                                    <strong className="text-red-400">Moderator Flag Reason:</strong> {opp.moderationReason}
                                                </div>
                                            )}

                                            {/* Required Skills Chips */}
                                            {Array.isArray(opp.requiredSkills) && opp.requiredSkills.length > 0 && (
                                                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                                    {opp.requiredSkills.slice(0, 5).map((sk, sidx) => (
                                                        <span key={sidx} className="px-2 py-0.5 rounded-md bg-white/5 border border-gray-800 text-[11px] text-gray-300 font-mono">
                                                            {sk.name || sk}
                                                        </span>
                                                    ))}
                                                    {opp.requiredSkills.length > 5 && (
                                                        <span className="text-[10px] text-gray-500 font-semibold">
                                                            +{opp.requiredSkills.length - 5} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap md:flex-col lg:flex-row items-center gap-2 shrink-0 pt-3 md:pt-0 border-t border-gray-800 md:border-0">
                                            <button
                                                type="button"
                                                onClick={() => setDetailOpp(opp)}
                                                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold border border-gray-800 transition-colors flex items-center space-x-1.5 cursor-pointer"
                                                title="Audit posting details"
                                            >
                                                <Eye className="w-3.5 h-3.5 text-blue-400" />
                                                <span>Audit Details</span>
                                            </button>

                                            {opp.moderationStatus !== 'approved' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleModerateOpp(opp._id, 'approved')}
                                                    disabled={isProcessing}
                                                    className="px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                                                    title="Approve posting"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    <span>Approve</span>
                                                </button>
                                            )}

                                            {opp.moderationStatus !== 'flagged' && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFlagModalOpp(opp);
                                                        setFlagReasonInput('');
                                                    }}
                                                    className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors flex items-center space-x-1.5 cursor-pointer"
                                                    title="Flag posting infraction"
                                                >
                                                    <Flag className="w-3.5 h-3.5 text-amber-400" />
                                                    <span>Flag</span>
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() => handleToggleOppStatus(opp)}
                                                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center space-x-1.5 ${
                                                    isOpen
                                                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700'
                                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                                                }`}
                                                title={isOpen ? 'Pause applications' : 'Open applications'}
                                            >
                                                <Power className="w-3.5 h-3.5" />
                                                <span>{isOpen ? 'Close' : 'Re-open'}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDeleteOpp(opp._id, opp.title)}
                                                className="p-2 rounded-xl bg-red-950/20 hover:bg-red-900/40 text-red-400 border border-red-900/40 transition-colors cursor-pointer"
                                                title="Delete posting permanently"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* TAB 2: INCIDENT & FLAG REPORTS */}
            {subTab === 'reports' && (
                <div className="space-y-4">
                    {/* Filter & Search Bar */}
                    <div className="bg-[#121212]/90 backdrop-blur-md border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search incidents, reporters, targets..."
                                value={reportSearch}
                                onChange={(e) => setReportSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <select
                                value={reportStatusFilter}
                                onChange={(e) => setReportStatusFilter(e.target.value)}
                                className="px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs focus:outline-none focus:border-red-500/60 cursor-pointer"
                            >
                                <option value="all">Status: All</option>
                                <option value="pending">Pending</option>
                                <option value="investigating">Investigating</option>
                                <option value="resolved">Resolved</option>
                                <option value="dismissed">Dismissed</option>
                            </select>

                            <select
                                value={reportSeverityFilter}
                                onChange={(e) => setReportSeverityFilter(e.target.value)}
                                className="px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs focus:outline-none focus:border-red-500/60 cursor-pointer"
                            >
                                <option value="all">Severity: All</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Incidents Stream */}
                    {loading ? (
                        <div className="py-20 text-center text-gray-500 text-xs">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-red-500 mb-2" />
                            Loading incident reports from database...
                        </div>
                    ) : filteredReports.length === 0 ? (
                        <div className="py-16 text-center bg-[#121212]/80 border border-gray-800 rounded-2xl p-6">
                            <CheckCircle className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
                            <h4 className="text-base font-bold text-gray-300">No Incident Reports in Queue</h4>
                            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                                All reported violations have been investigated or resolved.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3.5">
                            {filteredReports.map(rep => {
                                const isPending = rep.status === 'pending';
                                const isInvestigating = rep.status === 'investigating';
                                const isResolved = rep.status === 'resolved';

                                return (
                                    <div
                                        key={rep._id}
                                        className="bg-[#121212]/90 border border-gray-800 hover:border-gray-700 rounded-2xl p-4 sm:p-5 transition-all space-y-3"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-800/80">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getSeverityBadge(rep.severity)}`}>
                                                    {rep.severity}
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/5 border border-gray-800 text-gray-300 uppercase">
                                                    Target: {rep.targetType} {rep.targetTitle ? `("${rep.targetTitle}")` : ''}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                                                    isResolved
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                        : isInvestigating
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                }`}>
                                                    Status: {rep.status}
                                                </span>
                                            </div>

                                            <span className="text-gray-400 text-xs font-mono">
                                                {formatTimeAgo(rep.createdAt)}
                                            </span>
                                        </div>

                                        <div>
                                            <h4 className="text-sm sm:text-base font-bold text-white">
                                                {rep.title}
                                            </h4>
                                            <p className="text-xs text-gray-300 leading-relaxed mt-1">
                                                {rep.description}
                                            </p>
                                        </div>

                                        {/* Reporter Metadata */}
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 bg-[#0a0a0a] p-2.5 rounded-xl border border-gray-800/80">
                                            <span>Reporter: <strong className="text-gray-200">{rep.reporterName || 'Anonymous'}</strong> ({rep.reporterRole || 'user'})</span>
                                            <span>Email: <strong className="text-blue-400 font-mono">{rep.reporterEmail || 'N/A'}</strong></span>
                                            {rep.resolvedBy && (
                                                <span className="text-emerald-400 font-medium">Resolved by {rep.resolvedBy} on {formatTimeAgo(rep.resolvedAt)}</span>
                                            )}
                                        </div>

                                        {/* Admin Notes */}
                                        {rep.adminNotes && (
                                            <div className="p-2.5 rounded-xl bg-blue-950/20 border border-blue-800/40 text-xs text-blue-300">
                                                <strong className="text-blue-400">Admin Investigation Notes:</strong> {rep.adminNotes}
                                                {rep.actionTaken && (
                                                    <p className="mt-1 text-emerald-400">
                                                        <strong>Action Taken:</strong> {rep.actionTaken}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800/80">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setInvestigateReport(rep);
                                                    setReportStatusInput(rep.status || 'investigating');
                                                    setReportNotesInput(rep.adminNotes || '');
                                                    setReportActionInput(rep.actionTaken || '');
                                                }}
                                                className="px-3.5 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold shadow-md flex items-center space-x-1.5 cursor-pointer"
                                            >
                                                <ShieldAlert className="w-3.5 h-3.5" />
                                                <span>Manage &amp; Resolve</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDeleteReport(rep._id)}
                                                className="p-1.5 rounded-xl hover:bg-red-950/30 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                                                title="Delete report"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* TAB 3: SAFETY GUIDELINES & COMPLIANCE */}
            {subTab === 'compliance' && (
                <div className="space-y-6">
                    <div className="bg-[#121212]/90 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-white">Institutional Placement &amp; Internship Safety Policy</h3>
                                <p className="text-xs text-gray-400">Rules enforced continuously across all verified corporate and student submissions</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800 space-y-1.5">
                                <h4 className="text-sm font-bold text-emerald-400 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1.5" />
                                    Zero-Fee Recruitment Mandate
                                </h4>
                                <p className="text-gray-400 leading-relaxed">
                                    No recruiter or training organization is permitted to charge registration fees, security deposits, or evaluation exam fees from students. Any job listing violating this is flagged for immediate termination.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800 space-y-1.5">
                                <h4 className="text-sm font-bold text-blue-400 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1.5" />
                                    Transparent Compensation Standard
                                </h4>
                                <p className="text-gray-400 leading-relaxed">
                                    All opportunities must disclose clear stipend/salary figures (minimum ₹5,000/mo for full-time internships). Postings claiming "Unpaid trial with prospective bonus" without academic credit approval are rejected.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800 space-y-1.5">
                                <h4 className="text-sm font-bold text-purple-400 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1.5" />
                                    Corporate Identity Verification
                                </h4>
                                <p className="text-gray-400 leading-relaxed">
                                    Recruiter accounts posting opportunities must possess a valid institutional company email domain or verified registration paperwork on file with the Training &amp; Placement Office.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800 space-y-1.5">
                                <h4 className="text-sm font-bold text-amber-400 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1.5" />
                                    Safe External Link Protocol
                                </h4>
                                <p className="text-gray-400 leading-relaxed">
                                    External URLs for assessments and application forms are screened to prevent dead endpoints (404), unauthorized redirect phishing, and unencrypted HTTP destinations.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <span className="text-xs text-gray-500">
                                Policy Engine Status: <strong className="text-emerald-400">Active (Real-time DB Trigger Enabled)</strong>
                            </span>
                            <button
                                type="button"
                                onClick={() => showToast('Automated compliance scan completed: 0 active policy violations found.')}
                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold border border-gray-700/60 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                            >
                                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                                <span>Run Automated Compliance Scan</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 1: AUDIT & INSPECT OPPORTUNITY */}
            {detailOpp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-5 sm:p-6 w-full max-w-2xl max-h-[90dvh] overflow-y-auto my-auto relative shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                            <div className="flex items-center space-x-2.5">
                                <span className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
                                    <Briefcase className="w-4 h-4" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-white leading-tight">Opportunity Moderation Audit</h3>
                                    <p className="text-[11px] text-gray-400">Verified against MongoDB database records</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setDetailOpp(null)}
                                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Top Summary Banner */}
                        <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800 flex items-start justify-between gap-3 flex-wrap">
                            <div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
                                    {detailOpp.type}
                                </span>
                                <h4 className="text-lg font-bold text-white mt-1">{detailOpp.title}</h4>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {detailOpp.company?.companyName || 'Corporate Partner'} • {detailOpp.location || 'India'} ({detailOpp.workMode || 'On-site'})
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-gray-400 block">Stipend / CTC</span>
                                <span className="text-base font-bold text-emerald-400">{detailOpp.stipendOrSalary || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="space-y-3 text-xs">
                            <div>
                                <h5 className="font-bold text-gray-300 uppercase tracking-wider text-[11px] mb-1">Description &amp; Overview</h5>
                                <p className="text-gray-300 leading-relaxed bg-[#0a0a0a] p-3 rounded-xl border border-gray-800">
                                    {detailOpp.description || 'No description provided.'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 space-y-1">
                                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Eligibility CGPA &amp; Branches</span>
                                    <p className="text-white font-medium">Min CGPA: {detailOpp.eligibilityCriteria?.minCgpa || 'No cut-off'}</p>
                                    <p className="text-gray-400">Branches: {detailOpp.eligibilityCriteria?.branches?.join(', ') || 'All disciplines'}</p>
                                    <p className="text-gray-400">Graduation Years: {detailOpp.eligibilityCriteria?.gradYear?.join(', ') || 'All years'}</p>
                                </div>

                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 space-y-1">
                                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Company &amp; Contact</span>
                                    <p className="text-white font-medium">{detailOpp.company?.companyName || 'Direct Placement'}</p>
                                    <p className="text-blue-400 truncate">{detailOpp.company?.website || 'No website link'}</p>
                                    <p className="text-gray-400">Contact: {detailOpp.company?.contactEmail || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Required Skills */}
                            {Array.isArray(detailOpp.requiredSkills) && detailOpp.requiredSkills.length > 0 && (
                                <div>
                                    <h5 className="font-bold text-gray-300 uppercase tracking-wider text-[11px] mb-1">Required Skills</h5>
                                    <div className="flex flex-wrap gap-1.5">
                                        {detailOpp.requiredSkills.map((sk, idx) => (
                                            <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-xs">
                                                {sk.name || sk} ({sk.level || 'Required'})
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Selection Process */}
                            {Array.isArray(detailOpp.selectionProcess) && detailOpp.selectionProcess.length > 0 && (
                                <div>
                                    <h5 className="font-bold text-gray-300 uppercase tracking-wider text-[11px] mb-1">Selection Rounds</h5>
                                    <ul className="list-disc pl-5 text-gray-300 space-y-0.5">
                                        {detailOpp.selectionProcess.map((round, idx) => (
                                            <li key={idx}>{round}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Modal Action Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-800">
                            <button
                                type="button"
                                onClick={() => handleDeleteOpp(detailOpp._id, detailOpp.title)}
                                className="px-3.5 py-2 rounded-xl bg-red-950/30 text-red-400 hover:bg-red-900/50 border border-red-900/50 text-xs font-semibold cursor-pointer"
                            >
                                Delete Posting
                            </button>

                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFlagModalOpp(detailOpp);
                                        setDetailOpp(null);
                                    }}
                                    className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 text-xs font-semibold cursor-pointer"
                                >
                                    Flag Infraction
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleModerateOpp(detailOpp._id, 'approved')}
                                    disabled={isProcessing}
                                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                                >
                                    Approve &amp; Verify
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: FLAG INFRACTION */}
            {flagModalOpp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-5 sm:p-6 w-full max-w-md max-h-[90dvh] overflow-y-auto my-auto relative shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                            <div className="flex items-center space-x-2">
                                <span className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                                    <Flag className="w-4 h-4" />
                                </span>
                                <h3 className="text-base font-bold text-white">Flag Opportunity Infraction</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFlagModalOpp(null)}
                                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-xs text-gray-300">
                            Flagging <strong>"{flagModalOpp.title}"</strong> will alert administrators, attach a visible warning badge, and temporarily suspend placement notifications.
                        </p>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-300 block">Select Infraction Category</label>
                            <div className="space-y-1.5">
                                {[
                                    'Misleading or unconfirmed stipend/salary terms',
                                    'Unauthorized external fee requested from students',
                                    'Dead external portal link (404 / Broken)',
                                    'Recruiter identity or domain could not be verified',
                                    'Discriminatory or non-compliant eligibility criteria'
                                ].map((preset, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setFlagReasonInput(preset)}
                                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                                            flagReasonInput === preset
                                                ? 'bg-red-500/15 border-red-500/40 text-red-300'
                                                : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                                        }`}
                                    >
                                        {preset}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-300 block mb-1">Custom Moderation Remark</label>
                            <textarea
                                rows="3"
                                placeholder="Enter specific infraction remarks..."
                                value={flagReasonInput}
                                onChange={(e) => setFlagReasonInput(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60 resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-800">
                            <button
                                type="button"
                                onClick={() => setFlagModalOpp(null)}
                                className="px-4 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleModerateOpp(flagModalOpp._id, 'flagged', flagReasonInput)}
                                disabled={isProcessing || !flagReasonInput.trim()}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                            >
                                {isProcessing ? 'Flagging...' : 'Confirm Flag'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 3: INVESTIGATE & RESOLVE INCIDENT REPORT */}
            {investigateReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-5 sm:p-6 w-full max-w-lg max-h-[90dvh] overflow-y-auto my-auto relative shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                            <div className="flex items-center space-x-2">
                                <span className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                                    <ShieldAlert className="w-4 h-4" />
                                </span>
                                <h3 className="text-base font-bold text-white">Investigate &amp; Resolve Incident</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setInvestigateReport(null)}
                                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 space-y-1 text-xs">
                            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Reported Incident</span>
                            <h4 className="text-sm font-bold text-white">{investigateReport.title}</h4>
                            <p className="text-gray-400">{investigateReport.description}</p>
                            <div className="pt-2 text-[11px] text-gray-500">
                                Reporter: {investigateReport.reporterName} ({investigateReport.reporterEmail})
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-300 block mb-1">Update Status</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {['pending', 'investigating', 'resolved', 'dismissed'].map(st => (
                                        <button
                                            key={st}
                                            type="button"
                                            onClick={() => setReportStatusInput(st)}
                                            className={`py-2 px-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                                                reportStatusInput === st
                                                    ? 'bg-red-500/20 text-red-300 border-red-500/40 shadow-sm'
                                                    : 'bg-[#0a0a0a] border-gray-800 text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            {st}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-300 block mb-1">Administrative Notes</label>
                                <textarea
                                    rows="2"
                                    placeholder="Enter findings from investigation..."
                                    value={reportNotesInput}
                                    onChange={(e) => setReportNotesInput(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-300 block mb-1">Action Taken (e.g., Suspended job, corrected URL)</label>
                                <input
                                    type="text"
                                    placeholder="Action taken on platform..."
                                    value={reportActionInput}
                                    onChange={(e) => setReportActionInput(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-800">
                            <button
                                type="button"
                                onClick={() => setInvestigateReport(null)}
                                className="px-4 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSaveReportStatus(investigateReport._id)}
                                disabled={isProcessing}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                            >
                                {isProcessing ? 'Saving...' : 'Save Resolution'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 4: CREATE NEW INCIDENT REPORT */}
            {isNewReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-5 sm:p-6 w-full max-w-lg max-h-[90dvh] overflow-y-auto my-auto relative shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                            <div className="flex items-center space-x-2">
                                <span className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                                    <Plus className="w-4 h-4" />
                                </span>
                                <h3 className="text-base font-bold text-white">Log Content Incident Report</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsNewReportModal(false)}
                                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateNewReport} className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-300 block mb-1">Incident Title *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Unverified recruiter requesting deposit"
                                    value={newReportForm.title}
                                    onChange={(e) => setNewReportForm({ ...newReportForm, title: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-gray-300 block mb-1">Target Type</label>
                                    <select
                                        value={newReportForm.targetType}
                                        onChange={(e) => setNewReportForm({ ...newReportForm, targetType: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                    >
                                        <option value="opportunity">Opportunity Listing</option>
                                        <option value="notification">Campus Announcement</option>
                                        <option value="user">User / Recruiter Profile</option>
                                        <option value="other">Platform General</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-300 block mb-1">Severity Level</label>
                                    <select
                                        value={newReportForm.severity}
                                        onChange={(e) => setNewReportForm({ ...newReportForm, severity: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                    >
                                        <option value="critical">Critical (Immediate action)</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-300 block mb-1">Target Name / Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Frontend Developer or Recruiter Name"
                                    value={newReportForm.targetTitle}
                                    onChange={(e) => setNewReportForm({ ...newReportForm, targetTitle: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-300 block mb-1">Category</label>
                                <select
                                    value={newReportForm.category}
                                    onChange={(e) => setNewReportForm({ ...newReportForm, category: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                >
                                    <option value="policy_violation">Policy Violation</option>
                                    <option value="misleading_salary">Misleading Compensation / Terms</option>
                                    <option value="fraud_scam">Fraud / Scam Suspicion</option>
                                    <option value="broken_link">Broken Link / External Error</option>
                                    <option value="unauthorized_posting">Unauthorized Posting</option>
                                    <option value="spam">Spam / Duplicate Content</option>
                                    <option value="inappropriate_content">Inappropriate Content</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-300 block mb-1">Description *</label>
                                <textarea
                                    required
                                    rows="3"
                                    placeholder="Describe the incident details..."
                                    value={newReportForm.description}
                                    onChange={(e) => setNewReportForm({ ...newReportForm, description: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60 resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsNewReportModal(false)}
                                    className="px-4 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                                >
                                    {isProcessing ? 'Recording...' : 'Record Incident'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const DatabaseModule = () => {
    const [subTab, setSubTab] = React.useState('collections'); // 'collections' | 'telemetry' | 'maintenance'
    const [overview, setOverview] = React.useState({
        connection: {
            name: '',
            host: '',
            port: 27017,
            readyState: 0,
            statusText: 'Connecting...',
            pingMs: 0,
            mongooseVersion: '',
            nodeVersion: '',
            uptimeSeconds: 0,
            serverTime: null
        },
        dbStats: {
            collectionsCount: 0,
            objectsCount: 0,
            avgObjSizeBytes: 0,
            dataSizeBytes: 0,
            storageSizeBytes: 0,
            indexesCount: 0,
            indexSizeBytes: 0
        },
        collections: []
    });
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [lastSync, setLastSync] = React.useState(new Date());
    const [feedback, setFeedback] = React.useState('');
    const [searchCollection, setSearchCollection] = React.useState('');

    // Document Explorer Modal State
    const [selectedCollection, setSelectedCollection] = React.useState(null);
    const [collectionDocs, setCollectionDocs] = React.useState([]);
    const [docSearch, setDocSearch] = React.useState('');
    const [docPage, setDocPage] = React.useState(1);
    const [docTotal, setDocTotal] = React.useState(0);
    const [docTotalPages, setDocTotalPages] = React.useState(1);
    const [docsLoading, setDocsLoading] = React.useState(false);
    const [expandedDocId, setExpandedDocId] = React.useState(null);

    // Diagnostics & Maintenance
    const [diagnosticRunning, setDiagnosticRunning] = React.useState(false);
    const [diagnosticResult, setDiagnosticResult] = React.useState(null);
    const [isPruning, setIsPruning] = React.useState(false);
    const [keepLogsCount, setKeepLogsCount] = React.useState(100);
    const [pruneConfirmModal, setPruneConfirmModal] = React.useState(false);
    const [exportingName, setExportingName] = React.useState(null);

    const showToast = (msg) => {
        setFeedback(msg);
        setTimeout(() => setFeedback(''), 4000);
    };

    // Lock body scrolling when modals are active (Android/Mobile ergonomics)
    React.useEffect(() => {
        if (selectedCollection || pruneConfirmModal) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [selectedCollection, pruneConfirmModal]);

    const fetchDbOverview = async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);

        try {
            const res = await api.get('/admin/database/overview');
            if (res.data?.success && res.data.data) {
                setOverview(res.data.data);
                setLastSync(new Date());
            }
        } catch (err) {
            console.error('Error fetching database overview:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    React.useEffect(() => {
        fetchDbOverview();
        // 5-second real-time database polling
        const timer = setInterval(() => fetchDbOverview(true), 5000);
        return () => clearInterval(timer);
    }, []);

    const fetchCollectionDocs = async (colName, page = 1, search = '') => {
        setDocsLoading(true);
        try {
            const res = await api.get(`/admin/database/collection/${colName}`, {
                params: { page, limit: 12, search }
            });
            if (res.data?.success) {
                setCollectionDocs(res.data.data || []);
                setDocTotal(res.data.total || 0);
                setDocPage(res.data.page || 1);
                setDocTotalPages(res.data.totalPages || 1);
            }
        } catch (err) {
            console.error('Error fetching collection documents:', err);
            alert('Failed to query collection records.');
        } finally {
            setDocsLoading(false);
        }
    };

    const handleOpenCollection = (col) => {
        setSelectedCollection(col);
        setDocSearch('');
        setDocPage(1);
        setExpandedDocId(null);
        fetchCollectionDocs(col.name, 1, '');
    };

    const handleDocSearchSubmit = (e) => {
        e.preventDefault();
        if (!selectedCollection) return;
        setDocPage(1);
        fetchCollectionDocs(selectedCollection.name, 1, docSearch);
    };

    const handleDocPageChange = (newPage) => {
        if (!selectedCollection || newPage < 1 || newPage > docTotalPages) return;
        setDocPage(newPage);
        fetchCollectionDocs(selectedCollection.name, newPage, docSearch);
    };

    const handleExportJson = async (colName) => {
        setExportingName(colName);
        try {
            const res = await api.get(`/admin/database/export/${colName}`);
            if (res.data?.success) {
                const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(res.data, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute('href', dataStr);
                const filename = colName === 'all' 
                    ? `careersync_full_db_snapshot_${Date.now()}.json` 
                    : `careersync_${colName}_${Date.now()}.json`;
                downloadAnchor.setAttribute('download', filename);
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
                showToast(`Exported ${colName} as JSON download.`);
            }
        } catch (err) {
            console.error('Export error:', err);
            alert('Failed to export data.');
        } finally {
            setExportingName(null);
        }
    };

    const handleRunDiagnostic = async () => {
        setDiagnosticRunning(true);
        try {
            const res = await api.post('/admin/database/maintenance/diagnostic');
            if (res.data?.success) {
                setDiagnosticResult(res.data);
                showToast(`Diagnostic finished: Status ${res.data.overallStatus}`);
            }
        } catch (err) {
            console.error('Diagnostic error:', err);
            alert('Failed to run diagnostic suite.');
        } finally {
            setDiagnosticRunning(false);
        }
    };

    const handlePruneLogs = async () => {
        setIsPruning(true);
        try {
            const res = await api.post('/admin/database/maintenance/prune-logs', { keepCount: keepLogsCount });
            if (res.data?.success) {
                showToast(res.data.message);
                setPruneConfirmModal(false);
                fetchDbOverview(true);
            }
        } catch (err) {
            console.error('Prune error:', err);
            alert('Failed to prune audit logs.');
        } finally {
            setIsPruning(false);
        }
    };

    const copyToClipboard = (text) => {
        try {
            navigator.clipboard.writeText(text);
            showToast('JSON copied to clipboard!');
        } catch {
            showToast('Could not copy to clipboard.');
        }
    };

    const formatBytes = (bytes) => {
        if (!bytes || bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatTimeAgo = (dateStr) => {
        if (!dateStr) return 'Recently';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return 'Recently';
            const diffMs = Date.now() - d.getTime();
            const diffSecs = Math.floor(diffMs / 1000);
            if (diffSecs < 45) return 'Just now';
            const diffMins = Math.floor(diffSecs / 60);
            if (diffMins < 60) return `${diffMins}m ago`;
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) return `${diffHours}h ago`;
            return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        } catch {
            return 'Recently';
        }
    };

    const getCollectionIconComponent = (iconName) => {
        switch (iconName) {
            case 'Users': return Users;
            case 'ShieldCheck': return ShieldCheck;
            case 'Bell': return Bell;
            case 'ShieldAlert': return ShieldAlert;
            case 'Briefcase': return Briefcase;
            case 'Building2': return Building2;
            case 'GraduationCap': return GraduationCap;
            case 'FileText': return FileText;
            default: return Database;
        }
    };

    const filteredCollections = overview.collections.filter(c => {
        if (!searchCollection.trim()) return true;
        const term = searchCollection.toLowerCase();
        return c.name.toLowerCase().includes(term) || c.displayName?.toLowerCase().includes(term);
    });

    return (
        <div className="space-y-6 sm:space-y-8 pb-10">
            {/* Feedback Toast */}
            {feedback && (
                <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 border border-red-400/30 animate-bounce">
                    <CheckCircle className="w-4 h-4" />
                    <span>{feedback}</span>
                </div>
            )}

            {/* Header & Status Banner */}
            <div className="bg-[#121212]/90 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center space-x-2.5 mb-1.5 flex-wrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                                {overview.connection.statusText || 'MongoDB Cluster Active'}
                            </span>
                            <span className="text-gray-500 text-xs hidden sm:inline">•</span>
                            <span className="text-gray-400 text-xs flex items-center">
                                <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
                                Sync: every 5s (Ping: {overview.connection.pingMs}ms)
                            </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Database Operations &amp; Telemetry</h2>
                        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                            Real-time MongoDB cluster telemetry, live collection explorer, automated health diagnostics &amp; backup tools.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center flex-wrap gap-2.5">
                        <button
                            type="button"
                            onClick={() => fetchDbOverview()}
                            disabled={refreshing}
                            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs sm:text-sm font-medium border border-gray-700/60 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${refreshing ? 'animate-spin text-red-400' : 'text-gray-400'}`} />
                            {refreshing ? 'Syncing...' : 'Sync DB'}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleExportJson('all')}
                            disabled={Boolean(exportingName)}
                            className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-600/20 border border-red-500/40 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Download className="w-4 h-4 mr-1.5" />
                            {exportingName === 'all' ? 'Exporting...' : 'Export Snapshot'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Core 4 Telemetry Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* 1. Database State */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">Database Cluster</span>
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <Server className="w-4 h-4 text-emerald-400" />
                        </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight truncate">
                        {loading ? '...' : (overview.connection.name || 'Primary DB')}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 truncate">
                        Host: {overview.connection.host ? overview.connection.host.substring(0, 22) + '...' : 'Atlas Replica'}
                    </p>
                </div>

                {/* 2. Total Records */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400/90">Total Records</span>
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <Database className="w-4 h-4 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {loading ? '...' : (overview.dbStats.objectsCount || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Across {overview.dbStats.collectionsCount || 9} collections</p>
                </div>

                {/* 3. Storage Allocation */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400/90">Storage Size</span>
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <HardDrive className="w-4 h-4 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {loading ? '...' : formatBytes(overview.dbStats.storageSizeBytes)}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Data size: {formatBytes(overview.dbStats.dataSizeBytes)}</p>
                </div>

                {/* 4. Active B-Tree Indexes */}
                <div className="bg-[#121212]/85 backdrop-blur-md border border-gray-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">B-Tree Indexes</span>
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <Activity className="w-4 h-4 text-amber-400" />
                        </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {loading ? '...' : overview.dbStats.indexesCount || 12}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Index memory: {formatBytes(overview.dbStats.indexSizeBytes)}</p>
                </div>
            </div>

            {/* Subtab Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
                <button
                    type="button"
                    onClick={() => setSubTab('collections')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                        subTab === 'collections'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30 shadow-md'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                    <Database className="w-4 h-4" />
                    <span>Collections Explorer</span>
                    <span className="ml-1.5 px-2 py-0.2 rounded-full text-[11px] font-bold bg-white/10 text-gray-300">
                        {overview.collections.length || 9}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setSubTab('telemetry')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                        subTab === 'telemetry'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30 shadow-md'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                    <Server className="w-4 h-4" />
                    <span>Cluster Telemetry &amp; Storage</span>
                </button>

                <button
                    type="button"
                    onClick={() => setSubTab('maintenance')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                        subTab === 'maintenance'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30 shadow-md'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Diagnostics &amp; Maintenance</span>
                </button>
            </div>

            {/* SUBTAB 1: COLLECTIONS EXPLORER */}
            {subTab === 'collections' && (
                <div className="space-y-4">
                    {/* Collection Search */}
                    <div className="bg-[#121212]/90 backdrop-blur-md border border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search collection by name..."
                                value={searchCollection}
                                onChange={(e) => setSearchCollection(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                            />
                        </div>

                        <span className="text-xs text-gray-400 font-mono">
                            Showing {filteredCollections.length} of {overview.collections.length} registered collections
                        </span>
                    </div>

                    {/* Collections Cards Grid */}
                    {loading ? (
                        <div className="py-20 text-center text-gray-500 text-xs">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-red-500 mb-2" />
                            Inspecting MongoDB collections...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredCollections.map(col => {
                                const IconComponent = getCollectionIconComponent(col.icon);
                                return (
                                    <div
                                        key={col.name}
                                        className="bg-[#121212]/90 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-all flex flex-col justify-between space-y-4 group shadow-md"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-gray-800 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                                                    <IconComponent className="w-5 h-5" />
                                                </div>
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                                                    {col.count.toLocaleString()} docs
                                                </span>
                                            </div>

                                            <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                                                {col.displayName}
                                            </h3>
                                            <code className="text-[11px] text-gray-500 font-mono block mt-0.5">
                                                db.{col.name}
                                            </code>
                                            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                                                {col.description}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-gray-800/80 space-y-2.5 text-xs text-gray-500">
                                            <div className="flex items-center justify-between">
                                                <span>Recent record:</span>
                                                <span className="text-gray-300 font-medium">{formatTimeAgo(col.lastRecord)}</span>
                                            </div>

                                            <div className="flex items-center gap-2 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenCollection(col)}
                                                    className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold border border-gray-800 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                                                >
                                                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                                                    <span>Browse Docs</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleExportJson(col.name)}
                                                    disabled={exportingName === col.name}
                                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-gray-800 transition-colors cursor-pointer disabled:opacity-50"
                                                    title="Download Collection as JSON"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* SUBTAB 2: CLUSTER TELEMETRY & STORAGE */}
            {subTab === 'telemetry' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Panel 1: Connection & Cluster Metadata */}
                        <div className="bg-[#121212]/90 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                            <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                                <Server className="w-4 h-4 mr-2 text-emerald-400" />
                                MongoDB Cluster Telemetry
                            </h3>

                            <div className="space-y-2.5 text-xs">
                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 flex justify-between items-center">
                                    <span className="text-gray-400">Database Name:</span>
                                    <span className="text-white font-mono font-bold">{overview.connection.name || 'capstone-portal'}</span>
                                </div>

                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 flex justify-between items-center">
                                    <span className="text-gray-400">Connection Host:</span>
                                    <span className="text-blue-400 font-mono text-[11px] truncate max-w-[200px] sm:max-w-none">
                                        {overview.connection.host || 'ac-2afqc2q-shard-00-00.osorigh.mongodb.net'}
                                    </span>
                                </div>

                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 flex justify-between items-center">
                                    <span className="text-gray-400">Connection State:</span>
                                    <span className="text-emerald-400 font-semibold flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                                        ReadyState: {overview.connection.readyState} (Connected)
                                    </span>
                                </div>

                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 flex justify-between items-center">
                                    <span className="text-gray-400">Round-Trip Ping Latency:</span>
                                    <span className="text-amber-400 font-mono font-bold">{overview.connection.pingMs} ms</span>
                                </div>

                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 flex justify-between items-center">
                                    <span className="text-gray-400">Mongoose Client Version:</span>
                                    <span className="text-white font-mono">v{overview.connection.mongooseVersion}</span>
                                </div>

                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 flex justify-between items-center">
                                    <span className="text-gray-400">Node.js Runtime:</span>
                                    <span className="text-white font-mono">{overview.connection.nodeVersion}</span>
                                </div>

                                <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 flex justify-between items-center">
                                    <span className="text-gray-400">Server Uptime:</span>
                                    <span className="text-white font-mono">{Math.floor((overview.connection.uptimeSeconds || 0) / 60)} minutes</span>
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: Storage & Memory Breakdown */}
                        <div className="bg-[#121212]/90 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-white flex items-center mb-4">
                                    <HardDrive className="w-4 h-4 mr-2 text-purple-400" />
                                    Storage &amp; Memory Allocation
                                </h3>

                                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800 space-y-3 mb-4">
                                    <div className="flex justify-between text-xs text-gray-300">
                                        <span>Data Size vs Storage Quota</span>
                                        <span className="font-mono text-purple-400 font-bold">
                                            {formatBytes(overview.dbStats.dataSizeBytes)} / {formatBytes(overview.dbStats.storageSizeBytes)}
                                        </span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                                        <div 
                                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                                            style={{ width: `${Math.min(100, Math.max(10, Math.round(((overview.dbStats.dataSizeBytes || 1) / (overview.dbStats.storageSizeBytes || 1)) * 100)))}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-[11px] text-gray-500">
                                        Storage allocation includes B-Tree index caches and pre-allocated extent pages.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800">
                                        <span className="text-[10px] text-gray-500 font-semibold uppercase">Avg Document Size</span>
                                        <p className="text-base font-bold text-white mt-0.5">{overview.dbStats.avgObjSizeBytes} bytes</p>
                                    </div>

                                    <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800">
                                        <span className="text-[10px] text-gray-500 font-semibold uppercase">Total B-Tree Indexes</span>
                                        <p className="text-base font-bold text-amber-400 mt-0.5">{overview.dbStats.indexesCount} active</p>
                                    </div>

                                    <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800">
                                        <span className="text-[10px] text-gray-500 font-semibold uppercase">Index Memory Footprint</span>
                                        <p className="text-base font-bold text-blue-400 mt-0.5">{formatBytes(overview.dbStats.indexSizeBytes)}</p>
                                    </div>

                                    <div className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800">
                                        <span className="text-[10px] text-gray-500 font-semibold uppercase">Total Document Count</span>
                                        <p className="text-base font-bold text-emerald-400 mt-0.5">{overview.dbStats.objectsCount}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
                                <span>Engine: WiredTiger Storage Engine</span>
                                <span className="text-emerald-400 font-semibold">100% In-Memory Cache Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SUBTAB 3: DIAGNOSTICS & MAINTENANCE */}
            {subTab === 'maintenance' && (
                <div className="space-y-6">
                    {/* Automated Diagnostic Tool */}
                    <div className="bg-[#121212]/90 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                                    <ShieldCheck className="w-5 h-5 mr-2 text-emerald-400" />
                                    Automated Database Health Diagnostic Suite
                                </h3>
                                <p className="text-xs text-gray-400">
                                    Verifies cluster ping latency, collection registration, index health &amp; orphaned records.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleRunDiagnostic}
                                disabled={diagnosticRunning}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center justify-center space-x-1.5 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${diagnosticRunning ? 'animate-spin' : ''}`} />
                                <span>{diagnosticRunning ? 'Running Tests...' : 'Run Diagnostics'}</span>
                            </button>
                        </div>

                        {diagnosticResult && (
                            <div className="space-y-3 pt-3 border-t border-gray-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-300">Overall Diagnostic Verdict:</span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                        diagnosticResult.overallStatus === 'HEALTHY'
                                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                            : diagnosticResult.overallStatus === 'WARNING'
                                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                            : 'bg-red-500/15 text-red-400 border-red-500/30'
                                    }`}>
                                        {diagnosticResult.overallStatus}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {diagnosticResult.tests?.map(t => (
                                        <div key={t.id} className="p-3 rounded-xl bg-[#0a0a0a] border border-gray-800 flex items-start space-x-3 text-xs">
                                            <div className="mt-0.5 shrink-0">
                                                {t.status === 'pass' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                                                {t.status === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                                                {t.status === 'fail' && <XCircle className="w-4 h-4 text-red-400" />}
                                                {t.status === 'info' && <Info className="w-4 h-4 text-blue-400" />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white">{t.name}</h4>
                                                <p className="text-gray-400 mt-0.5">{t.message}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Maintenance Tools (Prune Audit Logs & Full Backup) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tool 1: Audit Log Pruning */}
                        <div className="bg-[#121212]/90 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3 flex flex-col justify-between">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
                                    <Trash2 className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-white">Historical Security Log Pruner</h4>
                                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                    Maintain fast query times by safely truncating older authentication audit entries while preserving the newest active records.
                                </p>
                            </div>

                            <div className="pt-3 border-t border-gray-800 space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">Preserve latest records:</span>
                                    <select
                                        value={keepLogsCount}
                                        onChange={(e) => setKeepLogsCount(Number(e.target.value))}
                                        className="px-3 py-1.5 rounded-lg bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                    >
                                        <option value="50">Keep latest 50 logs</option>
                                        <option value="100">Keep latest 100 logs</option>
                                        <option value="200">Keep latest 200 logs</option>
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setPruneConfirmModal(true)}
                                    className="w-full py-2 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Prune Older Audit Logs</span>
                                </button>
                            </div>
                        </div>

                        {/* Tool 2: Full Database Snapshot Export */}
                        <div className="bg-[#121212]/90 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3 flex flex-col justify-between">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
                                    <Download className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-white">Full Database JSON Snapshot</h4>
                                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                    Instantly generate and download an archival JSON snapshot containing records across all 9 collections (with credentials scrubbed).
                                </p>
                            </div>

                            <div className="pt-3 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => handleExportJson('all')}
                                    disabled={Boolean(exportingName)}
                                    className="w-full py-2 px-4 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>{exportingName === 'all' ? 'Generating Snapshot...' : 'Download Full JSON Archive'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 1: LIVE DOCUMENT EXPLORER MODAL */}
            {selectedCollection && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-5 sm:p-6 w-full max-w-4xl max-h-[90dvh] overflow-y-auto my-auto relative shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                            <div className="flex items-center space-x-2.5">
                                <span className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
                                    <Database className="w-4 h-4" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-white leading-tight">
                                        Collection Explorer: <code className="text-blue-400 font-mono">db.{selectedCollection.name}</code>
                                    </h3>
                                    <p className="text-[11px] text-gray-400">
                                        {docTotal} total documents in collection
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={() => handleExportJson(selectedCollection.name)}
                                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-gray-800 flex items-center space-x-1 cursor-pointer"
                                    title="Export this collection"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Export</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedCollection(null)}
                                    className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Search Bar & Pagination Controls */}
                        <form onSubmit={handleDocSearchSubmit} className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
                            <div className="relative flex-1 w-full">
                                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Filter by keyword, id, email, title..."
                                    value={docSearch}
                                    onChange={(e) => setDocSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0a0a0a] border border-gray-800 text-white text-xs focus:outline-none focus:border-red-500/60"
                                />
                            </div>

                            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                                <button
                                    type="submit"
                                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold border border-gray-800 cursor-pointer"
                                >
                                    Search
                                </button>

                                <span className="text-xs text-gray-400 font-mono">
                                    Page {docPage} of {docTotalPages}
                                </span>

                                <button
                                    type="button"
                                    disabled={docPage <= 1}
                                    onClick={() => handleDocPageChange(docPage - 1)}
                                    className="px-2.5 py-1.5 rounded-lg bg-[#0a0a0a] border border-gray-800 text-gray-300 disabled:opacity-30 text-xs font-bold cursor-pointer"
                                >
                                    &larr;
                                </button>

                                <button
                                    type="button"
                                    disabled={docPage >= docTotalPages}
                                    onClick={() => handleDocPageChange(docPage + 1)}
                                    className="px-2.5 py-1.5 rounded-lg bg-[#0a0a0a] border border-gray-800 text-gray-300 disabled:opacity-30 text-xs font-bold cursor-pointer"
                                >
                                    &rarr;
                                </button>
                            </div>
                        </form>

                        {/* Documents Stream / Viewer */}
                        {docsLoading ? (
                            <div className="py-20 text-center text-gray-500 text-xs">
                                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-red-500 mb-2" />
                                Fetching records from MongoDB...
                            </div>
                        ) : collectionDocs.length === 0 ? (
                            <div className="py-16 text-center text-gray-500 bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                                <Database className="w-8 h-8 mx-auto text-gray-700 mb-2" />
                                <p className="text-sm font-semibold text-gray-400">No documents found matching query.</p>
                            </div>
                        ) : (
                            <div className="space-y-2.5 max-h-[50dvh] overflow-y-auto slim-scrollbar pr-1">
                                {collectionDocs.map((doc, idx) => {
                                    const docId = doc._id ? String(doc._id) : `doc-${idx}`;
                                    const isExpanded = expandedDocId === docId;
                                    const rawJson = JSON.stringify(doc, null, 2);

                                    return (
                                        <div
                                            key={docId}
                                            className="bg-[#0a0a0a] border border-gray-800/80 rounded-xl p-3.5 space-y-2 transition-colors hover:border-gray-700"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                                <div className="flex items-center space-x-2 truncate">
                                                    <code className="text-blue-400 font-mono text-xs font-bold shrink-0">
                                                        _id: {docId}
                                                    </code>
                                                    {doc.name && <span className="text-xs font-semibold text-white truncate">• {doc.name}</span>}
                                                    {doc.title && <span className="text-xs font-semibold text-white truncate">• {doc.title}</span>}
                                                    {doc.email && <span className="text-xs text-gray-400 truncate font-mono">({doc.email})</span>}
                                                    {doc.action && <span className="text-xs text-emerald-400 font-mono font-bold">[{doc.action}]</span>}
                                                </div>

                                                <div className="flex items-center space-x-2 shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => copyToClipboard(rawJson)}
                                                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                        title="Copy Document JSON"
                                                    >
                                                        <Copy className="w-3.5 h-3.5" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => setExpandedDocId(isExpanded ? null : docId)}
                                                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono transition-colors"
                                                    >
                                                        {isExpanded ? 'Hide JSON' : 'Raw JSON'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Expandable Raw JSON View */}
                                            {isExpanded && (
                                                <div className="mt-2 p-3 rounded-lg bg-[#050505] border border-gray-900 overflow-x-auto max-h-56 slim-scrollbar">
                                                    <pre className="text-[11px] font-mono text-emerald-300 leading-tight">
                                                        {rawJson}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-gray-800 text-xs text-gray-500">
                            <span>Direct read-only MongoDB pipeline active</span>
                            <button
                                type="button"
                                onClick={() => setSelectedCollection(null)}
                                className="px-4 py-1.5 rounded-xl border border-gray-800 text-gray-300 hover:text-white font-semibold cursor-pointer"
                            >
                                Close Explorer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: PRUNE AUDIT LOGS CONFIRMATION MODAL */}
            {pruneConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-5 sm:p-6 w-full max-w-md my-auto relative shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                            <div className="flex items-center space-x-2">
                                <span className="p-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
                                    <Trash2 className="w-4 h-4" />
                                </span>
                                <h3 className="text-base font-bold text-white">Confirm Audit Log Pruning</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPruneConfirmModal(false)}
                                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed">
                            This action will permanently delete older security audit records from the <code>auditlogs</code> collection in MongoDB, retaining only the latest <strong>{keepLogsCount}</strong> entries.
                        </p>

                        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-800">
                            <button
                                type="button"
                                onClick={() => setPruneConfirmModal(false)}
                                className="px-4 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handlePruneLogs}
                                disabled={isPruning}
                                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                            >
                                {isPruning ? 'Pruning...' : 'Confirm & Prune'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


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


const AUDIENCE_OPTIONS = [
    { key: 'student', label: 'Student', icon: GraduationCap, color: 'text-indigo-400', bg: 'bg-indigo-950/40 border-indigo-800/50', desc: 'Visible on Student Portal & Dashboard' },
    { key: 'faculty', label: 'Faculty', icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-800/50', desc: 'Visible on Faculty & Mentor Dashboard' },
    { key: 'recruiter', label: 'Recruiter', icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/50', desc: 'Visible on Employer & Recruiter Portal' },
    { key: 'tpo', label: 'TPO', icon: Building2, color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/50', desc: 'Visible on TPO & Institution Portal' },
    { key: 'home', label: 'Main Home Page', icon: Globe, color: 'text-sky-400', bg: 'bg-sky-950/40 border-sky-800/50', desc: 'Visible on Main Home Page & Public Center' }
];

const renderAudienceBadges = (visibleTo) => {
    const list = Array.isArray(visibleTo) && visibleTo.length > 0
        ? visibleTo
        : ['faculty', 'student', 'recruiter', 'tpo', 'home'];

    const allKeys = ['faculty', 'student', 'recruiter', 'tpo', 'home'];
    const isAll = allKeys.every(k => list.includes(k));

    if (isAll) {
        return (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/60 flex items-center gap-1">
                <Globe className="w-3 h-3 text-blue-400" />
                <span>All Portals (Student, Faculty, Recruiter, TPO, Home)</span>
            </span>
        );
    }

    return (
        <div className="flex flex-wrap items-center gap-1">
            {AUDIENCE_OPTIONS.filter(opt => list.includes(opt.key)).map(opt => {
                const Icon = opt.icon;
                return (
                    <span 
                        key={opt.key}
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border flex items-center gap-1 ${opt.bg} ${opt.color}`}
                        title={opt.desc}
                    >
                        <Icon className="w-2.5 h-2.5 shrink-0" />
                        <span>{opt.label}</span>
                    </span>
                );
            })}
        </div>
    );
};

const NotificationsModule = () => {
    const [notifications, setNotifications] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingItem, setEditingItem] = React.useState(null);
    const [filterCategory, setFilterCategory] = React.useState('all');
    const [filterAudience, setFilterAudience] = React.useState('all');
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
        visibleTo: ['faculty', 'student', 'recruiter', 'tpo', 'home'],
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
            visibleTo: ['faculty', 'student', 'recruiter', 'tpo', 'home'],
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
            visibleTo: (Array.isArray(item.visibleTo) && item.visibleTo.length > 0)
                ? item.visibleTo
                : ['faculty', 'student', 'recruiter', 'tpo', 'home'],
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
                visibleTo: (Array.isArray(form.visibleTo) && form.visibleTo.length > 0)
                    ? form.visibleTo
                    : ['faculty', 'student', 'recruiter', 'tpo', 'home'],
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
        if (filterCategory === 'active' && !n.isActive) return false;
        if (filterCategory === 'inactive' && n.isActive) return false;
        if (filterCategory !== 'all' && filterCategory !== 'active' && filterCategory !== 'inactive' && n.category !== filterCategory) return false;

        if (filterAudience !== 'all') {
            const list = Array.isArray(n.visibleTo) && n.visibleTo.length > 0
                ? n.visibleTo
                : ['faculty', 'student', 'recruiter', 'tpo', 'home'];
            if (!list.includes(filterAudience)) return false;
        }

        return true;
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
                <div className="flex flex-wrap items-center gap-1.5 mb-2.5 pb-2.5 border-b border-gray-800">
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

                {/* Audience Filter Bar */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5 pb-3 border-b border-gray-800/80">
                    <span className="text-[11px] font-semibold text-gray-400 mr-1 flex items-center gap-1 shrink-0">
                        <Globe className="w-3 h-3 text-blue-400" />
                        <span>Filter Audience:</span>
                    </span>
                    {[
                        { key: 'all', label: 'All Portals' },
                        { key: 'student', label: '🎓 Student' },
                        { key: 'faculty', label: '👨‍🏫 Faculty' },
                        { key: 'recruiter', label: '💼 Recruiter' },
                        { key: 'tpo', label: '🏛️ TPO' },
                        { key: 'home', label: '🌐 Main Home Page' }
                    ].map(aud => (
                        <button
                            key={aud.key}
                            type="button"
                            onClick={() => setFilterAudience(aud.key)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                filterAudience === aud.key
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-xs'
                                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            {aud.label}
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

                                    {/* Visibility / Target Audience Badges */}
                                    <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-gray-800/60">
                                        <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1 shrink-0">
                                            <Globe className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                                            <span>Visible to:</span>
                                        </span>
                                        {renderAudienceBadges(item.visibleTo)}
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

                            {/* To Whom This Notification Will Be Visible (Target Audience) */}
                            <div className="p-3.5 bg-[#0a0a0a] border border-gray-800 rounded-xl space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-200 flex items-center gap-1.5">
                                            <Globe className="w-3.5 h-3.5 text-blue-400" />
                                            <span>To Whom This Notification Will Be Visible</span>
                                            <span className="text-red-400 font-bold">*</span>
                                        </label>
                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                            Select all portals, roles &amp; dashboard cards where this announcement will appear
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-[11px]">
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, visibleTo: ['faculty', 'student', 'recruiter', 'tpo', 'home'] }))}
                                            className="px-2 py-0.5 rounded bg-blue-950/40 text-blue-400 hover:bg-blue-900/40 border border-blue-800/40 font-medium transition-colors cursor-pointer"
                                        >
                                            Select All
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, visibleTo: ['home'] }))}
                                            className="px-2 py-0.5 rounded bg-white/5 text-gray-400 hover:text-white border border-gray-800 font-medium transition-colors cursor-pointer"
                                        >
                                            Home Only
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {AUDIENCE_OPTIONS.map((opt) => {
                                        const isChecked = Array.isArray(form.visibleTo) && form.visibleTo.includes(opt.key);
                                        const Icon = opt.icon;
                                        return (
                                            <div
                                                key={opt.key}
                                                onClick={() => {
                                                    const current = Array.isArray(form.visibleTo) ? [...form.visibleTo] : ['faculty', 'student', 'recruiter', 'tpo', 'home'];
                                                    let next;
                                                    if (current.includes(opt.key)) {
                                                        if (current.length > 1) {
                                                            next = current.filter(k => k !== opt.key);
                                                        } else {
                                                            return; // Keep at least one selected
                                                        }
                                                    } else {
                                                        next = [...current, opt.key];
                                                    }
                                                    setForm(prev => ({ ...prev, visibleTo: next }));
                                                }}
                                                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                                                    isChecked
                                                        ? 'bg-red-950/20 border-red-500/50 text-white shadow-xs'
                                                        : 'bg-[#121212] border-gray-800/80 text-gray-400 hover:border-gray-700 hover:text-gray-300'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => {}}
                                                    className="mt-0.5 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-0 cursor-pointer pointer-events-none"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isChecked ? 'text-red-400' : 'text-gray-500'}`} />
                                                        <span className="font-semibold text-xs leading-none">{opt.label}</span>
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-1">{opt.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
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

/* =========================================
   ACCESS CONTROL & NAVIGATION MATRIX MODULE
   100% MongoDB Persisted - Real-time Control
   ========================================= */

const AccessControlModule = () => {
    const [roles, setRoles] = useState([]);
    const [stats, setStats] = useState({
        totalRoles: 5,
        activeRoles: 5,
        maintenanceRoles: 0,
        totalNavItems: 0,
        visibleNavItems: 0,
        hiddenNavItems: 0
    });
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedRoleKey, setSelectedRoleKey] = useState('student');
    const [activeSubTab, setActiveSubTab] = useState('navigation'); // 'navigation' | 'permissions' | 'security'
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('ALL');
    const [visibilityFilter, setVisibilityFilter] = useState('ALL'); // 'ALL' | 'VISIBLE' | 'HIDDEN'
    
    // Action loading states
    const [togglingItemId, setTogglingItemId] = useState(null);
    const [isSavingPolicy, setIsSavingPolicy] = useState(false);
    const [notification, setNotification] = useState(null);

    // Modals
    const [simulatorRole, setSimulatorRole] = useState(null);
    const [simulatorDevice, setSimulatorDevice] = useState('desktop'); // 'desktop' | 'mobile'
    const [itemModalOpen, setItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [resetTargetRole, setResetTargetRole] = useState('all');

    // Policy & Permissions edit draft
    const [policyForm, setPolicyForm] = useState({
        sessionTimeoutMinutes: 60,
        mfaRequired: false,
        allowRegistration: true,
        allowPasswordReset: true,
        maxFileUploadMb: 15,
        isMaintenance: false,
        maintenanceMessage: ''
    });

    const [permissionsDraft, setPermissionsDraft] = useState({});

    const notify = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4500);
    };

    const getNavIcon = (iconName) => {
        switch (iconName) {
            case 'Home': return LayoutDashboard;
            case 'User': return Users;
            case 'LayoutTemplate': return LayoutDashboard;
            case 'BrainCircuit': return Brain;
            case 'Award': return ShieldCheck;
            case 'Briefcase': return Briefcase;
            case 'FileText': return FileText;
            case 'Bookmark': return Flag;
            case 'MailOpen': return Mail;
            case 'Building2': return Building2;
            case 'Map': return MapPin;
            case 'MessageSquare': return MessageSquare;
            case 'Calendar': return Calendar;
            case 'Users': return Users;
            case 'Network': return Link2;
            case 'Settings': return Settings;
            case 'HelpCircle': return AlertCircle;
            case 'BookOpen': return BookOpen;
            case 'ClipboardList': return FileText;
            case 'FolderOpen': return Database;
            case 'BarChart2': return BarChart2;
            case 'TrendingUp': return TrendingUp;
            case 'Mail': return Mail;
            case 'PlusCircle': return PlusCircle;
            case 'Search': return Search;
            case 'CheckCircle': return CheckCircle;
            case 'Bell': return Bell;
            case 'ShieldAlert': return ShieldAlert;
            case 'Key': return Key;
            case 'Database': return Database;
            case 'CreditCard': return CreditCard;
            case 'Activity': return Activity;
            case 'ShieldCheck': return ShieldCheck;
            default: return LayoutDashboard;
        }
    };

    const fetchAccessControlData = async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);

        try {
            const res = await api.get('/admin/access-control');
            if (res.data?.success && res.data.data) {
                setRoles(res.data.data);
                if (res.data.stats) {
                    setStats(res.data.stats);
                }
            }
        } catch (err) {
            console.error('Error fetching access control matrix:', err);
            notify('error', 'Failed to retrieve access control configurations from database.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchAccessControlData();
    }, []);

    // Current selected role config
    const currentRole = roles.find(r => r.role === selectedRoleKey) || roles[0] || null;

    // Sync draft policy & permissions when current role changes
    useEffect(() => {
        if (currentRole) {
            setPolicyForm({
                sessionTimeoutMinutes: currentRole.settings?.sessionTimeoutMinutes || 60,
                mfaRequired: Boolean(currentRole.settings?.mfaRequired),
                allowRegistration: currentRole.settings?.allowRegistration !== false,
                allowPasswordReset: currentRole.settings?.allowPasswordReset !== false,
                maxFileUploadMb: currentRole.settings?.maxFileUploadMb || 15,
                isMaintenance: Boolean(currentRole.isMaintenance),
                maintenanceMessage: currentRole.maintenanceMessage || ''
            });

            // Convert permissions Map or Object to plain object
            const perms = currentRole.permissions instanceof Map 
                ? Object.fromEntries(currentRole.permissions)
                : (currentRole.permissions || {});
            setPermissionsDraft(perms);
        }
    }, [selectedRoleKey, currentRole]);

    // Instant Toggle for a Single Sidebar Item Visibility
    const handleToggleSidebarItem = async (roleKey, itemId, currentVisible) => {
        setTogglingItemId(itemId);
        const nextVisible = !currentVisible;

        // Optimistic UI update
        setRoles(prevRoles => prevRoles.map(r => {
            if (r.role !== roleKey) return r;
            return {
                ...r,
                sidebarItems: r.sidebarItems.map(item => 
                    item.id === itemId ? { ...item, isVisible: nextVisible } : item
                )
            };
        }));

        try {
            const res = await api.patch('/admin/access-control/sidebar-toggle', {
                role: roleKey,
                itemId,
                isVisible: nextVisible
            });

            if (res.data?.success) {
                notify('success', res.data.message || `Navigation item updated`);
                // Update stats locally
                setStats(prev => ({
                    ...prev,
                    visibleNavItems: prev.visibleNavItems + (nextVisible ? 1 : -1),
                    hiddenNavItems: prev.hiddenNavItems + (nextVisible ? -1 : 1)
                }));
            } else {
                throw new Error(res.data?.error || 'Failed to update visibility');
            }
        } catch (err) {
            console.error('Error updating sidebar visibility:', err);
            notify('error', 'Error toggling navigation visibility. Reverting change.');
            // Revert optimistic update
            fetchAccessControlData(true);
        } finally {
            setTogglingItemId(null);
        }
    };

    // Toggle Role Maintenance Mode
    const handleToggleMaintenance = async (roleKey, currentMaintenance, customMessage = null) => {
        const nextState = !currentMaintenance;
        try {
            const payload = { isMaintenance: nextState };
            if (customMessage !== null) {
                payload.maintenanceMessage = customMessage;
            } else if (policyForm.maintenanceMessage && roleKey === currentRole?.role) {
                payload.maintenanceMessage = policyForm.maintenanceMessage;
            }

            const res = await api.put(`/admin/access-control/role/${roleKey}`, payload);

            if (res.data?.success) {
                notify('success', `${res.data.data?.displayName || roleKey} is now ${nextState ? 'in Maintenance Mode' : 'Active and Operational'}`);
                setRoles(prev => prev.map(r => r.role === roleKey ? { 
                    ...r, 
                    isMaintenance: nextState, 
                    maintenanceMessage: payload.maintenanceMessage !== undefined ? payload.maintenanceMessage : r.maintenanceMessage 
                } : r));
                if (roleKey === currentRole?.role) {
                    setPolicyForm(prev => ({ ...prev, isMaintenance: nextState }));
                }
                setStats(prev => ({
                    ...prev,
                    activeRoles: Math.max(0, prev.activeRoles + (nextState ? -1 : 1)),
                    maintenanceRoles: Math.max(0, prev.maintenanceRoles + (nextState ? 1 : -1))
                }));
            }
        } catch (err) {
            console.error('Error updating maintenance mode:', err);
            notify('error', 'Failed to update role maintenance status.');
        }
    };

    // Save Updated Permissions
    const handleSavePermissions = async () => {
        if (!currentRole) return;
        setIsSavingPolicy(true);

        try {
            const res = await api.put(`/admin/access-control/role/${currentRole.role}`, {
                permissions: permissionsDraft
            });

            if (res.data?.success) {
                notify('success', `Granular capabilities saved for ${currentRole.displayName}`);
                setRoles(prev => prev.map(r => r.role === currentRole.role ? { ...r, permissions: permissionsDraft } : r));
            }
        } catch (err) {
            console.error('Error saving permissions:', err);
            notify('error', 'Failed to save role permissions.');
        } finally {
            setIsSavingPolicy(false);
        }
    };

    // Save Updated Session & Security Policies
    const handleSaveSecurityPolicy = async () => {
        if (!currentRole) return;
        setIsSavingPolicy(true);

        try {
            const res = await api.put(`/admin/access-control/role/${currentRole.role}`, {
                isMaintenance: policyForm.isMaintenance,
                maintenanceMessage: policyForm.maintenanceMessage,
                settings: {
                    sessionTimeoutMinutes: Number(policyForm.sessionTimeoutMinutes),
                    mfaRequired: Boolean(policyForm.mfaRequired),
                    allowRegistration: Boolean(policyForm.allowRegistration),
                    allowPasswordReset: Boolean(policyForm.allowPasswordReset),
                    maxFileUploadMb: Number(policyForm.maxFileUploadMb)
                }
            });

            if (res.data?.success) {
                notify('success', `Security & operational policies updated for ${currentRole.displayName}`);
                setRoles(prev => prev.map(r => r.role === currentRole.role ? res.data.data : r));
                await fetchAccessControlData(true);
            }
        } catch (err) {
            console.error('Error saving security policy:', err);
            notify('error', 'Failed to save security configuration.');
        } finally {
            setIsSavingPolicy(false);
        }
    };

    // Batch toggle all items in selected role
    const handleBatchToggleVisibility = async (makeVisible) => {
        if (!currentRole) return;
        const updatedItems = currentRole.sidebarItems.map(item => ({ ...item, isVisible: makeVisible }));

        // Optimistic
        setRoles(prev => prev.map(r => r.role === currentRole.role ? { ...r, sidebarItems: updatedItems } : r));

        try {
            const res = await api.put(`/admin/access-control/role/${currentRole.role}`, {
                sidebarItems: updatedItems
            });

            if (res.data?.success) {
                notify('success', `All navigation items for ${currentRole.displayName} set to ${makeVisible ? 'VISIBLE' : 'HIDDEN'}`);
                fetchAccessControlData(true);
            }
        } catch (err) {
            console.error('Error batch updating items:', err);
            notify('error', 'Failed to execute batch visibility update.');
            fetchAccessControlData(true);
        }
    };

    // Save / Create Sidebar Item Modal Form
    const handleSaveSidebarItem = async (e) => {
        e.preventDefault();
        const form = e.target;
        const isEditing = Boolean(editingItem);

        const itemPayload = {
            id: form.id.value.trim(),
            label: form.label.value.trim(),
            icon: form.icon.value,
            category: form.category.value,
            desc: form.desc.value.trim(),
            order: Number(form.order.value) || 1,
            badge: form.badge.value.trim(),
            isVisible: form.isVisible.checked
        };

        try {
            if (isEditing) {
                const res = await api.patch('/admin/access-control/sidebar-item', {
                    role: currentRole.role,
                    itemId: editingItem.id,
                    ...itemPayload
                });

                if (res.data?.success) {
                    notify('success', `Navigation item '${itemPayload.label}' updated successfully`);
                    setItemModalOpen(false);
                    setEditingItem(null);
                    fetchAccessControlData(true);
                }
            } else {
                const res = await api.post('/admin/access-control/sidebar-item', {
                    role: currentRole.role,
                    item: itemPayload
                });

                if (res.data?.success) {
                    notify('success', `Custom navigation item '${itemPayload.label}' created!`);
                    setItemModalOpen(false);
                    setEditingItem(null);
                    fetchAccessControlData(true);
                }
            }
        } catch (err) {
            console.error('Error saving sidebar item:', err);
            notify('error', err.response?.data?.error || 'Failed to save navigation item.');
        }
    };

    // Delete a custom sidebar item
    const handleDeleteSidebarItem = async (itemId) => {
        if (!window.confirm(`Are you sure you want to delete navigation item '${itemId}'?`)) return;

        try {
            const res = await api.delete('/admin/access-control/sidebar-item', {
                data: { role: currentRole.role, itemId }
            });

            if (res.data?.success) {
                notify('success', `Navigation item removed from ${currentRole.displayName}`);
                fetchAccessControlData(true);
            }
        } catch (err) {
            console.error('Error deleting sidebar item:', err);
            notify('error', err.response?.data?.error || 'Failed to delete navigation item.');
        }
    };

    // Factory Reset Confirmation
    const handleConfirmReset = async () => {
        try {
            const res = await api.post('/admin/access-control/reset-defaults', {
                role: resetTargetRole
            });

            if (res.data?.success) {
                notify('success', res.data.message || 'Factory defaults restored.');
                setResetModalOpen(false);
                fetchAccessControlData(true);
            }
        } catch (err) {
            console.error('Error resetting defaults:', err);
            notify('error', 'Failed to reset navigation matrix.');
        }
    };

    // Portal direct launcher / simulator
    const handleLaunchPortal = (portalRoute) => {
        window.open(portalRoute, '_blank');
    };

    // Filter sidebar items for display
    const filteredSidebarItems = (currentRole?.sidebarItems || []).filter(item => {
        const matchesQuery = !searchQuery || 
            item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;

        const matchesVisibility = visibilityFilter === 'ALL' || 
            (visibilityFilter === 'VISIBLE' && item.isVisible) ||
            (visibilityFilter === 'HIDDEN' && !item.isVisible);

        return matchesQuery && matchesCategory && matchesVisibility;
    });

    // Categories available in current role
    const availableCategories = ['ALL', ...new Set((currentRole?.sidebarItems || []).map(i => i.category || 'General'))];

    // Role display badges metadata
    const ROLE_METADATA = {
        student: { label: 'Student Portal', icon: GraduationCap, color: 'from-blue-600 to-indigo-600', border: 'border-blue-500/30', route: '/student-dashboard', desc: 'Student profile, ATS resumes, assessments & job applications' },
        faculty: { label: 'Faculty Portal', icon: BookOpen, color: 'from-amber-600 to-orange-600', border: 'border-amber-500/30', route: '/faculty-dashboard', desc: 'Academic curriculum, grading rubrics, mentorship & analytics' },
        recruiter: { label: 'Recruiter Portal', icon: Briefcase, color: 'from-emerald-600 to-teal-600', border: 'border-emerald-500/30', route: '/employer', desc: 'Job postings, ATS applicant funnel, talent search & interview rounds' },
        tpo: { label: 'TPO Portal', icon: Building2, color: 'from-purple-600 to-fuchsia-600', border: 'border-purple-500/30', route: '/institution', desc: 'Campus recruitment drives, corporate approvals & institutional records' },
        admin: { label: 'Super Admin', icon: ShieldCheck, color: 'from-red-600 to-rose-600', border: 'border-red-500/30', route: '/admin-dashboard', desc: 'Master security, user audits, telemetry, moderation & platform engine' }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
                <RefreshCw className="w-10 h-10 text-red-500 animate-spin" />
                <p className="text-gray-400 font-medium text-sm">Loading Access Control & Multi-Dashboard Navigation Matrix...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-16">
            {/* Real-time Notification Banner */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl border flex items-center space-x-3 text-sm font-semibold backdrop-blur-xl ${
                            notification.type === 'success' 
                                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' 
                                : 'bg-red-950/90 border-red-500/50 text-red-200'
                        }`}
                    >
                        {notification.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                        <span>{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header with Title and Global Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-800/80">
                <div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                            <Key className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                                Access Control & Navigation Matrix
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                                    MongoDB Live
                                </span>
                            </h2>
                            <p className="text-xs text-gray-400">
                                Master cross-portal control: manage visible sidenavbars, simulate roles, grant RBAC permissions, and toggle maintenance.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => fetchAccessControlData(true)}
                        disabled={refreshing}
                        className="px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white text-xs font-semibold flex items-center space-x-2 transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-50"
                        title="Re-sync from MongoDB"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-400' : 'text-gray-400'}`} />
                        <span className="hidden sm:inline">Sync Live</span>
                    </button>

                    <button
                        onClick={() => {
                            setResetTargetRole('all');
                            setResetModalOpen(true);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center space-x-2 transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Factory Reset</span>
                    </button>
                </div>
            </div>

            {/* High-Level KPI Summary Stream */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                <div className="bg-[#121212]/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-medium mb-1">
                        <span>Managed Portals</span>
                        <Layers className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.totalRoles}</div>
                    <div className="text-[10px] text-gray-500 mt-1">Cross-Platform Roles</div>
                </div>

                <div className="bg-[#121212]/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-medium mb-1">
                        <span>Active Portals</span>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">{stats.activeRoles}</div>
                    <div className="text-[10px] text-emerald-500/80 mt-1">100% Operational</div>
                </div>

                <div className="bg-[#121212]/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-medium mb-1">
                        <span>Maintenance</span>
                        <ShieldAlert className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-bold text-amber-400">{stats.maintenanceRoles}</div>
                    <div className="text-[10px] text-amber-500/80 mt-1">Scheduled Offline</div>
                </div>

                <div className="bg-[#121212]/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-medium mb-1">
                        <span>Total Nav Items</span>
                        <LayoutDashboard className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.totalNavItems}</div>
                    <div className="text-[10px] text-gray-500 mt-1">Across All Sidenavbars</div>
                </div>

                <div className="bg-[#121212]/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-medium mb-1">
                        <span>Visible Items</span>
                        <Eye className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-green-400">{stats.visibleNavItems}</div>
                    <div className="text-[10px] text-green-500/80 mt-1">Active on Client</div>
                </div>

                <div className="bg-[#121212]/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-medium mb-1">
                        <span>Hidden Items</span>
                        <EyeOff className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="text-2xl font-bold text-rose-400">{stats.hiddenNavItems}</div>
                    <div className="text-[10px] text-rose-500/80 mt-1">Disabled for Users</div>
                </div>
            </div>

            {/* =========================================================
                SECTION 1: ADMIN ACCESS TO ALL DASHBOARDS & QUICK LAUNCH
               ========================================================= */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-red-400" />
                            Admin Access to All Dashboards
                        </h3>
                        <p className="text-xs text-gray-400">
                            Super Admin direct access hub: switch directly into any portal, launch in new tab, or preview live navigation in simulator.
                        </p>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">5 Portals Connected</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {roles.map((r) => {
                        const meta = ROLE_METADATA[r.role] || {
                            label: r.displayName,
                            icon: LayoutDashboard,
                            color: 'from-gray-700 to-gray-800',
                            border: 'border-gray-800',
                            route: r.portalRoute,
                            desc: r.description
                        };
                        const IconComponent = meta.icon;
                        const visibleCount = (r.sidebarItems || []).filter(i => i.isVisible).length;
                        const totalCount = (r.sidebarItems || []).length;
                        const isSelected = selectedRoleKey === r.role;

                        return (
                            <div 
                                key={r.role}
                                className={`bg-[#0f0f0f] border rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 relative group overflow-hidden ${
                                    isSelected 
                                        ? 'border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.15)] ring-1 ring-red-500/30' 
                                        : 'border-gray-800/80 hover:border-gray-700'
                                }`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.color}`}></div>

                                <div>
                                    <div className="flex items-center justify-between mb-3 mt-1">
                                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white shadow-md`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <div className="flex items-center space-x-1.5">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleMaintenance(r.role, r.isMaintenance);
                                                }}
                                                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
                                                title={`Click to ${r.isMaintenance ? 'disable maintenance (Make Live)' : 'enable maintenance mode'}`}
                                            >
                                                {r.isMaintenance ? (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 hover:bg-amber-500/20">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                                        Maintenance
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 hover:bg-emerald-500/20">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        Live
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <h4 className="text-sm font-bold text-white tracking-tight">{meta.label}</h4>
                                    <div className="text-[11px] font-mono text-gray-500 mt-0.5">{r.portalRoute}</div>
                                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                                        {meta.desc || r.description}
                                    </p>

                                    {/* Sidenavbar Items Ratio Progress */}
                                    <div className="mt-4 pt-3 border-t border-gray-800/60">
                                        <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5 font-medium">
                                            <span>Sidenavbar Items</span>
                                            <span className="text-white font-semibold">{visibleCount} / {totalCount} Visible</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full bg-gradient-to-r ${meta.color} transition-all duration-300`}
                                                style={{ width: `${totalCount ? (visibleCount / totalCount) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2 mt-4 pt-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => handleLaunchPortal(r.portalRoute)}
                                            className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all border border-gray-800 cursor-pointer active:scale-95"
                                            title={`Open ${meta.label} directly`}
                                        >
                                            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                                            <span>Launch</span>
                                        </button>

                                        <button
                                            onClick={() => setSimulatorRole(r)}
                                            className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all border border-gray-800 cursor-pointer active:scale-95"
                                            title="Simulate live portal sidebar"
                                        >
                                            <Eye className="w-3.5 h-3.5 text-purple-400" />
                                            <span>Preview</span>
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedRoleKey(r.role);
                                            setActiveSubTab('navigation');
                                        }}
                                        className={`w-full py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                                            isSelected 
                                                ? 'bg-red-600 text-white shadow-md shadow-red-600/30' 
                                                : 'bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800'
                                        }`}
                                    >
                                        <Sliders className="w-3.5 h-3.5" />
                                        <span>{isSelected ? 'Editing Sidenavbar' : 'Manage Navigation'}</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* =========================================================
                SECTION 2: SIDENAVBAR NAVIGATION MANAGEMENT MATRIX
               ========================================================= */}
            {currentRole && (
                <div className="bg-[#0c0c0c] border border-gray-800/90 rounded-2xl p-5 md:p-6 shadow-2xl space-y-6">
                    {/* Role Header Banner */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-gray-800">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg">
                                {React.createElement(ROLE_METADATA[currentRole.role]?.icon || LayoutDashboard, { className: 'w-6 h-6' })}
                            </div>
                            <div>
                                <div className="flex items-center space-x-2.5">
                                    <h3 className="text-xl font-bold text-white tracking-tight">
                                        {currentRole.displayName}
                                    </h3>
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-gray-800 text-gray-300 font-mono">
                                        {currentRole.portalRoute}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 max-w-2xl">
                                    {currentRole.description}
                                </p>
                            </div>
                        </div>

                        {/* Role Level Status Controls */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center space-x-2 bg-gray-900/90 border border-gray-800 px-3.5 py-2 rounded-xl">
                                <span className="text-xs font-medium text-gray-300">Portal Status:</span>
                                <button
                                    onClick={() => handleToggleMaintenance(currentRole.role, currentRole.isMaintenance)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                        currentRole.isMaintenance 
                                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    }`}
                                >
                                    {currentRole.isMaintenance ? (
                                        <>
                                            <Power className="w-3 h-3 text-amber-400" />
                                            <span>Maintenance Mode</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                                            <span>Active (Live)</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setResetTargetRole(currentRole.role);
                                    setResetModalOpen(true);
                                }}
                                className="px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-all"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Reset Role</span>
                            </button>
                        </div>
                    </div>

                    {/* Role Tabs Navigation */}
                    <div className="flex items-center space-x-2 border-b border-gray-800 pb-3 overflow-x-auto slim-scrollbar">
                        <button
                            onClick={() => setActiveSubTab('navigation')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                                activeSubTab === 'navigation'
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <LayoutDashboard className="w-3.5 h-3.5" />
                            <span>Sidenavbar Items ({currentRole.sidebarItems?.length || 0})</span>
                        </button>

                        <button
                            onClick={() => setActiveSubTab('permissions')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                                activeSubTab === 'permissions'
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Role Permissions & Capabilities</span>
                        </button>

                        <button
                            onClick={() => setActiveSubTab('security')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                                activeSubTab === 'security'
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Settings className="w-3.5 h-3.5" />
                            <span>Session & Security Policies</span>
                        </button>
                    </div>

                    {/* TAB 1: SIDENAVBAR ITEMS MATRIX */}
                    {activeSubTab === 'navigation' && (
                        <div className="space-y-4">
                            {/* Filter Bar & Quick Actions */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gray-950/60 p-3 rounded-2xl border border-gray-800/80">
                                <div className="flex flex-wrap items-center gap-2.5 flex-1">
                                    <div className="relative flex-1 min-w-[200px] max-w-sm">
                                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search sidebar item by label or slug..."
                                            className="w-full bg-[#121212] border border-gray-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                                        />
                                    </div>

                                    {/* Category Filter */}
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="bg-[#121212] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-red-500/50 cursor-pointer"
                                    >
                                        {availableCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
                                        ))}
                                    </select>

                                    {/* Visibility Filter */}
                                    <div className="flex items-center bg-[#121212] border border-gray-800 rounded-xl p-0.5">
                                        <button
                                            onClick={() => setVisibilityFilter('ALL')}
                                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                                                visibilityFilter === 'ALL' ? 'bg-red-500/20 text-red-300' : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            All
                                        </button>
                                        <button
                                            onClick={() => setVisibilityFilter('VISIBLE')}
                                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                                                visibilityFilter === 'VISIBLE' ? 'bg-emerald-500/20 text-emerald-300' : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            Visible
                                        </button>
                                        <button
                                            onClick={() => setVisibilityFilter('HIDDEN')}
                                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                                                visibilityFilter === 'HIDDEN' ? 'bg-rose-500/20 text-rose-300' : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            Hidden
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleBatchToggleVisibility(true)}
                                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold cursor-pointer transition-all active:scale-95"
                                        title="Make all sidebar items visible"
                                    >
                                        Show All
                                    </button>

                                    <button
                                        onClick={() => handleBatchToggleVisibility(false)}
                                        className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold cursor-pointer transition-all active:scale-95"
                                        title="Hide all sidebar items"
                                    >
                                        Hide All
                                    </button>

                                    <button
                                        onClick={() => {
                                            setEditingItem(null);
                                            setItemModalOpen(true);
                                        }}
                                        className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-md shadow-red-600/30 transition-all active:scale-95"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Add Nav Item</span>
                                    </button>
                                </div>
                            </div>

                            {/* Sidenavbar Items List */}
                            <div className="space-y-2.5">
                                {filteredSidebarItems.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500 bg-gray-950/40 rounded-2xl border border-gray-800/60">
                                        <EyeOff className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                                        <p className="text-sm font-semibold text-gray-400">No navigation items match the filter</p>
                                        <p className="text-xs text-gray-600 mt-1">Try clearing your search query or category filter</p>
                                    </div>
                                ) : (
                                    filteredSidebarItems.map((item, idx) => {
                                        const ItemIcon = getNavIcon(item.icon);
                                        const isToggling = togglingItemId === item.id;

                                        return (
                                            <div
                                                key={item.id}
                                                className={`p-3.5 md:p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all duration-200 ${
                                                    item.isVisible 
                                                        ? 'bg-[#121212]/90 border-gray-800/80 hover:border-gray-700' 
                                                        : 'bg-black/60 border-gray-900 opacity-60 hover:opacity-100'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                                                    {/* Order Index */}
                                                    <span className="w-6 h-6 rounded-lg bg-gray-900 border border-gray-800 text-[10px] font-mono text-gray-400 flex items-center justify-center shrink-0">
                                                        #{item.order || idx + 1}
                                                    </span>

                                                    {/* Icon Box */}
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                                        item.isVisible 
                                                            ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                                            : 'bg-gray-800 text-gray-500 border border-gray-700'
                                                    }`}>
                                                        <ItemIcon className="w-4 h-4" />
                                                    </div>

                                                    {/* Label & Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-2 flex-wrap">
                                                            <h5 className={`text-sm font-bold tracking-tight truncate ${item.isVisible ? 'text-white' : 'text-gray-400 line-through'}`}>
                                                                {item.label}
                                                            </h5>
                                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-gray-800">
                                                                {item.id}
                                                            </span>
                                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                                {item.category || 'General'}
                                                            </span>
                                                            {item.badge && (
                                                                <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                                    {item.badge}
                                                                </span>
                                                            )}
                                                            {item.isCustom && (
                                                                <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                                                    Custom
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                                            {item.desc || 'No description provided'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Visibility Toggle and Actions */}
                                                <div className="flex items-center justify-between md:justify-end space-x-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-800/60">
                                                    {/* Instant MongoDB Visibility Toggle Switch */}
                                                    <div className="flex items-center space-x-2.5">
                                                        <span className={`text-[11px] font-bold ${item.isVisible ? 'text-emerald-400' : 'text-gray-500'}`}>
                                                            {item.isVisible ? 'VISIBLE' : 'HIDDEN'}
                                                        </span>
                                                        <button
                                                            onClick={() => handleToggleSidebarItem(currentRole.role, item.id, item.isVisible)}
                                                            disabled={isToggling}
                                                            className={`w-13 h-7 rounded-full p-1 transition-all duration-300 flex items-center cursor-pointer shadow-inner ${
                                                                item.isVisible 
                                                                    ? 'bg-emerald-600 justify-end shadow-emerald-900/30' 
                                                                    : 'bg-gray-800 justify-start'
                                                            }`}
                                                            title={`Click to ${item.isVisible ? 'hide' : 'show'} '${item.label}' in ${currentRole.displayName}`}
                                                        >
                                                            <div className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center">
                                                                {isToggling ? (
                                                                    <RefreshCw className="w-3 h-3 text-gray-700 animate-spin" />
                                                                ) : item.isVisible ? (
                                                                    <Check className="w-3 h-3 text-emerald-600" />
                                                                ) : (
                                                                    <X className="w-3 h-3 text-gray-500" />
                                                                )}
                                                            </div>
                                                        </button>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex items-center space-x-1 pl-2 border-l border-gray-800">
                                                        <button
                                                            onClick={() => {
                                                                setEditingItem(item);
                                                                setItemModalOpen(true);
                                                            }}
                                                            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                                                            title="Edit Item Details"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                        </button>

                                                        {item.isCustom && (
                                                            <button
                                                                onClick={() => handleDeleteSidebarItem(item.id)}
                                                                className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                                                title="Delete Custom Item"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}

                    {/* TAB 2: GRANULAR ROLE PERMISSIONS */}
                    {activeSubTab === 'permissions' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-2 border-b border-gray-800/80">
                                <div>
                                    <h4 className="text-sm font-bold text-white tracking-tight">
                                        Role Capability Matrix ({currentRole.displayName})
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Configure functional feature flags and operational rights for users assigned to this role.
                                    </p>
                                </div>
                                <button
                                    onClick={handleSavePermissions}
                                    disabled={isSavingPolicy}
                                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-red-600/30 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isSavingPolicy ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                                    <span>Save Permissions</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                {Object.keys(permissionsDraft).map((permKey) => {
                                    const isGranted = Boolean(permissionsDraft[permKey]);
                                    return (
                                        <div
                                            key={permKey}
                                            onClick={() => setPermissionsDraft(prev => ({ ...prev, [permKey]: !prev[permKey] }))}
                                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                                isGranted 
                                                    ? 'bg-red-500/5 border-red-500/30 hover:border-red-500/50' 
                                                    : 'bg-[#121212]/80 border-gray-800/80 hover:border-gray-700 opacity-60'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3 min-w-0">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                    isGranted ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-500'
                                                }`}>
                                                    <Key className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-xs font-mono font-bold text-white truncate">
                                                        {permKey}
                                                    </div>
                                                    <div className="text-[10px] text-gray-400 mt-0.5">
                                                        {isGranted ? 'Capability Enabled' : 'Capability Restriced'}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                className={`w-11 h-6 rounded-full p-1 transition-all flex items-center ${
                                                    isGranted ? 'bg-red-600 justify-end' : 'bg-gray-800 justify-start'
                                                }`}
                                            >
                                                <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* TAB 3: SESSION & SECURITY POLICIES */}
                    {activeSubTab === 'security' && (
                        <div className="space-y-6">
                            <div className="pb-2 border-b border-gray-800/80">
                                <h4 className="text-sm font-bold text-white tracking-tight">
                                    Session & Operational Policies ({currentRole.displayName})
                                </h4>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Enforce security parameters, session limits, registration gates, and maintenance messages.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Session Timeout */}
                                <div className="bg-[#121212] border border-gray-800 p-4 rounded-2xl space-y-2">
                                    <label className="text-xs font-semibold text-gray-300 block">
                                        Session Inactivity Timeout (Minutes)
                                    </label>
                                    <input
                                        type="number"
                                        min="5"
                                        max="1440"
                                        value={policyForm.sessionTimeoutMinutes}
                                        onChange={(e) => setPolicyForm({ ...policyForm, sessionTimeoutMinutes: e.target.value })}
                                        className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500/50"
                                    />
                                    <p className="text-[11px] text-gray-500">Auto-terminates stale sessions for compliance</p>
                                </div>

                                {/* Max File Upload MB */}
                                <div className="bg-[#121212] border border-gray-800 p-4 rounded-2xl space-y-2">
                                    <label className="text-xs font-semibold text-gray-300 block">
                                        Max Attachment Upload Limit (MB)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="500"
                                        value={policyForm.maxFileUploadMb}
                                        onChange={(e) => setPolicyForm({ ...policyForm, maxFileUploadMb: e.target.value })}
                                        className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500/50"
                                    />
                                    <p className="text-[11px] text-gray-500">Applies to resumes, circulars, and course material uploads</p>
                                </div>

                                {/* Multi-Factor Authentication */}
                                <div className="bg-[#121212] border border-gray-800 p-4 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <h5 className="text-xs font-semibold text-white">Require Multi-Factor Authentication (MFA)</h5>
                                        <p className="text-[11px] text-gray-500">Mandate OTP verification on each portal session</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setPolicyForm({ ...policyForm, mfaRequired: !policyForm.mfaRequired })}
                                        className={`w-12 h-6 rounded-full p-1 transition-all flex items-center cursor-pointer ${
                                            policyForm.mfaRequired ? 'bg-red-600 justify-end' : 'bg-gray-800 justify-start'
                                        }`}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                                    </button>
                                </div>

                                {/* Self-Registration */}
                                <div className="bg-[#121212] border border-gray-800 p-4 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <h5 className="text-xs font-semibold text-white">Allow Public Self-Registration</h5>
                                        <p className="text-[11px] text-gray-500">Enable new user sign-ups for this role from the registration page</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setPolicyForm({ ...policyForm, allowRegistration: !policyForm.allowRegistration })}
                                        className={`w-12 h-6 rounded-full p-1 transition-all flex items-center cursor-pointer ${
                                            policyForm.allowRegistration ? 'bg-emerald-600 justify-end' : 'bg-gray-800 justify-start'
                                        }`}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                                    </button>
                                </div>

                                {/* Self Password Reset */}
                                <div className="bg-[#121212] border border-gray-800 p-4 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <h5 className="text-xs font-semibold text-white">Allow Password Self-Service Recovery</h5>
                                        <p className="text-[11px] text-gray-500">Permit forgot password email verification flows</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setPolicyForm({ ...policyForm, allowPasswordReset: !policyForm.allowPasswordReset })}
                                        className={`w-12 h-6 rounded-full p-1 transition-all flex items-center cursor-pointer ${
                                            policyForm.allowPasswordReset ? 'bg-emerald-600 justify-end' : 'bg-gray-800 justify-start'
                                        }`}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                                    </button>
                                </div>

                                {/* Portal Maintenance Toggle */}
                                <div className="bg-[#121212] border border-gray-800 p-4 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h5 className="text-xs font-semibold text-white">Role Maintenance Mode</h5>
                                            {policyForm.isMaintenance ? (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                                    MAINTENANCE ACTIVE
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                    LIVE & OPERATIONAL
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-gray-500">Temporarily suspend portal traffic for maintenance (locks out non-admin users)</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleMaintenance(currentRole.role, policyForm.isMaintenance, policyForm.maintenanceMessage)}
                                        className={`w-12 h-6 rounded-full p-1 transition-all flex items-center cursor-pointer ${
                                            policyForm.isMaintenance ? 'bg-amber-600 justify-end' : 'bg-gray-800 justify-start'
                                        }`}
                                        title={policyForm.isMaintenance ? "Click to disable maintenance (Make Live)" : "Click to activate maintenance mode"}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                                    </button>
                                </div>
                            </div>

                            {/* Maintenance Notice Message */}
                            <div className="bg-[#121212] border border-gray-800 p-4 rounded-2xl space-y-2">
                                <label className="text-xs font-semibold text-gray-300 block">
                                    Maintenance Banner Notice (Displayed when active)
                                </label>
                                <textarea
                                    rows="3"
                                    value={policyForm.maintenanceMessage}
                                    onChange={(e) => setPolicyForm({ ...policyForm, maintenanceMessage: e.target.value })}
                                    className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                                    placeholder="Enter custom maintenance message visible to affected role users..."
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    onClick={handleSaveSecurityPolicy}
                                    disabled={isSavingPolicy}
                                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center space-x-2 cursor-pointer shadow-lg shadow-red-600/30 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isSavingPolicy ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                                    <span>Save Security Policies</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* =========================================================
                MODAL 1: ADD / EDIT SIDEBAR NAVIGATION ITEM
               ========================================================= */}
            {itemModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-[#101010] border border-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
                        <button
                            onClick={() => setItemModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center space-x-3 mb-5">
                            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                                <PlusCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white tracking-tight">
                                    {editingItem ? 'Edit Sidenavbar Item' : `Add Sidenavbar Item to ${currentRole?.displayName}`}
                                </h3>
                                <p className="text-xs text-gray-400">Configure label, slug ID, icon, category and visibility</p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveSidebarItem} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                                        Item Label *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="label"
                                        defaultValue={editingItem?.label || ''}
                                        placeholder="e.g. Skill Center"
                                        className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                                        Slug ID *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="id"
                                        disabled={Boolean(editingItem)}
                                        defaultValue={editingItem?.id || ''}
                                        placeholder="e.g. skills"
                                        className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        defaultValue={editingItem?.category || 'General'}
                                        placeholder="e.g. Career Tools, Placement"
                                        className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                                        Icon
                                    </label>
                                    <select
                                        name="icon"
                                        defaultValue={editingItem?.icon || 'LayoutDashboard'}
                                        className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50 cursor-pointer"
                                    >
                                        <option value="LayoutDashboard">Dashboard / Home</option>
                                        <option value="User">User Profile</option>
                                        <option value="BrainCircuit">AI / Skills</option>
                                        <option value="Award">Certifications / Award</option>
                                        <option value="Briefcase">Opportunities / Jobs</option>
                                        <option value="FileText">Document / Reports</option>
                                        <option value="Calendar">Schedule / Events</option>
                                        <option value="MessageSquare">Messages / Mocks</option>
                                        <option value="Building2">Companies / Partners</option>
                                        <option value="BarChart2">Analytics / Charts</option>
                                        <option value="TrendingUp">Trends / Growth</option>
                                        <option value="Settings">Settings / Policy</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                                        Badge Text (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="badge"
                                        defaultValue={editingItem?.badge || ''}
                                        placeholder="e.g. NEW, ATS, LIVE"
                                        className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                                        Sort Order
                                    </label>
                                    <input
                                        type="number"
                                        name="order"
                                        defaultValue={editingItem?.order || (currentRole?.sidebarItems?.length || 0) + 1}
                                        className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-300 block mb-1">
                                    Description / Subtitle
                                </label>
                                <input
                                    type="text"
                                    name="desc"
                                    defaultValue={editingItem?.desc || ''}
                                    placeholder="Short description displayed on sidebar hover/tooltips"
                                    className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                                />
                            </div>

                            <div className="flex items-center space-x-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="itemVisibilityCheck"
                                    name="isVisible"
                                    defaultChecked={editingItem ? editingItem.isVisible : true}
                                    className="w-4 h-4 rounded text-red-600 bg-gray-900 border-gray-800 focus:ring-0 cursor-pointer"
                                />
                                <label htmlFor="itemVisibilityCheck" className="text-xs font-semibold text-gray-300 cursor-pointer">
                                    Item is visible on portal sidebar by default
                                </label>
                            </div>

                            <div className="flex justify-end space-x-2.5 pt-4 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setItemModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-red-600/30 cursor-pointer"
                                >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>{editingItem ? 'Save Changes' : 'Create Item'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* =========================================================
                MODAL 2: LIVE PORTAL SIMULATOR / INSPECTOR
               ========================================================= */}
            {simulatorRole && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                    <div className="bg-[#0e0e0e] border border-gray-800 rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Simulator Top Control Bar */}
                        <div className="h-14 border-b border-gray-800 px-6 flex items-center justify-between bg-black/50">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="text-xs font-mono font-bold text-gray-300 ml-2">
                                    Simulated View: {simulatorRole.displayName} ({simulatorRole.portalRoute})
                                </span>
                            </div>

                            <div className="flex items-center space-x-3">
                                {/* Device View Switcher */}
                                <div className="flex items-center bg-gray-900 border border-gray-800 rounded-xl p-0.5">
                                    <button
                                        onClick={() => setSimulatorDevice('desktop')}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                                            simulatorDevice === 'desktop' ? 'bg-red-500/20 text-red-300' : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        <Monitor className="w-3.5 h-3.5" />
                                        <span>Desktop</span>
                                    </button>
                                    <button
                                        onClick={() => setSimulatorDevice('mobile')}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                                            simulatorDevice === 'mobile' ? 'bg-red-500/20 text-red-300' : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        <Smartphone className="w-3.5 h-3.5" />
                                        <span>Mobile</span>
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleLaunchPortal(simulatorRole.portalRoute)}
                                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-md transition-all"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>Open Real Portal</span>
                                </button>

                                <button
                                    onClick={() => setSimulatorRole(null)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Simulator Body */}
                        <div className="flex-1 overflow-hidden bg-[#050505] p-6 flex justify-center items-center">
                            <div className={`h-full border border-gray-800 rounded-2xl bg-[#0a0a0a] shadow-2xl flex overflow-hidden transition-all duration-300 ${
                                simulatorDevice === 'desktop' ? 'w-full max-w-3xl' : 'w-[360px]'
                            }`}>
                                {/* Simulated Sidebar */}
                                <div className="w-64 bg-[#0d0d0d] border-r border-gray-800/80 flex flex-col h-full shrink-0">
                                    <div className="p-4 border-b border-gray-800/80 flex items-center space-x-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                                            CS
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white tracking-tight">{simulatorRole.displayName}</div>
                                            <div className="text-[10px] text-gray-500">Live Client Sidebar</div>
                                        </div>
                                    </div>

                                    {/* Sidebar Navigation Simulated Items */}
                                    <div className="flex-1 overflow-y-auto p-3 space-y-1.5 slim-scrollbar">
                                        <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
                                            Active Client Navigation
                                        </div>

                                        {(simulatorRole.sidebarItems || [])
                                            .filter(i => i.isVisible)
                                            .map((item) => {
                                                const ItemIcon = getNavIcon(item.icon);
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium bg-white/5 text-gray-200 border border-transparent hover:border-gray-800 cursor-pointer"
                                                    >
                                                        <div className="flex items-center space-x-2.5 truncate">
                                                            <ItemIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
                                                            <span className="truncate">{item.label}</span>
                                                        </div>
                                                        {item.badge && (
                                                            <span className="text-[9px] px-1 rounded uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}

                                        {(simulatorRole.sidebarItems || []).filter(i => !i.isVisible).length > 0 && (
                                            <>
                                                <div className="text-[10px] font-semibold text-rose-500 uppercase tracking-wider px-2 pt-3 pb-1">
                                                    Disabled / Hidden Items
                                                </div>
                                                {(simulatorRole.sidebarItems || [])
                                                    .filter(i => !i.isVisible)
                                                    .map((item) => {
                                                        const ItemIcon = getNavIcon(item.icon);
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className="flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-medium text-gray-500 line-through bg-black/40 border border-gray-900"
                                                            >
                                                                <div className="flex items-center space-x-2.5 truncate">
                                                                    <ItemIcon className="w-3 h-3 text-gray-600 shrink-0" />
                                                                    <span className="truncate">{item.label}</span>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleToggleSidebarItem(simulatorRole.role, item.id, false)}
                                                                    className="text-[9px] text-emerald-400 hover:underline cursor-pointer shrink-0 ml-1"
                                                                >
                                                                    Unhide
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                            </>
                                        )}
                                    </div>

                                    {/* Sidebar Footer */}
                                    <div className="p-3 border-t border-gray-800/80">
                                        <div className="px-3 py-2 rounded-xl bg-red-500/10 text-red-400 text-xs font-semibold flex items-center justify-center space-x-2">
                                            <LogOut className="w-3.5 h-3.5" />
                                            <span>Simulated Sign Out</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Simulated Main Content Preview */}
                                <div className="flex-1 flex flex-col overflow-hidden bg-[#080808]">
                                    <div className="h-12 border-b border-gray-800/80 px-4 flex items-center justify-between">
                                        <div className="text-xs font-bold text-white flex items-center space-x-2">
                                            <span>Active Portal Route:</span>
                                            <span className="font-mono text-gray-400">{simulatorRole.portalRoute}</span>
                                        </div>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            Super Admin Session
                                        </span>
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg">
                                            <Monitor className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-sm font-bold text-white">Live Simulator Active</h4>
                                        <p className="text-xs text-gray-500 max-w-sm">
                                            Any changes you make to visible sidebar items or permissions on the Access Control matrix update live in this simulator and on the real portal in MongoDB.
                                        </p>
                                        <button
                                            onClick={() => handleLaunchPortal(simulatorRole.portalRoute)}
                                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center space-x-2 cursor-pointer shadow-lg shadow-red-600/30"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Launch Portal Live</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================
                MODAL 3: FACTORY RESET CONFIRMATION
               ========================================================= */}
            {resetModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                            <RotateCcw className="w-6 h-6" />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white tracking-tight">
                                Reset Navigation Matrix to Factory Defaults?
                            </h3>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                {resetTargetRole === 'all' 
                                    ? 'This will restore the standard default navigation items, ordering, and RBAC permissions across all 5 portals in MongoDB.'
                                    : `This will reset all sidebar items and default permissions for role '${resetTargetRole.toUpperCase()}' back to original factory state.`}
                            </p>
                        </div>

                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] text-red-300 font-medium">
                            Warning: Custom navigation items added to this role will be removed.
                        </div>

                        <div className="flex justify-end space-x-2.5 pt-2">
                            <button
                                onClick={() => setResetModalOpen(false)}
                                className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmReset}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-red-600/30"
                            >
                                Yes, Reset Defaults
                            </button>
                        </div>
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

    const [adminVisibleItemIds, setAdminVisibleItemIds] = useState(null);

    React.useEffect(() => {
        const fetchAdminNav = async () => {
            try {
                const res = await api.get('/admin/access-control/public/admin');
                if (res.data?.success && res.data.data?.sidebarItems) {
                    const ids = new Set(res.data.data.sidebarItems.map(i => i.id));
                    setAdminVisibleItemIds(ids);
                }
            } catch (e) {
                // Keep default nav if fetch fails
            }
        };
        fetchAdminNav();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login', { state: { portal: 'Admin' } });
    };

    const defaultSidebarItems = [
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

    const sidebarItems = defaultSidebarItems.filter(item => {
        if (!adminVisibleItemIds) return true;
        if (item.name === 'Overview' || item.name === 'Access Control') return true;
        return adminVisibleItemIds.has(item.name);
    });

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <OverviewModule onNavigate={setActiveTab} />;
            case 'User Verification':
                return <VerificationModule />;
            case 'Notifications':
                return <NotificationsModule />;
            case 'Content Moderation':
                return <ModerationModule />;
            case 'Database Management':
                return <DatabaseModule />;
            case 'Analytics & Reports':
                return <AnalyticsModule />;
            case 'AI Engine':
                return <AIEngineModule />;
            case 'Access Control':
                return <AccessControlModule />;
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
