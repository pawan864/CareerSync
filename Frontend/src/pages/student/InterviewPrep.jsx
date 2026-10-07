import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Video, FileQuestion } from 'lucide-react';

const InterviewPrep = () => {
    const modules = [
        { id: 1, title: 'Behavioral Interviews (STAR Method)', type: 'Guide', time: '15 mins', rating: 4.8 },
        { id: 2, title: 'System Design Mock', type: 'AI Simulation', time: '45 mins', rating: 4.9 },
        { id: 3, title: 'Data Structures & Algorithms', type: 'Practice Set', time: '60 mins', rating: 4.7 },
        { id: 4, title: 'React.js Technical Screening', type: 'AI Simulation', time: '30 mins', rating: 4.5 }
    ];

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-8">
                <h2 className="text-2xl font-medium text-blue-900 mb-2 flex items-center">
                     Interview Preparation Room
                </h2>
                <p className="text-gray-600 text-sm">Practice with AI mock interviews and curated technical question banks to ace your next round.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map(mod => (
                    <div key={mod.id} className="bg-white border border-blue-100 rounded-md p-5 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                {mod.type}
                            </span>
                            <span className="flex items-center text-xs font-medium text-yellow-600">
                                 {mod.rating}
                            </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{mod.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center mb-4">
                             Est. Time: {mod.time}
                        </p>
                        <button className="w-full flex justify-center items-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                             Start Practice
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterviewPrep;

