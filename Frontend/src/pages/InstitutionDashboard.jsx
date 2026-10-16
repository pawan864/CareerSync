import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Users, Briefcase, CheckCircle, TrendingUp, BarChart2, ShieldAlert, RefreshCw } from 'lucide-react';

const InstitutionDashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [maintenanceInfo, setMaintenanceInfo] = useState({ isMaintenance: false, message: '' });

    const fetchMaintenance = async () => {
        try {
            const res = await api.get('/admin/access-control/public/tpo');
            if (res.data?.success && res.data.data) {
                setMaintenanceInfo({
                    isMaintenance: Boolean(res.data.data.isMaintenance),
                    message: res.data.data.maintenanceMessage || 'TPO portal is currently undergoing scheduled maintenance.'
                });
            }
        } catch (e) {
            // fallback
        }
    };

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/analytics');
                if (res.data.success) {
                    setAnalytics(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
        fetchMaintenance();
    }, []);

    const handleDisableMaintenance = async () => {
        try {
            await api.put('/admin/access-control/role/tpo', { isMaintenance: false });
            setMaintenanceInfo(prev => ({ ...prev, isMaintenance: false }));
        } catch (err) {
            console.error('Error disabling maintenance mode:', err);
        }
    };

    if (maintenanceInfo.isMaintenance && user?.role !== 'admin') {
        return (
            <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden font-sans">
                <div className="max-w-md w-full bg-[#121212]/95 border border-amber-500/30 p-8 rounded-3xl shadow-2xl relative z-10 space-y-5 backdrop-blur-xl">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                        <ShieldAlert className="w-8 h-8 animate-bounce" />
                    </div>
                    <div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 inline-block mb-3">
                            Scheduled Maintenance
                        </span>
                        <h2 className="text-2xl font-bold text-white tracking-tight">TPO Portal Offline</h2>
                        <p className="text-xs text-gray-300 mt-3 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-gray-800">
                            {maintenanceInfo.message}
                        </p>
                    </div>
                    <div className="pt-2 flex flex-col gap-2.5">
                        <button
                            onClick={fetchMaintenance}
                            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Check Status Again</span>
                        </button>
                        <button
                            onClick={logout}
                            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs border border-gray-800 transition-all cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) return <div className="text-center mt-20">Loading Dashboard...</div>;
    if (!analytics) return <div className="text-center mt-20 text-red-500">Failed to load analytics. Access denied.</div>;

    const { overview, applicationStatus, topRequiredSkills } = analytics;

    return (
        <div>
            {maintenanceInfo.isMaintenance && (
                <div className="bg-amber-500 text-black font-semibold text-xs px-4 py-2 flex items-center justify-between z-50 shadow-md">
                    <div className="flex items-center space-x-2">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>MAINTENANCE MODE ACTIVE: Placement officers are blocked from this dashboard. (Admin bypass active)</span>
                    </div>
                    <button
                        onClick={handleDisableMaintenance}
                        className="px-3 py-1 bg-black text-white hover:bg-gray-800 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                        Disable Maintenance Now
                    </button>
                </div>
            )}
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Institution Analytics Dashboard</h1>
            
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Registered Students</p>
                        <p className="text-2xl font-bold text-gray-900">{overview.totalStudents}</p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                        <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Industry Partners</p>
                        <p className="text-2xl font-bold text-gray-900">{overview.totalCompanies}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Open Opportunities</p>
                        <p className="text-2xl font-bold text-gray-900">{overview.totalOpportunities}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Placements</p>
                        <p className="text-2xl font-bold text-gray-900">{overview.placements}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Application Pipeline */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                        <BarChart2 className="mr-2 h-5 w-5 text-gray-500" />
                        Application Pipeline
                    </h2>
                    <div className="space-y-4">
                        {Object.entries(applicationStatus).map(([status, count], idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{status}</span>
                                    <span className="text-gray-500">{count}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            status === 'Selected' ? 'bg-green-500' : 
                                            status === 'Not Selected' ? 'bg-red-500' : 'bg-indigo-500'
                                        }`} 
                                        style={{ width: `${overview.totalApplications > 0 ? (count / overview.totalApplications) * 100 : 0}%` }}>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Industry Skill Demand */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Trending Industry Skills</h2>
                    <p className="text-sm text-gray-500 mb-4">Based on current active job and internship postings.</p>
                    
                    <ul className="divide-y divide-gray-200">
                        {topRequiredSkills.map((skill, idx) => (
                            <li key={idx} className="py-3 flex justify-between items-center">
                                <span className="font-medium text-gray-900 capitalize">{skill.name}</span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                    Requested in {skill.count} roles
                                </span>
                            </li>
                        ))}
                        {topRequiredSkills.length === 0 && <li className="py-3 text-gray-500 text-sm">No skill data available yet.</li>}
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
};

export default InstitutionDashboard;
