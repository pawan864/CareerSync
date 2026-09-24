import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
    UploadCloud, 
    Calendar, 
    Link2, 
    Lock, 
    Eye, 
    EyeOff, 
    Mail, 
    Phone, 
    ArrowRight, 
    Handshake, 
    X,
    ChevronDown,
    AlertCircle,
    CheckCircle2,
    Clock,
    ShieldCheck
} from 'lucide-react';

const CompanyRegister = () => {
    const { registerCompany } = useContext(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Form state matching reference screenshot exactly
    const [formData, setFormData] = useState({
        // 1. Company Information
        companyName: '',
        companyEmail: '',
        phoneNumber: '',
        website: '',
        logo: '',
        description: '',

        // 2. Industry Information
        industryType: '',
        companySize: '',
        companyType: '',
        foundedYear: '',
        specializations: ['AI/ML', 'Web Development'],

        // 3. Company Address
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: 'India',
        pinCode: '',

        // 4. Authorized Contact
        fullName: '',
        designation: '',
        officialEmail: '',
        contactNumber: '',

        // 5. Account Details
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const [newSpecTag, setNewSpecTag] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [activeSection, setActiveSection] = useState(1);
    const [showPendingModal, setShowPendingModal] = useState(false);
    const [registeredCompanyInfo, setRegisteredCompanyInfo] = useState(null);

    const sections = [
        { id: 1, title: 'Company Information', desc: 'Basic details about your company' },
        { id: 2, title: 'Industry & Domain', desc: 'Select industry and specializations' },
        { id: 3, title: 'Company Address', desc: 'Add your office address' },
        { id: 4, title: 'Authorized Contact', desc: 'Primary recruiter details' },
        { id: 5, title: 'Account Setup', desc: 'Create your account' }
    ];

    const indianStates = [
        'Maharashtra', 'Karnataka', 'Delhi NCR', 'Tamil Nadu', 'Telangana',
        'Gujarat', 'Uttar Pradesh', 'Haryana', 'West Bengal', 'Kerala',
        'Andhra Pradesh', 'Rajasthan', 'Punjab', 'Madhya Pradesh', 'Bihar',
        'Odisha', 'Goa', 'Chandigarh', 'Assam', 'Uttarakhand'
    ];

    const countries = [
        'India', 'United States', 'United Kingdom', 'Singapore',
        'Canada', 'Germany', 'Australia', 'United Arab Emirates', 'Japan', 'Other'
    ];

    const quickDomains = [
        'AI/ML', 'Web Development', 'Cloud & DevOps', 'Cybersecurity',
        'Data Science', 'Mobile Apps', 'FinTech', 'UI/UX Design', 'IoT', 'Blockchain'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError('Logo size exceeds 2MB limit. Please choose a smaller image.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result);
            setFormData(prev => ({ ...prev, logo: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const removeLogo = (e) => {
        e.stopPropagation();
        setLogoPreview(null);
        setFormData(prev => ({ ...prev, logo: '' }));
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const addSpecialization = (tag) => {
        const cleanTag = tag.trim();
        if (cleanTag && !formData.specializations.includes(cleanTag)) {
            setFormData(prev => ({
                ...prev,
                specializations: [...prev.specializations, cleanTag]
            }));
            setNewSpecTag('');
        }
    };

    const removeSpecialization = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            specializations: prev.specializations.filter(t => t !== tagToRemove)
        }));
    };

    const scrollToSection = (id) => {
        setActiveSection(id);
        const el = document.getElementById(`section-${id}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Validation
        if (!formData.companyName.trim()) {
            setError('Please enter your company name');
            scrollToSection(1);
            return;
        }
        if (!formData.companyEmail.trim()) {
            setError('Please enter your company email');
            scrollToSection(1);
            return;
        }
        if (!formData.phoneNumber.trim()) {
            setError('Please enter your company phone number');
            scrollToSection(1);
            return;
        }
        if (!formData.description.trim()) {
            setError('Please provide a brief company description');
            scrollToSection(1);
            return;
        }
        if (!formData.industryType) {
            setError('Please select your industry type');
            scrollToSection(2);
            return;
        }
        if (!formData.companySize) {
            setError('Please select your company size');
            scrollToSection(2);
            return;
        }
        if (!formData.companyType) {
            setError('Please select your company type');
            scrollToSection(2);
            return;
        }
        if (!formData.addressLine1.trim() || !formData.city.trim() || !formData.state || !formData.pinCode.trim()) {
            setError('Please complete the required company address fields');
            scrollToSection(3);
            return;
        }
        if (!formData.fullName.trim() || !formData.designation.trim() || !formData.officialEmail.trim() || !formData.contactNumber.trim()) {
            setError('Please fill in all authorized recruiter / contact details');
            scrollToSection(4);
            return;
        }
        if (!formData.password) {
            setError('Please enter a secure password');
            scrollToSection(5);
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            scrollToSection(5);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            scrollToSection(5);
            return;
        }
        if (!formData.agreeToTerms) {
            setError('You must agree to the Terms and Conditions and Privacy Policy to register.');
            scrollToSection(5);
            return;
        }

        setLoading(true);

        const payload = {
            companyName: formData.companyName,
            companyEmail: formData.companyEmail,
            phoneNumber: formData.phoneNumber,
            website: formData.website,
            logo: formData.logo,
            description: formData.description,
            industryType: formData.industryType,
            companySize: formData.companySize,
            companyType: formData.companyType,
            foundedYear: formData.foundedYear,
            specializations: formData.specializations,
            address: {
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                pinCode: formData.pinCode
            },
            authorizedContact: {
                fullName: formData.fullName,
                designation: formData.designation,
                officialEmail: formData.officialEmail,
                contactNumber: formData.contactNumber
            },
            password: formData.password
        };

        try {
            const res = await registerCompany(payload);
            if (res.success) {
                setRegisteredCompanyInfo({
                    companyName: formData.companyName,
                    companyEmail: formData.companyEmail,
                    fullName: formData.fullName,
                    officialEmail: formData.officialEmail,
                    industryType: formData.industryType
                });
                setShowPendingModal(true);
            } else {
                setError(res.error || 'Failed to register company. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please check your connection and details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-800">
            <div className="flex-1 flex flex-col lg:flex-row w-full">
                
                {/* ===================== LEFT SIDEBAR ===================== */}
                <div className="w-full lg:w-[400px] xl:w-[440px] bg-gradient-to-b from-[#e8f1fc] via-[#edf4fe] to-[#e4eefb] border-r border-blue-100/80 p-8 lg:p-10 flex flex-col justify-between shrink-0 relative">
                    
                    {/* Top Section */}
                    <div>
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2.5 mb-10 group">
                            <div className="flex -space-x-1.5 items-center">
                                <span className="w-4 h-4 rounded-full bg-blue-600 inline-block shadow-sm"></span>
                                <span className="w-4 h-4 rounded-full bg-blue-400 inline-block shadow-sm"></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 inline-block"></span>
                            </div>
                            <span className="font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                                Career<span className="text-blue-600">Sync</span>
                            </span>
                        </Link>

                        {/* Title & Tagline */}
                        <div className="mb-10">
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                                Partner with<br />
                                <span className="text-blue-600">Future Talent</span>
                            </h1>
                            <p className="text-slate-600 text-sm mt-3.5 leading-relaxed font-normal">
                                Register your company and connect with skilled students for jobs, internships, projects and more.
                            </p>
                        </div>

                        {/* Stepper Navigation */}
                        <div className="relative pl-2 mb-10">
                            {/* Vertical Line */}
                            <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

                            <div className="space-y-6 relative">
                                {sections.map((step) => {
                                    const isActive = activeSection === step.id;
                                    return (
                                        <button
                                            key={step.id}
                                            type="button"
                                            onClick={() => scrollToSection(step.id)}
                                            className="flex items-start text-left w-full group cursor-pointer focus:outline-none"
                                        >
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all z-10 mr-4 shadow-sm ${
                                                isActive
                                                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-105'
                                                    : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-blue-400 group-hover:text-blue-600'
                                            }`}>
                                                {step.id}
                                            </div>
                                            <div className="pt-0.5">
                                                <p className={`text-sm font-semibold transition-colors ${
                                                    isActive ? 'text-slate-900 font-bold' : 'text-slate-700 group-hover:text-blue-600'
                                                }`}>
                                                    {step.title}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Building Graphic & Floating Card */}
                    <div className="mt-8 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 group">
                        <img 
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=900&auto=format&fit=crop" 
                            alt="Corporate Skyscraper" 
                            className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent"></div>

                        {/* Floating Card exactly like reference screenshot */}
                        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/80">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                                <Handshake className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm leading-snug">
                                Build the Next Generation Workforce
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                Collaborate with universities and find the right talent for your growth.
                            </p>
                        </div>
                    </div>

                </div>

                {/* ===================== RIGHT FORM SECTION ===================== */}
                <div className="flex-1 bg-white p-6 sm:p-10 lg:p-14 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        
                        {/* Page Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                                Company Registration
                            </h2>
                            <p className="text-slate-500 text-sm mt-1.5">
                                Create your company account to post opportunities and connect with talented students.
                            </p>
                        </div>

                        {/* Status Messages */}
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start text-sm shadow-sm animate-fade-in">
                                <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5 text-red-500" />
                                <div>
                                    <p className="font-medium">Registration Error</p>
                                    <p className="text-xs text-red-600 mt-0.5">{error}</p>
                                </div>
                            </div>
                        )}

                        {successMessage && (
                            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-start text-sm shadow-sm animate-fade-in">
                                <CheckCircle2 className="w-5 h-5 mr-3 shrink-0 mt-0.5 text-green-600" />
                                <div>
                                    <p className="font-medium">{successMessage}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* SECTION 1: Company Information */}
                            <div id="section-1" className="bg-white rounded-xl border border-slate-200 p-6 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-colors">
                                <div className="flex items-center mb-6">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mr-3">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base leading-none">
                                            Company Information
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Provide basic details about your organization.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Row 1: Name & Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Company Name <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                placeholder="Enter company name"
                                                required
                                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Company Email <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="email" 
                                                name="companyEmail"
                                                value={formData.companyEmail}
                                                onChange={handleChange}
                                                placeholder="company@example.com"
                                                required
                                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Phone & Website */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600 overflow-hidden">
                                                <div className="bg-slate-50 border-r border-slate-200 px-3 flex items-center text-xs font-medium text-slate-600 space-x-1 shrink-0">
                                                    <Phone className="w-3.5 h-3.5 text-slate-400 mr-1" />
                                                    <span>+91.</span>
                                                </div>
                                                <input 
                                                    type="tel" 
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={handleChange}
                                                    placeholder="Enter phone number"
                                                    required
                                                    className="w-full px-3.5 py-2.5 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Website
                                            </label>
                                            <div className="flex rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600 overflow-hidden">
                                                <div className="bg-slate-50 border-r border-slate-200 px-3 flex items-center text-xs font-medium text-slate-600 space-x-1 shrink-0">
                                                    <Link2 className="w-3.5 h-3.5 text-slate-400 mr-1" />
                                                    <span>https://</span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    placeholder="Enter company website"
                                                    className="w-full px-3.5 py-2.5 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 3: Logo & Description */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Company Logo
                                            </label>
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                onChange={handleLogoUpload} 
                                                accept="image/png, image/jpeg, image/jpg" 
                                                className="hidden" 
                                            />
                                            <div 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="border border-dashed border-slate-300 rounded-lg p-4 h-36 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all group relative overflow-hidden bg-slate-50/50"
                                            >
                                                {logoPreview ? (
                                                    <div className="relative flex flex-col items-center justify-center w-full h-full">
                                                        <img 
                                                            src={logoPreview} 
                                                            alt="Company Logo Preview" 
                                                            className="max-h-20 max-w-[140px] object-contain rounded"
                                                        />
                                                        <button 
                                                            type="button" 
                                                            onClick={removeLogo}
                                                            className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium flex items-center"
                                                        >
                                                            <X className="w-3 h-3 mr-1" /> Remove Logo
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                                            <UploadCloud className="w-5 h-5" />
                                                        </div>
                                                        <p className="text-xs font-semibold text-slate-800">
                                                            Click to upload logo
                                                        </p>
                                                        <p className="text-[11px] text-slate-400 mt-0.5">
                                                            PNG, JPG (Max 2MB)
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-1.5">
                                                <label className="text-xs font-semibold text-slate-700">
                                                    Company Description <span className="text-red-500">*</span>
                                                </label>
                                            </div>
                                            <div className="relative">
                                                <textarea 
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    maxLength={500}
                                                    rows={5}
                                                    placeholder="Briefly describe your company, vision and what you do..."
                                                    required
                                                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors resize-none h-36"
                                                ></textarea>
                                                <span className="absolute bottom-2.5 right-3 text-[11px] text-slate-400">
                                                    {formData.description.length}/500
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: Industry Information */}
                            <div id="section-2" className="bg-white rounded-xl border border-slate-200 p-6 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-colors">
                                <div className="flex items-center mb-6">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mr-3">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base leading-none">
                                            Industry Information
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Tell us about your industry and business focus.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* 3 Selects in a Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Industry Type <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select 
                                                    name="industryType"
                                                    value={formData.industryType}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full appearance-none px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors pr-8"
                                                >
                                                    <option value="">Select industry</option>
                                                    <option value="Information Technology & Software">Information Technology & Software</option>
                                                    <option value="Financial Services & Fintech">Financial Services & Fintech</option>
                                                    <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                                                    <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                                                    <option value="Manufacturing & Engineering">Manufacturing & Engineering</option>
                                                    <option value="Education & EdTech">Education & EdTech</option>
                                                    <option value="Consulting & Business Strategy">Consulting & Business Strategy</option>
                                                    <option value="Telecommunications">Telecommunications</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Company Size <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select 
                                                    name="companySize"
                                                    value={formData.companySize}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full appearance-none px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors pr-8"
                                                >
                                                    <option value="">Select company size</option>
                                                    <option value="1-10 employees (Startup)">1-10 employees (Startup)</option>
                                                    <option value="11-50 employees">11-50 employees</option>
                                                    <option value="51-200 employees">51-200 employees</option>
                                                    <option value="201-500 employees">201-500 employees</option>
                                                    <option value="501-1000 employees">501-1000 employees</option>
                                                    <option value="1000+ employees (Enterprise)">1000+ employees (Enterprise)</option>
                                                </select>
                                                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Company Type <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select 
                                                    name="companyType"
                                                    value={formData.companyType}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full appearance-none px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors pr-8"
                                                >
                                                    <option value="">Select company type</option>
                                                    <option value="Private Limited">Private Limited</option>
                                                    <option value="Public Limited">Public Limited</option>
                                                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                                                    <option value="Partnership / LLP">Partnership / LLP</option>
                                                    <option value="Startup">Startup</option>
                                                    <option value="Non-Profit">Non-Profit</option>
                                                    <option value="Government / PSU">Government / PSU</option>
                                                </select>
                                                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Founded Year & Domains */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Founded Year
                                            </label>
                                            <div className="relative flex items-center">
                                                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                                                <input 
                                                    type="number" 
                                                    name="foundedYear"
                                                    value={formData.foundedYear}
                                                    onChange={handleChange}
                                                    min="1900" 
                                                    max="2026"
                                                    placeholder="Select year (e.g. 2018)"
                                                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Specializations / Domains <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex gap-2 mb-2">
                                                <input 
                                                    type="text" 
                                                    value={newSpecTag}
                                                    onChange={(e) => setNewSpecTag(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            addSpecialization(newSpecTag);
                                                        }
                                                    }}
                                                    placeholder="Select domains (e.g. AI/ML, Cloud)"
                                                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => addSpecialization(newSpecTag)}
                                                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg shrink-0 transition-colors"
                                                >
                                                    Add
                                                </button>
                                            </div>

                                            {/* Tag Pills */}
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {formData.specializations.map((spec) => (
                                                    <span 
                                                        key={spec} 
                                                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/80"
                                                    >
                                                        {spec}
                                                        <button 
                                                            type="button" 
                                                            onClick={() => removeSpecialization(spec)}
                                                            className="ml-1.5 text-blue-400 hover:text-blue-700 focus:outline-none"
                                                        >
                                                            &times;
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Quick suggestions */}
                                            <div className="mt-2 flex flex-wrap gap-1 items-center">
                                                <span className="text-[10px] text-slate-400 mr-1">Suggestions:</span>
                                                {quickDomains.slice(0, 5).map(domain => (
                                                    <button 
                                                        key={domain} 
                                                        type="button"
                                                        onClick={() => addSpecialization(domain)}
                                                        className="text-[10px] text-slate-500 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 px-2 py-0.5 rounded transition-colors"
                                                    >
                                                        + {domain}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3: Company Address */}
                            <div id="section-3" className="bg-white rounded-xl border border-slate-200 p-6 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-colors">
                                <div className="flex items-center mb-6">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mr-3">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base leading-none">
                                            Company Address
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Provide your official company address.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Address Line 1 <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="addressLine1"
                                            value={formData.addressLine1}
                                            onChange={handleChange}
                                            placeholder="Enter address line 1"
                                            required
                                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Address Line 2
                                        </label>
                                        <input 
                                            type="text" 
                                            name="addressLine2"
                                            value={formData.addressLine2}
                                            onChange={handleChange}
                                            placeholder="Enter address line 2 (optional)"
                                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                        />
                                    </div>

                                    {/* 4 columns: City, State, Country, PIN Code */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                City <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="Enter city"
                                                required
                                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                State <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select 
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full appearance-none px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors pr-8"
                                                >
                                                    <option value="">Select state</option>
                                                    {indianStates.map((st) => (
                                                        <option key={st} value={st}>{st}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Country <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select 
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full appearance-none px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors pr-8"
                                                >
                                                    {countries.map((c) => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                PIN Code <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="pinCode"
                                                value={formData.pinCode}
                                                onChange={handleChange}
                                                placeholder="Enter PIN code"
                                                required
                                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 4: Authorized Contact / Recruiter */}
                            <div id="section-4" className="bg-white rounded-xl border border-slate-200 p-6 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-colors">
                                <div className="flex items-center mb-6">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mr-3">
                                        4
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base leading-none">
                                            Authorized Contact / Recruiter
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Primary contact person who will manage the recruitment activities.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Enter full name"
                                                required
                                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Designation <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="designation"
                                                value={formData.designation}
                                                onChange={handleChange}
                                                placeholder="Enter designation (e.g. HR Manager)"
                                                required
                                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Official Email <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative flex items-center">
                                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                                                <input 
                                                    type="email" 
                                                    name="officialEmail"
                                                    value={formData.officialEmail}
                                                    onChange={handleChange}
                                                    placeholder="recruiter@example.com"
                                                    required
                                                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Contact Number <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600 overflow-hidden">
                                                <div className="bg-slate-50 border-r border-slate-200 px-3 flex items-center text-xs font-medium text-slate-600 space-x-1 shrink-0">
                                                    <Phone className="w-3.5 h-3.5 text-slate-400 mr-1" />
                                                    <span>+91.</span>
                                                </div>
                                                <input 
                                                    type="tel" 
                                                    name="contactNumber"
                                                    value={formData.contactNumber}
                                                    onChange={handleChange}
                                                    placeholder="Enter contact number"
                                                    required
                                                    className="w-full px-3.5 py-2.5 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 5: Account Details */}
                            <div id="section-5" className="bg-white rounded-xl border border-slate-200 p-6 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-colors">
                                <div className="flex items-center mb-6">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mr-3">
                                        5
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base leading-none">
                                            Account Details
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Create your login credentials.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Password <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative flex items-center">
                                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                                                <input 
                                                    type={showPassword ? "text" : "password"} 
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="Enter password"
                                                    required
                                                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Confirm Password <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative flex items-center">
                                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                                                <input 
                                                    type={showConfirmPassword ? "text" : "password"} 
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    placeholder="Confirm password"
                                                    required
                                                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Terms and conditions checkbox */}
                                    <div className="pt-2">
                                        <label className="flex items-center space-x-2.5 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 focus:ring-2"
                                            />
                                            <span className="text-xs text-slate-600 font-normal">
                                                I agree to the <span className="text-blue-600 hover:underline">Terms and Conditions</span> and <span className="text-blue-600 hover:underline">Privacy Policy</span>.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Actions Bar */}
                            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-slate-200 gap-4">
                                <Link 
                                    to="/login"
                                    className="text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Already registered? <span className="font-semibold text-blue-600">Sign in to Employer Portal</span>
                                </Link>

                                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                                    <button 
                                        type="button" 
                                        onClick={() => navigate('/')}
                                        className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors w-full sm:w-auto"
                                    >
                                        Cancel
                                    </button>

                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Registering...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Register Company</span>
                                                <ArrowRight className="w-4 h-4 ml-1" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>

            </div>

            {/* ===================== REGISTRATION SUBMITTED / PENDING APPROVAL MODAL ===================== */}
            {showPendingModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-7 text-white text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 pointer-events-none" />
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border border-white/30 text-white shadow-lg animate-pulse">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white uppercase tracking-wider mb-2 border border-white/25">
                                <span className="w-2 h-2 rounded-full bg-amber-200 animate-ping" />
                                Pending Admin Approval
                            </span>
                            <h2 className="text-2xl font-bold">Registration Submitted!</h2>
                            <p className="text-amber-100 text-sm mt-1">
                                Verification request sent to CareerSync Administrator
                            </p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">
                            {/* Summary Card */}
                            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-sm">
                                <div className="flex justify-between items-center pb-2.5 border-b border-amber-200/60">
                                    <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Company</span>
                                    <span className="font-bold text-slate-800">{registeredCompanyInfo?.companyName}</span>
                                </div>
                                <div className="flex justify-between items-center py-2.5 border-b border-amber-200/60">
                                    <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Industry</span>
                                    <span className="font-semibold text-slate-700">{registeredCompanyInfo?.industryType}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2.5">
                                    <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Representative</span>
                                    <span className="font-medium text-slate-700">{registeredCompanyInfo?.fullName}</span>
                                </div>
                            </div>

                            {/* Verification Workflow Steps */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-800">1. Account Registered</p>
                                        <p className="text-xs text-slate-500">Your profile and credentials have been successfully created.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-amber-800">2. Admin Verification in Progress</p>
                                        <p className="text-xs text-slate-500">
                                            Your request appears on the Admin Verification page for identity and authenticity review.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <ShieldCheck className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">3. Full Account Activation</p>
                                        <p className="text-xs text-slate-500">
                                            Once verified by the administrator, opportunity posting and candidate review will be fully unlocked.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-2 flex flex-col gap-2.5">
                                <button
                                    onClick={() => navigate('/company-profile')}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Go to Company Profile</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <p className="text-[11px] text-center text-slate-400">
                                    You can check your live verification approval status anytime inside your dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyRegister;
