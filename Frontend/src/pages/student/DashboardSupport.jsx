import React from 'react';

const DashboardSupport = () => {
    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-medium text-gray-800">How can we help?</h2>
                <p className="text-gray-500 text-sm">Search the knowledge base or open a support ticket.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-8 text-center flex flex-col items-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2 mt-4">Technical Support</h3>
                <p className="text-gray-500 mb-6 max-w-md">Our engineering team is available 24/7 to resolve any platform bugs or account access issues.</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">Open a Ticket</button>
            </div>
        </div>
    );
};
export default DashboardSupport;