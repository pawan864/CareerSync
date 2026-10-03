import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import api from '../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/forgot-password', { email });
            setMessage(response.data.message || 'Password reset link sent to your email.');
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending password reset email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl relative z-10 p-8 sm:p-10">
                <Link to="/login" className="text-gray-400 hover:text-gray-800 flex items-center text-sm font-medium w-fit mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                </Link>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-[#0f172a] text-2xl font-bold mb-2">Forgot Password?</h2>
                    <p className="text-gray-500 text-sm">No worries, we'll send you reset instructions.</p>
                </div>

                {message ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-6 rounded-lg text-center flex flex-col items-center">
                        <CheckCircle className="w-8 h-8 mb-3 text-green-500" />
                        <p className="text-sm font-medium">{message}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1.5">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-[#f0f4f8] border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-70 flex justify-center"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
