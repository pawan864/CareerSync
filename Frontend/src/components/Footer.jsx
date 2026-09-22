import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#f3f4f8] py-12 mt-auto border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    
                    {/* Column 1: Branding and Contact */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center text-blue-600 mb-4">
                            <GraduationCap className="h-8 w-8 mr-2" />
                            <span className="font-bold text-2xl tracking-tight">
                                <span className="text-gray-900">Career</span>
                                <span className="text-blue-600">Sync</span>
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium mb-4">
                            Bridging the gap between academia and industry. Join thousands of students and top-tier employers building the future of work together.
                        </p>
                        <div className="text-xs text-gray-500 space-y-1 mt-4">
                            <p><span className="font-semibold text-blue-500">Call:</span> +91 9876543210</p>
                            <p><span className="font-semibold text-blue-500">Email:</span> hello@careersync.network</p>
                            <p><span className="font-semibold text-blue-500">Address:</span> 123 Innovation Drive, Tech Hub, IN</p>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <a href="#" aria-label="Facebook" className="bg-white p-2.5 rounded-lg shadow-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="bg-white p-2.5 rounded-lg shadow-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="bg-white p-2.5 rounded-lg shadow-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                            <a href="#" aria-label="Twitter" className="bg-white p-2.5 rounded-lg shadow-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Solutions */}
                    <div>
                        <h4 className="text-blue-600 font-semibold mb-4 border-b border-blue-200 pb-2 inline-block">Solutions</h4>
                        <ul className="space-y-3 text-sm text-gray-500 font-medium">
                            <li><Link to="/jobs" className="hover:text-blue-600 transition">Campus Placements</Link></li>
                            <li><Link to="/jobs" className="hover:text-blue-600 transition">Internship Drives</Link></li>
                            <li><Link to="/jobs" className="hover:text-blue-600 transition">Industry Mentorship</Link></li>
                            <li><Link to="/jobs" className="hover:text-blue-600 transition">Skill Assessments</Link></li>
                            <li><Link to="/jobs" className="hover:text-blue-600 transition">Alumni Network</Link></li>
                            <li><Link to="/jobs" className="hover:text-blue-600 transition">Corporate Training</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Platform Users */}
                    <div>
                        <h4 className="text-blue-600 font-semibold mb-4 border-b border-blue-200 pb-2 inline-block">Portals</h4>
                        <ul className="space-y-3 text-sm text-gray-500 font-medium">
                            <li><Link to="/register" className="hover:text-blue-600 transition">Student Portal</Link></li>
                            <li><Link to="/register" className="hover:text-blue-600 transition">Employer Portal</Link></li>
                            <li><Link to="/register" className="hover:text-blue-600 transition">Institution TPO Portal</Link></li>
                            <li><Link to="/login" className="hover:text-blue-600 transition">Member Login</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition">Guest Access</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Resources */}
                    <div>
                        <h4 className="text-blue-600 font-semibold mb-4 border-b border-blue-200 pb-2 inline-block">Resources</h4>
                        <ul className="space-y-3 text-sm text-gray-500 font-medium">
                            <li><Link to="/" className="hover:text-blue-600 transition">Resume Builder</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition">Interview Prep</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition">Career Advice Blogs</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition">Campus Hiring Trends</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition">Help Center & FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Legal & Policies */}
                    <div>
                        <h4 className="text-blue-600 font-semibold mb-4 border-b border-blue-200 pb-2 inline-block">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-500 font-medium">
                            <li><Link to="/" className="hover:text-blue-600 transition">Terms & Conditions</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition">Cookies Policy</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition">Data Security</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition">Accessibility</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} CareerSync Network. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 font-medium">Bridging Academia and Industry.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
