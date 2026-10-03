import React from 'react';

const Certifications = () => {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-medium text-gray-800">My Certifications</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700">Upload Certificate</button>
            </div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Certification Name</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Issuer</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Date Earned</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">AWS Certified Solutions Architect</td>
                            <td className="py-4 px-6 text-sm text-gray-600">Amazon Web Services</td>
                            <td className="py-4 px-6 text-sm text-gray-600">Aug 2025</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Certifications;