import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
    const [footerTheme, setFooterTheme] = useState('indigo');

    useEffect(() => {
        const handleThemeChange = (e) => {
            setFooterTheme(e.detail.theme || 'indigo');
        };
        window.addEventListener('pageThemeChange', handleThemeChange);
        return () => window.removeEventListener('pageThemeChange', handleThemeChange);
    }, []);

    const footerStyles = {
        blue: {
            bg: "bg-[#f0f4f8]",
            logoBg: "from-green-500/20 to-blue-600/20",
            logoBorder: "border-blue-200",
            textDark: "text-blue-900",
            textLight: "text-blue-900/80",
            textAccent: "text-blue-500",
            iconHover: "hover:bg-blue-600",
            borderAccent: "border-blue-200"
        },
        indigo: {
            bg: "bg-[#f3f0fc]",
            logoBg: "from-purple-500/20 to-indigo-600/20",
            logoBorder: "border-indigo-200",
            textDark: "text-indigo-900",
            textLight: "text-indigo-900/80",
            textAccent: "text-indigo-500",
            iconHover: "hover:bg-indigo-600",
            borderAccent: "border-indigo-200"
        },
        orange: {
            bg: "bg-orange-50/50",
            logoBg: "from-amber-500/20 to-orange-600/20",
            logoBorder: "border-orange-200",
            textDark: "text-orange-900",
            textLight: "text-orange-900/80",
            textAccent: "text-orange-500",
            iconHover: "hover:bg-orange-600",
            borderAccent: "border-orange-200"
        }
    };

    return (
        <footer className={`py-12 mt-auto border-t border-gray-200 transition-colors duration-700 ${footerStyles[footerTheme].bg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    
                    {/* Column 1: Branding and Contact */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center mb-4">
                            <div className={`w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center mr-3 border transition-colors duration-500 ${footerStyles[footerTheme].logoBg} ${footerStyles[footerTheme].logoBorder}`}>
                                <GraduationCap className={`w-5 h-5 ${footerStyles[footerTheme].textDark}`} />
                            </div>
                            <span className="font-bold text-xl tracking-tight">
                                <span className="text-slate-800">Career</span>
                                <span className={`${footerStyles[footerTheme].textDark}`}>Sync</span>
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 font-normal leading-relaxed tracking-wide mb-4">
                            Bridging the gap between academia and industry. Join thousands of students and top-tier employers building the future of work together.
                        </p>
                        <div className={`text-xs ${footerStyles[footerTheme].textLight} space-y-1 mt-4`}>
                            <p><span className={`font-semibold ${footerStyles[footerTheme].textAccent}`}>Call:</span> +91 9876543210</p>
                            <p><span className={`font-semibold ${footerStyles[footerTheme].textAccent}`}>Email:</span> hello@careersync.network</p>
                            <p><span className={`font-semibold ${footerStyles[footerTheme].textAccent}`}>Address:</span> 123 Innovation Drive, Tech Hub, IN</p>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <a href="#" aria-label="Facebook" className={`bg-white p-2.5 rounded-lg shadow-sm ${footerStyles[footerTheme].textDark} ${footerStyles[footerTheme].iconHover} hover:text-white transition-all duration-300`}>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
                            </a>
                            <a href="#" aria-label="LinkedIn" className={`bg-white p-2.5 rounded-lg shadow-sm ${footerStyles[footerTheme].textDark} ${footerStyles[footerTheme].iconHover} hover:text-white transition-all duration-300`}>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className={`bg-white p-2.5 rounded-lg shadow-sm ${footerStyles[footerTheme].textDark} ${footerStyles[footerTheme].iconHover} hover:text-white transition-all duration-300`}>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                            <a href="#" aria-label="Twitter" className={`bg-white p-2.5 rounded-lg shadow-sm ${footerStyles[footerTheme].textDark} ${footerStyles[footerTheme].iconHover} hover:text-white transition-all duration-300`}>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Solutions */}
                    <div>
                        <h4 className={`${footerStyles[footerTheme].textDark} font-bold mb-4 underline decoration-1 underline-offset-8 inline-block`}>Solutions</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-normal leading-relaxed tracking-wide">
                            <li><Link to="/jobs" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Campus Placements</span></Link></li>
                            <li><Link to="/jobs" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Internship Drives</span></Link></li>
                            <li><Link to="/jobs" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Industry Mentorship</span></Link></li>
                            <li><Link to="/jobs" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Skill Assessments</span></Link></li>
                            <li><Link to="/jobs" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Alumni Network</span></Link></li>
                            <li><Link to="/jobs" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Corporate Training</span></Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Platform Users */}
                    <div>
                        <h4 className={`${footerStyles[footerTheme].textDark} font-bold mb-4 underline decoration-1 underline-offset-8 inline-block`}>Portals</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-normal leading-relaxed tracking-wide">
                            <li><Link to="/register" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Student Portal</span></Link></li>
                            <li><Link to="/register" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Employer Portal</span></Link></li>
                            <li><Link to="/register" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Institution TPO Portal</span></Link></li>
                            <li><Link to="/login" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Member Login</span></Link></li>
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Guest Access</span></Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Resources */}
                    <div>
                        <h4 className={`${footerStyles[footerTheme].textDark} font-bold mb-4 underline decoration-1 underline-offset-8 inline-block`}>Resources</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-normal leading-relaxed tracking-wide">
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Resume Builder</span></Link></li>
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Interview Prep</span></Link></li>
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Career Advice Blogs</span></Link></li>
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Campus Hiring Trends</span></Link></li>
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Help Center & FAQ</span></Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Legal & Policies */}
                    <div>
                        <h4 className={`${footerStyles[footerTheme].textDark} font-bold mb-4 underline decoration-1 underline-offset-8 inline-block`}>Legal</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-normal leading-relaxed tracking-wide">
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Terms & Conditions</span></Link></li>
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Privacy Policy</span></Link></li>
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Cookies Policy</span></Link></li>
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Data Security</span></Link></li>
                            <li><Link to="/" className={`group flex items-center hover:${footerStyles[footerTheme].textDark} transition-all duration-300`}><span className={`inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 ${footerStyles[footerTheme].textDark}`}>&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">Accessibility</span></Link></li>
                        </ul>
                    </div>
                </div>

                <div className={`mt-12 pt-8 border-t ${footerStyles[footerTheme].borderAccent} flex flex-col md:flex-row transition-colors duration-500 justify-between items-center text-xs ${footerStyles[footerTheme].textLight}`}>
                    <p>&copy; {new Date().getFullYear()} CareerSync Network. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 font-medium">Bridging Academia and Industry.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
