import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Calendar, TrendingUp, Bell, ChevronRight } from 'lucide-react';

const DashboardHome = () => {
    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Welcome back!</h2>
                <p className="text-gray-600 text-sm">Here is your daily career progression overview.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-500 font-medium text-sm">Active Applications</span>
                        <div className="bg-blue-50 p-2 rounded-md"></div>
                    </div>
                    <span className="text-3xl font-bold text-gray-900">4</span>
                    <span className="text-xs text-green-600 mt-2 font-medium">+1 this week</span>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-500 font-medium text-sm">Profile Match Score</span>
                        <div className="bg-purple-50 p-2 rounded-md"></div>
                    </div>
                    <span className="text-3xl font-bold text-gray-900">85%</span>
                    <span className="text-xs text-gray-500 mt-2 font-medium">Top 15% of candidates</span>
                </div>

                <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-500 font-medium text-sm">Verified Skills</span>
                        <div className="bg-emerald-50 p-2 rounded-md"></div>
                    </div>
                    <span className="text-3xl font-bold text-gray-900">12</span>
                    <span className="text-xs text-emerald-600 mt-2 font-medium">2 new badges earned</span>
                </div>

                <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-500 font-medium text-sm">Upcoming Events</span>
                        <div className="bg-orange-50 p-2 rounded-md"></div>
                    </div>
                    <span className="text-3xl font-bold text-gray-900">3</span>
                    <span className="text-xs text-gray-500 mt-2 font-medium">Next: Microsoft Campus Connect</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity / Applications */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-gray-900 text-lg">Application Status</h3>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View All</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Frontend Developer Intern</h4>
                                    <p className="text-xs text-gray-500 mt-1">Vercel • Applied 2 days ago</p>
                                </div>
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs font-semibold">Shortlisted</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Software Engineering Intern</h4>
                                    <p className="text-xs text-gray-500 mt-1">Google • Applied 1 week ago</p>
                                </div>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-semibold">Under Review</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-blue-800 rounded-lg p-6 text-white shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center"> AI Career Insight</h3>
                        <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                            Based on your latest Skill Gap Analysis, you are missing <strong>System Design</strong> concepts heavily requested by top tech firms in your target location.
                        </p>
                        <button className="bg-white text-blue-700 px-4 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors flex items-center">
                            Start Recommended Course 
                        </button>
                    </div>
                </div>

                {/* Sidebar Tasks */}
                <div className="space-y-6">
                    <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-900 text-lg mb-4">Pending Tasks</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <input type="checkbox" className="mt-1 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Complete React Quiz</p>
                                    <p className="text-xs text-gray-500">Skill Center</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <input type="checkbox" className="mt-1 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Update GitHub Link</p>
                                    <p className="text-xs text-gray-500">Profile Builder</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <input type="checkbox" className="mt-1 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">RSVP for Hackathon</p>
                                    <p className="text-xs text-gray-500">Events Hub</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
