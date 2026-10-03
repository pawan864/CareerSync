import React from 'react';

const AlumniNetwork = () => {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-medium text-gray-800">Alumni Directory</h2>
                    <p className="text-gray-500 text-sm">Find and connect with graduates from your university.</p>
                </div>
                <input type="text" placeholder="Search alumni..." className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Alumni</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Graduation Year</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Current Company</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase text-right">Connect</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">Alex Mercer</td>
                            <td className="py-4 px-6 text-sm text-gray-600">Class of 2023</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-700">Meta</td>
                            <td className="py-4 px-6 text-sm text-right"><button className="text-blue-600 font-medium hover:underline">Message</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AlumniNetwork;