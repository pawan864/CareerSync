import React from 'react';

const CompanyInsights = () => {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-medium text-gray-800">Company Insights</h2>
                    <p className="text-gray-500 text-sm">Research the top hiring companies.</p>
                </div>
                <input type="text" placeholder="Search companies..." className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center font-bold text-2xl text-gray-700 mr-4">G</div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Google</h3>
                            <p className="text-sm text-gray-500">Technology | Mountain View, CA</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-4 border-t border-gray-100 pt-4">
                        <span>100k+ Employees</span>
                        <span className="text-green-600 font-medium">Actively Hiring</span>
                    </div>
                    <button className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-100">View Open Roles</button>
                </div>
            </div>
        </div>
    );
};
export default CompanyInsights;