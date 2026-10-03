import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, Search, Filter, MapPin, DollarSign, Clock, 
    Zap, Building2, CheckCircle, ChevronDown, GraduationCap, Percent
} from 'lucide-react';

// Reusable component for UC-06: Match Score
const MatchScoreBadge = ({ score }) => {
    let color = 'text-green-500 bg-green-900/30 border-green-500/50';
    if (score < 70) color = 'text-yellow-500 bg-yellow-900/30 border-yellow-500/50';
    if (score < 40) color = 'text-red-500 bg-red-900/30 border-red-500/50';

    return (
        <div className={`flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${color}`}>
             {score}% Match
        </div>
    );
};

const OpportunityHub = () => {
    const [activeTab, setActiveTab] = useState('Internship');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data for UC-05, UC-08, UC-09
    
    
    const opportunities = [
        { id: 1, type: 'Internship', title: 'Software Engineering Intern', company: 'Google', location: 'Remote', stipend: '$5000/mo', duration: '3 months', match: 92, skills: ['Java', 'Spring Boot', 'React'] },
        { id: 2, type: 'Placement', title: 'Full Stack Developer', company: 'Microsoft', location: 'Seattle, WA', stipend: '$120k/yr', duration: 'Full-time', match: 85, skills: ['C#', '.NET', 'React', 'SQL'] },
        { id: 3, type: 'Project', title: 'AI Document Classifier', company: 'OpenAI', location: 'Remote', stipend: 'Unpaid', duration: '2 months', match: 45, skills: ['Python', 'PyTorch', 'NLP'] },
        { id: 4, type: 'Internship', title: 'Frontend Developer Intern', company: 'Vercel', location: 'Hybrid', stipend: '$4000/mo', duration: '6 months', match: 98, skills: ['React', 'Next.js', 'Tailwind'] },
        { id: 5, type: 'Placement', title: 'Data Scientist', company: 'Amazon', location: 'New York, NY', stipend: '$130k/yr', duration: 'Full-time', match: 65, skills: ['Python', 'SQL', 'Machine Learning'] },
        { id: 6, type: 'Project', title: 'Open Source UI Library', company: 'Meta', location: 'Remote', stipend: 'Grant Based', duration: '4 months', match: 78, skills: ['React', 'CSS', 'Figma'] },
    ];

    const [realOpps, setRealOpps] = useState([]);


    useEffect(() => {
        const fetchOpps = async () => {
            try {
                const res = await api.get('/opportunities');
                if (res.data.success) {
                    setRealOpps(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchOpps();
    }, []);

    // Merge real data with mock data so UI isn't empty if DB is empty
    const displayOpps = realOpps.length > 0 ? realOpps : opportunities;

    

    const filteredOpps = displayOpps.filter(o => o.type === activeTab && (o.title.toLowerCase().includes(searchQuery.toLowerCase()) || o.company.toLowerCase().includes(searchQuery.toLowerCase())));

    return (
        <div className="max-w-7xl mx-auto pb-12 flex gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
                <div className="mb-8">
                    <h2 className="text-3xl font-medium text-gray-800 mb-2 flex items-center">
                         Opportunity Hub
                    </h2>
                    <p className="text-gray-600 text-sm">Discover internships, placements, and industry projects matched to your skill profile.</p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-white p-1.5 rounded-md border border-blue-100 mb-6">
                    {['Internship', 'Placement', 'Project'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                activeTab === tab ? 'bg-blue-50 text-gray-800 shadow-md border border-gray-200' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab === 'Placement' ? 'Full-time Placements' : tab === 'Internship' ? 'Internships' : 'Industry Projects'}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    
                    <input 
                        type="text"
                        placeholder={`Search ${activeTab.toLowerCase()}s by title or company...`}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-blue-100 text-gray-800 rounded-md pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                    />
                </div>

                {/* Opportunity Feed */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredOpps.map(opp => (
                            <motion.div 
                                key={opp.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white border border-blue-100 rounded-lg p-6 hover:border-blue-500/50 transition-colors group cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full pointer-events-none group-hover:bg-blue-600/10 transition-colors"></div>
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-md flex items-center justify-center mr-4">
                                            
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium text-gray-800 group-hover:text-blue-400 transition-colors">{opp.title}</h3>
                                            <p className="text-sm font-semibold text-gray-600">{opp.company}</p>
                                        </div>
                                    </div>
                                    {/* UC-06: Match Score */}
                                    <MatchScoreBadge score={opp.match} />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                                    <div className="flex items-center text-xs font-semibold text-gray-600">
                                         {opp.location}
                                    </div>
                                    <div className="flex items-center text-xs font-semibold text-gray-600">
                                         {opp.stipend}
                                    </div>
                                    <div className="flex items-center text-xs font-semibold text-gray-600">
                                         {opp.duration}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {opp.skills.map((skill, idx) => (
                                        <span key={idx} className="bg-blue-50 border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium  ">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="border-t border-blue-100 pt-4 flex justify-end">
                                    <button className="flex items-center px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                        Apply Now 
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                        {filteredOpps.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                
                                <p className="font-semibold">No {activeTab.toLowerCase()}s found matching your criteria.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Sidebar Filters */}
            <div className="hidden lg:block w-80 space-y-6">
                <div className="bg-white border border-blue-100 rounded-lg p-6">
                    <h3 className="text-gray-800 font-medium mb-4 flex items-center">
                         Advanced Filters
                    </h3>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="block text-gray-500 text-xs font-medium font-medium mb-2">Work Mode</label>
                            <div className="space-y-2">
                                {['Remote', 'Hybrid', 'On-site'].map(mode => (
                                    <label key={mode} className="flex items-center cursor-pointer group">
                                        <input type="checkbox" className="form-checkbox bg-blue-50 border-gray-200 text-blue-500 focus:ring-blue-500 rounded rounded-sm mr-3" />
                                        <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{mode}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-blue-100 pt-5">
                            <label className="block text-gray-500 text-xs font-medium font-medium mb-2">Match Score</label>
                            <div className="space-y-2">
                                {['> 90% Match', '> 70% Match', 'All Opportunities'].map(mode => (
                                    <label key={mode} className="flex items-center cursor-pointer group">
                                        <input type="radio" name="matchFilter" className="form-radio bg-blue-50 border-gray-200 text-blue-500 focus:ring-blue-500 mr-3" />
                                        <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{mode}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg p-6 relative overflow-hidden">
                    
                    <h3 className="text-blue-400 font-medium mb-2">Pro Tip</h3>
                    <p className="text-xs text-blue-200/60 leading-relaxed">Your Match Score is calculated dynamically using AI based on your Profile Builder data. Keep your skills updated to see more relevant roles!</p>
                </div>
            </div>
        </div>
    );
};

export default OpportunityHub;
