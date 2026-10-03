import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BrainCircuit, Target, BookOpen, CheckCircle, 
    PlayCircle, TrendingUp, AlertTriangle, Lightbulb
} from 'lucide-react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
    ResponsiveContainer, Tooltip, Legend
} from 'recharts';

const SkillCenter = () => {
    const [activeTab, setActiveTab] = useState('assessments');

    // Mock Data for UC-02: Skill Assessments
    const assessments = [
        { id: 1, title: 'Advanced React Patterns', domain: 'Technical', duration: '30 mins', level: 'Intermediate', completed: true, score: 85 },
        { id: 2, title: 'System Design & Architecture', domain: 'Technical', duration: '45 mins', level: 'Advanced', completed: false },
        { id: 3, title: 'Corporate Communication', domain: 'Soft Skill', duration: '20 mins', level: 'Beginner', completed: true, score: 92 },
        { id: 4, title: 'Data Structures in Python', domain: 'Technical', duration: '60 mins', level: 'Intermediate', completed: false }
    ];

    // Mock Data for UC-03: Gap Analysis
    const gapData = [
        { subject: 'React.js', student: 80, industry: 90, fullMark: 100 },
        { subject: 'System Design', student: 40, industry: 85, fullMark: 100 },
        { subject: 'Node.js', student: 75, industry: 80, fullMark: 100 },
        { subject: 'AWS / Cloud', student: 20, industry: 75, fullMark: 100 },
        { subject: 'Communication', student: 90, industry: 70, fullMark: 100 },
        { subject: 'Agile/Scrum', student: 60, industry: 80, fullMark: 100 },
    ];

    // Mock Data for UC-04: Learning Recommendations
    const recommendations = [
        { id: 1, title: 'AWS Certified Cloud Practitioner Bootcamp', type: 'Course', provider: 'Coursera', gap: 'AWS / Cloud', urgency: 'High' },
        { id: 2, title: 'Grokking the System Design Interview', type: 'Workshop', provider: 'Educative', gap: 'System Design', urgency: 'High' },
        { id: 3, title: 'Advanced Agile Practices', type: 'Certification', provider: 'Scrum.org', gap: 'Agile/Scrum', urgency: 'Medium' }
    ];

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-medium text-gray-800 mb-2">Skill Center</h2>
                    <p className="text-gray-600 text-sm">Assess your abilities, analyze industry gaps, and get targeted learning paths.</p>
                </div>
                
                <div className="flex bg-white rounded-lg p-1 border border-blue-100">
                    {['assessments', 'analysis', 'learning'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                                activeTab === tab ? 'bg-blue-600 text-gray-800 shadow-lg' : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            {tab === 'assessments' && '1. Assessments'}
                            {tab === 'analysis' && '2. Gap Analysis'}
                            {tab === 'learning' && '3. Learning Path'}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* UC-02: ASSESSMENTS */}
                    {activeTab === 'assessments' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {assessments.map(test => (
                                    <div key={test.id} className="bg-white border border-blue-100 rounded-md p-6 relative overflow-hidden group hover:border-gray-200 transition-colors">
                                        {test.completed && (
                                            <div className="absolute top-0 right-0 bg-green-900/30 text-green-400 text-xs font-medium px-3 py-1 rounded-bl-lg flex items-center">
                                                 COMPLETED (Score: {test.score}%)
                                            </div>
                                        )}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800 mb-1">{test.title}</h3>
                                                <div className="flex gap-2 mb-4">
                                                    <span className="text-xs  font-medium  text-purple-400 bg-purple-900/20 px-2 py-0.5 rounded">{test.domain}</span>
                                                    <span className="text-xs  font-medium  text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded">{test.level}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 flex items-center">
                                                     Duration: {test.duration}
                                                </p>
                                            </div>
                                            {!test.completed && (
                                                <button className="flex items-center text-sm font-medium text-gray-800 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors">
                                                     Start Test
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* UC-03: GAP ANALYSIS */}
                    {activeTab === 'analysis' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-xl flex flex-col items-center">
                                <h3 className="text-lg font-medium text-gray-800 mb-4 self-start flex items-center">
                                     Competency Radar
                                </h3>
                                <div className="w-full h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={gapData}>
                                            <PolarGrid stroke="#333" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar name="My Skills" dataKey="student" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                                            <Radar name="Industry Required" dataKey="industry" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                                            <Tooltip wrapperStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                                     Identified Skill Gaps
                                </h3>
                                {gapData.filter(d => d.industry > d.student).map((gap, idx) => {
                                    const deficit = gap.industry - gap.student;
                                    return (
                                        <div key={idx} className="bg-white border border-red-900/50 rounded-md p-5 relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-gray-800 font-medium">{gap.subject}</h4>
                                                <span className="text-xs font-medium text-red-400 bg-red-900/20 px-2 py-1 rounded">Deficit: {deficit}%</span>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
                                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${gap.student}%` }}></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 font-medium font-medium">
                                                <span>Current: {gap.student}%</span>
                                                <span>Target: {gap.industry}%</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* UC-04: LEARNING RECOMMENDATIONS */}
                    {activeTab === 'learning' && (
                        <div className="space-y-6">
                            <div className="bg-blue-900/20 border border-blue-500/30 rounded-md p-6 flex items-start">
                                
                                <div>
                                    <h3 className="text-gray-800 font-medium mb-1">AI-Powered Recommendations</h3>
                                    <p className="text-sm text-blue-200/70">Based on your recent Gap Analysis, the system has curated these targeted resources to help you reach industry standards for your desired roles.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recommendations.map(rec => (
                                    <div key={rec.id} className="bg-white border border-blue-100 rounded-md p-5 hover:border-blue-500/50 transition-colors flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs  font-medium  text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded">
                                                {rec.type}
                                            </span>
                                            {rec.urgency === 'High' && (
                                                <span className="text-xs flex items-center font-medium text-red-400">
                                                     CRITICAL GAP
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-gray-800 font-medium mb-2 flex-grow">{rec.title}</h4>
                                        <p className="text-xs text-gray-600 mb-4">Provided by: <span className="text-gray-700 font-semibold">{rec.provider}</span></p>
                                        
                                        <div className="mt-auto pt-4 border-t border-blue-100 flex justify-between items-center">
                                            <span className="text-xs text-gray-500">Targets: {rec.gap}</span>
                                            <button className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center">
                                                Enroll 
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SkillCenter;
