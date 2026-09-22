import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        college: '',
        department: '',
        cgpa: '',
        skills: '' // We'll input as comma-separated string for simplicity in UI, then parse to array of objects
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/profile/me');
            if (res.data.success) {
                setProfile(res.data.data);
                setFormData({
                    college: res.data.data.academicInfo?.college || '',
                    department: res.data.data.academicInfo?.department || '',
                    cgpa: res.data.data.academicInfo?.cgpa || '',
                    skills: res.data.data.skills?.map(s => `${s.name} (${s.level})`).join(', ') || ''
                });
            }
        } catch (error) {
            console.error('No profile found or error fetching', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic parsing for skills: "Java (Intermediate), Python (Advanced)"
        const parsedSkills = formData.skills.split(',').filter(s => s.trim() !== '').map(s => {
            const match = s.trim().match(/(.*)\((.*)\)/);
            if (match) {
                return { name: match[1].trim(), level: match[2].trim(), category: 'Technical' };
            }
            return { name: s.trim(), level: 'Beginner', category: 'Technical' };
        });

        const updatedProfile = {
            academicInfo: {
                college: formData.college,
                department: formData.department,
                cgpa: Number(formData.cgpa)
            },
            skills: parsedSkills
        };

        try {
            await api.post('/profile', updatedProfile);
            alert('Profile updated successfully!');
            fetchProfile();
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Failed to update profile');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Update your academic details and skills.</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">College / University</label>
                                <input
                                    type="text"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">CGPA</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="cgpa"
                                    value={formData.cgpa}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Skills (Format: SkillName (Level), ...)</label>
                                <textarea
                                    name="skills"
                                    rows="3"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="e.g. Java (Intermediate), SQL (Advanced), React (Beginner)"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
