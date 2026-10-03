import React from 'react';

const CareerPathways = () => {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-6">
                <h2 className="text-2xl font-medium text-gray-800">Career Pathways</h2>
                <p className="text-gray-500 text-sm">Explore structured roadmaps for your target roles.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Full Stack Developer</h3>
                    <p className="text-sm text-gray-500">12 milestones • HTML/CSS to Advanced System Design</p>
                </div>
                <div className="p-6 hover:bg-gray-50 cursor-pointer">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Data Scientist</h3>
                    <p className="text-sm text-gray-500">9 milestones • Python basics to Machine Learning Models</p>
                </div>
            </div>
        </div>
    );
};
export default CareerPathways;