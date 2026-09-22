import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SkillGap = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await api.get('/skills/roles');
                if (res.data.success) {
                    setRoles(res.data.data);
                }
            } catch (error) {
                console.error('Error fetching roles', error);
            }
        };
        fetchRoles();
    }, []);

    const handleAnalyze = async () => {
        if (!selectedRole) return;
        setLoading(true);
        try {
            const res = await api.get(`/skills/gap/${selectedRole}`);
            if (res.data.success) {
                setAnalysis(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching gap analysis', error);
            alert('Failed to fetch gap analysis. Please make sure your profile is updated.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Skill Gap Analysis</h1>
            
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-lg font-medium mb-4">Select Target Role</h3>
                <div className="flex items-center space-x-4">
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                    >
                        <option value="">-- Select a Role --</option>
                        {roles.map(role => (
                            <option key={role._id} value={role._id}>{role.title}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleAnalyze}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        {loading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </div>

            {analysis && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold text-gray-900">Match Score: {analysis.matchPercentage}%</h2>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                            <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${analysis.matchPercentage}%` }}></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
                            <h3 className="text-lg font-medium text-green-800 mb-4">Matched Skills</h3>
                            <ul className="space-y-2">
                                {analysis.analysis.matchedSkills.map((s, idx) => (
                                    <li key={idx} className="flex justify-between text-sm">
                                        <span className="font-semibold">{s.name}</span>
                                        <span className="text-gray-500">Required: {s.requiredLevel} | You: {s.currentLevel}</span>
                                    </li>
                                ))}
                                {analysis.analysis.matchedSkills.length === 0 && <p className="text-sm text-gray-500">No matched skills.</p>}
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border-t-4 border-red-500">
                            <h3 className="text-lg font-medium text-red-800 mb-4">Missing Skills</h3>
                            <ul className="space-y-2">
                                {analysis.analysis.missingSkills.map((s, idx) => (
                                    <li key={idx} className="flex justify-between text-sm">
                                        <span className="font-semibold">{s.name}</span>
                                        <span className="text-red-500">Required: {s.level}</span>
                                    </li>
                                ))}
                                {analysis.analysis.missingSkills.length === 0 && <p className="text-sm text-gray-500">No missing skills.</p>}
                            </ul>
                        </div>
                    </div>

                    {analysis.recommendations.length > 0 && (
                        <div className="bg-indigo-50 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-indigo-900 mb-4">Personalized Recommendations</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {analysis.recommendations.map((rec, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded border border-indigo-100">
                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full mb-2">
                                            {rec.type}
                                        </span>
                                        <h4 className="font-bold text-gray-900">{rec.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{rec.reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SkillGap;
