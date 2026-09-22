import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EmployerDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        type: 'Internship',
        location: '',
        workMode: 'On-site',
        stipendOrSalary: '',
        duration: '',
        skillsStr: ''
    });

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await api.get('/opportunities/company/applications');
            if (res.data.success) {
                setApplications(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching applications', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCreateOpportunity = async (e) => {
        e.preventDefault();
        
        const requiredSkills = formData.skillsStr.split(',').filter(s => s.trim() !== '').map(s => ({
            name: s.trim(),
            level: 'Intermediate' // simplified for now
        }));

        try {
            const res = await api.post('/opportunities', {
                ...formData,
                requiredSkills
            });
            if (res.data.success) {
                alert('Opportunity posted successfully!');
                setShowForm(false);
            }
        } catch (error) {
            alert('Failed to post opportunity');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    {showForm ? 'Cancel' : 'Post Opportunity'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-bold mb-4">Post a New Opportunity</h2>
                    <form onSubmit={handleCreateOpportunity} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                                    <option value="Internship">Internship</option>
                                    <option value="Placement">Placement</option>
                                    <option value="Project">Industry Project</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input required type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Work Mode</label>
                                <select name="workMode" value={formData.workMode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                                    <option value="On-site">On-site</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duration</label>
                                <input required type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 6 Months" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stipend/Salary</label>
                                <input required type="text" name="stipendOrSalary" value={formData.stipendOrSalary} onChange={handleChange} placeholder="e.g. ₹15,000/month" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Required Skills (Comma separated)</label>
                                <input type="text" name="skillsStr" value={formData.skillsStr} onChange={handleChange} placeholder="e.g. React, Node.js, SQL" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                            Submit Posting
                        </button>
                    </form>
                </div>
            )}

            <div>
                <h2 className="text-xl font-bold mb-4">Received Applications</h2>
                {loading ? <p>Loading...</p> : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {applications.map(app => (
                                <li key={app._id} className="p-4 hover:bg-gray-50">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600">{app.opportunity.title} ({app.opportunity.type})</p>
                                            <p className="text-sm text-gray-900 mt-1">Applicant ID: {app.student?._id || 'Unknown'}</p>
                                            <p className="text-xs text-gray-500">CGPA: {app.student?.academicInfo?.cgpa || 'N/A'}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Match: {app.matchScore}%
                                            </span>
                                            <p className="text-xs text-gray-500 mt-2">Status: {app.status}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {applications.length === 0 && <li className="p-4 text-gray-500">No applications received yet.</li>}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
