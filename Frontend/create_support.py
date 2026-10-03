import os

content = """import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'student',
        category: 'login',
        description: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', role: 'student', category: 'login', description: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-r from-white via-blue-50 to-blue-100">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-white rounded-2xl shadow-xl z-10 overflow-hidden"
            >
                <div className="bg-blue-600 p-6 text-white flex flex-col items-center text-center">
                    <MessageSquare className="w-12 h-12 mb-3 opacity-90" />
                    <h2 className="text-2xl font-bold tracking-tight">Technical Support</h2>
                    <p className="text-blue-100 mt-1 text-sm">We're here to help you resolve any issues.</p>
                </div>
                
                <div className="p-8">
                    {status === 'success' ? (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-8"
                        >
                            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ticket Submitted!</h3>
                            <p className="text-gray-600 mb-6">Your support ticket has been raised. Our technical team will review it and contact you via email shortly.</p>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Submit another ticket
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {status === 'error' && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 flex items-start">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                                    <p className="text-sm text-red-700">Failed to submit your request. Please try again.</p>
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        required 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        required 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Your Role</label>
                                    <select 
                                        name="role" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm bg-white"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="student">Student</option>
                                        <option value="faculty">Faculty</option>
                                        <option value="tpo">TPO / Institution</option>
                                        <option value="recruiter">Recruiter</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">Issue Category</label>
                                    <select 
                                        name="category" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm bg-white"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="login">Login / Authentication</option>
                                        <option value="registration">Registration Process</option>
                                        <option value="technical">Technical Glitch / Bug</option>
                                        <option value="account">Account Settings</option>
                                        <option value="other">Other Request</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Describe the Issue</label>
                                <textarea 
                                    name="description" 
                                    required 
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Please provide specific details about the problem you are facing..."
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className={`w-full flex items-center justify-center py-3 rounded-lg text-white font-medium transition-colors ${status === 'submitting' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {status === 'submitting' ? 'Submitting...' : (
                                    <>
                                        Submit Ticket <Send className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                    
                    <div className="mt-6 text-center border-t border-gray-100 pt-4">
                        <Link to="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Support;
"""

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Support.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
