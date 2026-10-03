import React from 'react';

const Mentorship = () => {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-6">
                <h2 className="text-2xl font-medium text-gray-800">Mentorship Network</h2>
                <p className="text-gray-500 text-sm">Connect with industry professionals for 1-on-1 guidance.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center font-bold text-blue-700 text-2xl mb-4">SJ</div>
                    <h3 className="text-lg font-medium text-gray-900">Sarah Jenkins</h3>
                    <p className="text-sm font-medium text-blue-600 mb-2">Senior Engineer @ Netflix</p>
                    <p className="text-xs text-gray-500 mb-4 px-2">Expertise in System Design and React Performance.</p>
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700">Request Session</button>
                </div>
            </div>
        </div>
    );
};
export default Mentorship;