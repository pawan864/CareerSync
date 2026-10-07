import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0a1128] text-white pt-20 pb-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
                    
                    {/* Brand & Contact Info */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-4">
                        <Link to="/" className="flex items-center space-x-3 mb-6 w-max">
                            <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-white">Career<span className="text-blue-500">Sync</span></span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 pr-4">
                            The unified campus placement infrastructure. We digitize the entire recruitment lifecycle for universities, automate skill-matching for enterprises, and accelerate careers for millions of graduates worldwide.
                        </p>
                        
                        <div className="flex flex-col space-y-3 mb-8">
                            <div className="flex items-start space-x-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                <MapPin className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                                <span>Level 4, TechPark Hub, <br/>Cyber City, Sector 24, 122002</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                <Phone className="w-5 h-5 text-slate-500 flex-shrink-0" />
                                <span>+91 1800-456-7890 (Toll Free)</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                <Mail className="w-5 h-5 text-slate-500 flex-shrink-0" />
                                <span>contact@careersync.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 1: For Students */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 lg:col-start-5">
                        <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">For Students</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/register" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Build Resume</Link></li>
                            <li><Link to="/jobs" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Browse Internships</Link></li>
                            <li><Link to="/jobs" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Full-time Roles</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Skill Assessments</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Alumni Mentorship</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Interview Prep Kit</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: For Enterprises */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">For Employers</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/register" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Post a Job</Link></li>
                            <li><Link to="/register" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Campus Drives</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Talent CRM</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Automated Screening</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Pricing Plans</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Enterprise API</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: For Universities */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">For Universities</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/register" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">TPO Dashboard</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Student Tracking</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Corporate Invites</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Placement Analytics</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Verify Credentials</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Company & Legal */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">About Us</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Careers at CareerSync</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Press & Media</Link></li>
                            <li><Link to="/support" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Help Center</Link></li>
                            <li><Link to="/support" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Contact Support</Link></li>
                            <li><Link to="/" className="text-slate-400 hover:text-blue-400 hover:underline transition-all">Security & Trust</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 my-8"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-sm text-slate-500 font-medium">
                        <p>&copy; {new Date().getFullYear()} CareerSync, Inc.</p>
                        <span className="hidden md:block text-slate-700">|</span>
                        <div className="flex space-x-6 md:space-x-4">
                            <Link to="/" className="hover:text-slate-300 transition-colors">Terms</Link>
                            <Link to="/" className="hover:text-slate-300 transition-colors">Privacy</Link>
                            <Link to="/" className="hover:text-slate-300 transition-colors">Cookies</Link>
                        </div>
                    </div>
                    
                    {/* System Status & Icons */}
                    <div className="flex items-center space-x-4">
                        <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors" title="Instagram">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors" title="Facebook">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors" title="Twitter">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors" title="LinkedIn">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a href="mailto:contact@careersync.com" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors" title="Email">
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
