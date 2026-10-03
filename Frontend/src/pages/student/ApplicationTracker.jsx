import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Clock, CheckCircle, XCircle, ChevronRight, Building2, MapPin, Building
} from 'lucide-react';

const ApplicationTracker = () => {
    // Mock Data for UC-07
    
    
    const applications = [
        { id: 1, role: 'Software Engineering Intern', company: 'Google', date: '2 days ago', status: 'Applied', location: 'Remote' },
        { id: 2, role: 'Frontend Developer Intern', company: 'Vercel', date: '1 week ago', status: 'Shortlisted', location: 'Hybrid' },
        { id: 3, role: 'Data Scientist', company: 'Amazon', date: '2 weeks ago', status: 'Interview', location: 'New York, NY' },
        { id: 4, role: 'Full Stack Developer', company: 'Microsoft', date: '1 month ago', status: 'Selected', location: 'Seattle, WA' },
        { id: 5, role: 'Backend Engineer', company: 'Netflix', date: '1 month ago', status: 'Not Selected', location: 'Los Gatos, CA' },
    ];

    const [realApps, setRealApps] = useState([]);


    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await api.get('/opportunities/my-applications');
                if (res.data.success) {
                    setRealApps(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchApps();
    }, []);

    const displayApps = realApps.length > 0 ? realApps : applications;

    

    const stages = ['Applied', 'Shortlisted', 'Interview', 'Selected'];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Applied': return 'text-blue-400 bg-blue-900/20 border-blue-900/50';
            case 'Shortlisted': return 'text-purple-400 bg-purple-900/20 border-purple-900/50';
            case 'Interview': return 'text-yellow-400 bg-yellow-900/20 border-yellow-900/50';
            case 'Selected': return 'text-emerald-400 bg-emerald-900/20 border-emerald-900/50';
            case 'Not Selected': return 'text-red-400 bg-red-900/20 border-red-900/50';
            default: return 'text-gray-600 bg-gray-900/20 border-blue-100';
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="mb-8">
                <h2 className="text-3xl font-medium text-gray-800 mb-2">Application Tracker</h2>
                <p className="text-gray-600 text-sm">Monitor the real-time status of your internship and placement applications.</p>
            </div>

            <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-blue-100 text-gray-500 text-xs font-medium">
                                <th className="pb-4 font-medium pl-4">Company & Role</th>
                                <th className="pb-4 font-medium">Applied Date</th>
                                <th className="pb-4 font-medium">Location</th>
                                <th className="pb-4 font-medium">Live Tracking Status</th>
                                <th className="pb-4 font-medium text-right pr-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {displayApps.map(app => (
                                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="py-5 pl-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center mr-4">
                                                
                                            </div>
                                            <div>
                                                <h4 className="text-gray-800 font-medium text-sm">{app.role}</h4>
                                                <p className="text-xs text-gray-500 font-semibold">{app.company}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 text-xs font-semibold text-gray-600 flex items-center h-full pt-8">
                                         {app.date}
                                    </td>
                                    <td className="py-5 text-xs font-semibold text-gray-600">
                                        <div className="flex items-center">
                                             {app.location}
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <div className="flex items-center w-full max-w-[300px]">
                                            {app.status === 'Not Selected' ? (
                                                <span className={`px-3 py-1 rounded border text-xs font-medium font-medium ${getStatusColor(app.status)}`}>
                                                     Not Selected
                                                </span>
                                            ) : (
                                                <div className="flex items-center w-full relative">
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-800 rounded-full z-0"></div>
                                                    
                                                    {stages.map((stage, idx) => {
                                                        const currentIdx = stages.indexOf(app.status);
                                                        const isCompleted = idx <= currentIdx;
                                                        const isCurrent = idx === currentIdx;
                                                        
                                                        return (
                                                            <div key={stage} className={`flex-1 flex justify-center relative z-10 ${idx === 0 ? 'justify-start' : idx === stages.length - 1 ? 'justify-end' : ''}`}>
                                                                <div className="relative group/tooltip">
                                                                    <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                                                                        isCompleted ? 'bg-blue-500 border-blue-500 shadow-sm' : 'bg-white border-gray-200'
                                                                    }`}></div>
                                                                    {/* Tooltip */}
                                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-gray-800 text-xs font-medium px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                                                        {stage}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                        {app.status !== 'Not Selected' && (
                                            <span className={`mt-2 inline-block px-2 py-0.5 rounded border text-xs font-medium font-medium ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-5 pr-4 text-right">
                                        <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                            
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApplicationTracker;
