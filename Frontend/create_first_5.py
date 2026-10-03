import os

components1 = {
    'ResumeBuilder': '''import React from 'react';

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
''',

    'Certifications': '''import React from 'react';

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
''',

    'SavedJobs': '''import React from 'react';

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
''',

    'OfferLetters': '''import React from 'react';

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
''',

    'CompanyInsights': '''import React from 'react';

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
'''
}

base_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student'

for name, code in components1.items():
    with open(os.path.join(base_path, f'{name}.jsx'), 'w', encoding='utf-8') as f:
        f.write(code.strip())

