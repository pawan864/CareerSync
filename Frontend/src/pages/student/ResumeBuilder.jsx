import React from 'react';

const ResumeBuilder = () => {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-medium text-gray-800">Resume Builder</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700">Create New Resume</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm flex flex-col items-center justify-center min-h-[250px]">
                    <div className="w-16 h-16 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400 font-bold">PDF</div>
                    <p className="text-gray-600 font-medium text-sm">Standard Tech Template</p>
                    <button className="mt-4 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 w-full">Download PDF</button>
                </div>
            </div>
        </div>
    );
};
export default ResumeBuilder;