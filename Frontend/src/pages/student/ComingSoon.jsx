import React from 'react';
import { Settings, Wrench } from 'lucide-react';

const ComingSoon = ({ title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
                <Wrench className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-500 max-w-md">{description}</p>
            <div className="mt-8 px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm font-medium border border-gray-200">
                Module under construction
            </div>
        </div>
    );
};

export default ComingSoon;
