import React from 'react';

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