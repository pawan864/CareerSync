import React from 'react';

const OfferLetters = () => {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-6">
                <h2 className="text-2xl font-medium text-gray-800">Offer Letters</h2>
                <p className="text-gray-500 text-sm">Manage your official employment documents.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-green-200 rounded-md p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-green-700 font-bold text-sm">Accepted</div>
                        <span className="text-xs text-gray-500 font-medium">Valid until Oct 30, 2026</span>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-1">Frontend Developer</h3>
                    <p className="text-gray-600 font-medium mb-6">Vercel Inc.</p>
                    <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50">Download PDF</button>
                </div>
            </div>
        </div>
    );
};
export default OfferLetters;