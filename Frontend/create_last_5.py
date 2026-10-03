import os

components2 = {
    'CareerPathways': '''import React from 'react';

const CareerPathways = () => {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-6">
                <h2 className="text-2xl font-medium text-gray-800">Career Pathways</h2>
                <p className="text-gray-500 text-sm">Explore structured roadmaps for your target roles.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Full Stack Developer</h3>
                    <p className="text-sm text-gray-500">12 milestones • HTML/CSS to Advanced System Design</p>
                </div>
                <div className="p-6 hover:bg-gray-50 cursor-pointer">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Data Scientist</h3>
                    <p className="text-sm text-gray-500">9 milestones • Python basics to Machine Learning Models</p>
                </div>
            </div>
        </div>
    );
};
export default CareerPathways;
''',

    'Mentorship': '''import React from 'react';

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
''',

    'AlumniNetwork': '''import React from 'react';

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
''',

    'Settings': '''import React from 'react';

const Settings = () => {
    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="mb-6">
                <h2 className="text-2xl font-medium text-gray-800">Account Settings</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                <div className="border-b border-gray-100 pb-6 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Security & Password</h3>
                    <p className="text-sm text-gray-500 mb-4">Manage your password and 2-step verification settings.</p>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50">Change Password</button>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Email Notifications</h3>
                    <p className="text-sm text-gray-500 mb-4">Control what alerts you receive in your inbox.</p>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Application Status Updates</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Settings;
''',

    'DashboardSupport': '''import React from 'react';

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
'''
}

base_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student'

for name, code in components2.items():
    with open(os.path.join(base_path, f'{name}.jsx'), 'w', encoding='utf-8') as f:
        f.write(code.strip())

