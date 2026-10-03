import React from 'react';

const SavedJobs = () => {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-6">
                <h2 className="text-2xl font-medium text-gray-800">Saved Opportunities</h2>
                <p className="text-gray-500 text-sm">Jobs and internships you have bookmarked.</p>
            </div>
            <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm flex justify-between items-center hover:border-blue-300 transition-colors">
                    <div className="flex items-start">
                        <div className="w-12 h-12 bg-blue-50 rounded text-blue-700 flex items-center justify-center font-bold text-xl mr-4">M</div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Software Engineer II</h3>
                            <p className="text-sm font-medium text-blue-600">Microsoft <span className="text-gray-400 mx-2">|</span> <span className="text-gray-500">Seattle, WA</span></p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50">Remove</button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700">Apply Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SavedJobs;