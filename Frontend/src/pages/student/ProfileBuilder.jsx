import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, BookOpen, Code, Award, Briefcase, FileText, 
    CheckCircle, ChevronRight, ChevronLeft, Upload, Plus, Trash2, Download
} from 'lucide-react';

const ProfileBuilder = () => {
    const [currentStep, setCurrentStep] = useState(1);
    
    // Form State
    const [formData, setFormData] = useState({
        personal: { phone: '', portfolioUrl: '', githubUrl: '', linkedinUrl: '' },
        academic: { college: '', department: '', semester: '', graduationYear: '', cgpa: '' },
        skills: [{ name: '', level: 'Beginner', category: 'Technical' }],
        projects: [{ title: '', description: '', technologiesUsed: '', githubUrl: '' }],
        career: { targetRoles: '', preferredLocations: '' }
    });

    const updateField = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const handleArrayChange = (section, index, field, value) => {
        const newArray = [...formData[section]];
        newArray[index][field] = value;
        setFormData(prev => ({ ...prev, [section]: newArray }));
    };

    const addArrayItem = (section, template) => {
        setFormData(prev => ({ ...prev, [section]: [...prev[section], template] }));
    };

    const removeArrayItem = (section, index) => {
        const newArray = formData[section].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [section]: newArray }));
    };

    
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profile/me');
                if (res.data.success && res.data.data) {
                    const dbProfile = res.data.data;
                    setFormData({
                        personal: dbProfile.personalInfo || { phone: '', portfolioUrl: '', githubUrl: '', linkedinUrl: '' },
                        academic: dbProfile.academicInfo || { college: '', department: '', semester: '', graduationYear: '', cgpa: '' },
                        skills: dbProfile.skills && dbProfile.skills.length > 0 ? dbProfile.skills : [{ name: '', level: 'Beginner', category: 'Technical' }],
                        projects: dbProfile.projects && dbProfile.projects.length > 0 ? dbProfile.projects.map(p => ({...p, technologiesUsed: p.technologiesUsed ? p.technologiesUsed.join(', ') : ''})) : [{ title: '', description: '', technologiesUsed: '', githubUrl: '' }],
                        career: dbProfile.careerInterests || { targetRoles: '', preferredLocations: '' }
                    });
                }
            } catch (err) {
                console.log("No profile exists yet or error fetching.");
            }
        };
        fetchProfile();
    }, []);

    
    const generateResumePDF = async () => {
        const input = document.getElementById('resume-preview');
        if (!input) return;
        
        try {
            // Un-hide the preview for rendering
            input.style.display = 'block';
            
            const canvas = await html2canvas(input, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${formData.personal.name || 'Student'}_Resume.pdf`);
            
            // Hide it back
            input.style.display = 'none';
        } catch (err) {
            console.error("PDF Generation Error", err);
        }
    };

    const saveProfile = async () => {
        setIsSaving(true);
        setMessage({ text: '', type: '' });
        try {
            
            const processedProjects = formData.projects.map(p => ({
                ...p,
                technologiesUsed: typeof p.technologiesUsed === 'string' ? p.technologiesUsed.split(',').map(s => s.trim()).filter(Boolean) : p.technologiesUsed
            }));

            const payload = {
                personalInfo: formData.personal,
                academicInfo: formData.academic,
                skills: formData.skills,
                projects: processedProjects,
                careerInterests: formData.career
            };

            const res = await api.post('/profile', payload);
            if (res.data.success) {
                setMessage({ text: 'Profile saved successfully!', type: 'success' });
            }
        } catch (err) {
            setMessage({ text: 'Failed to save profile. Please try again.', type: 'error' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        }
    };

    const steps = [
        { num: 1, title: 'Personal & Academic', icon: User },
        { num: 2, title: 'Skills & Experience', icon: Code },
        { num: 3, title: 'Projects & Career', icon: Briefcase },
        { num: 4, title: 'Resume Generator', icon: FileText }
    ];

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    
            {/* HIDDEN RESUME PREVIEW FOR PDF GENERATION */}
            <div id="resume-preview" className="hidden bg-white text-black p-10 w-[800px] absolute -left-[9999px]">
                <h1 className="text-4xl font-medium border-b-2 border-black pb-2 mb-4">{formData.personal.name || 'Student Name'}</h1>
                <p className="mb-6">{formData.personal.linkedinUrl} | {formData.personal.githubUrl}</p>
                
                <h2 className="text-2xl font-medium mb-2">Education</h2>
                <div className="mb-6">
                    <p className="font-medium">{formData.academic.college}</p>
                    <p>{formData.academic.department} | CGPA: {formData.academic.cgpa}</p>
                </div>
                
                <h2 className="text-2xl font-medium mb-2">Technical Skills</h2>
                <div className="mb-6">
                    {formData.skills.filter(s => s.category === 'Technical').map(s => s.name).join(', ')}
                </div>

                <h2 className="text-2xl font-medium mb-2">Projects</h2>
                <div className="mb-6">
                    {formData.projects.map((p, i) => (
                        <div key={i} className="mb-3">
                            <p className="font-medium">{p.title}</p>
                            <p className="italic text-sm text-gray-600 mb-1">{typeof p.technologiesUsed === 'string' ? p.technologiesUsed : p.technologiesUsed?.join(', ')}</p>
                            <p>{p.description}</p>
                        </div>
                    ))}
                </div>
            </div>

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Header & Progress */}
            <div className="mb-8">
                <h2 className="text-3xl font-medium text-gray-800 mb-2">Digital Profile Builder</h2>
                <p className="text-gray-600 text-sm">Complete your profile to unlock AI-driven skill gaps and internships.</p>
                
                <div className="flex justify-between items-center mt-8 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-800 rounded-full z-0"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full z-0 transition-all duration-500" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
                    
                    {steps.map((step) => {
                        const Icon = step.icon;
                        const isActive = currentStep >= step.num;
                        const isCurrent = currentStep === step.num;
                        
                        
            {/* HIDDEN RESUME PREVIEW FOR PDF GENERATION */}
            <div id="resume-preview" className="hidden bg-white text-black p-10 w-[800px] absolute -left-[9999px]">
                <h1 className="text-4xl font-medium border-b-2 border-black pb-2 mb-4">{formData.personal.name || 'Student Name'}</h1>
                <p className="mb-6">{formData.personal.linkedinUrl} | {formData.personal.githubUrl}</p>
                
                <h2 className="text-2xl font-medium mb-2">Education</h2>
                <div className="mb-6">
                    <p className="font-medium">{formData.academic.college}</p>
                    <p>{formData.academic.department} | CGPA: {formData.academic.cgpa}</p>
                </div>
                
                <h2 className="text-2xl font-medium mb-2">Technical Skills</h2>
                <div className="mb-6">
                    {formData.skills.filter(s => s.category === 'Technical').map(s => s.name).join(', ')}
                </div>

                <h2 className="text-2xl font-medium mb-2">Projects</h2>
                <div className="mb-6">
                    {formData.projects.map((p, i) => (
                        <div key={i} className="mb-3">
                            <p className="font-medium">{p.title}</p>
                            <p className="italic text-sm text-gray-600 mb-1">{typeof p.technologiesUsed === 'string' ? p.technologiesUsed : p.technologiesUsed?.join(', ')}</p>
                            <p>{p.description}</p>
                        </div>
                    ))}
                </div>
            </div>

    return (
                            <div key={step.num} className="relative z-10 flex flex-col items-center group">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isActive ? 'bg-blue-600 border-blue-500 text-gray-800 shadow-sm' : 'bg-white border-gray-200 text-gray-500'
                                }`}>
                                    
                                </div>
                                <span className={`absolute -bottom-6 whitespace-nowrap text-xs font-semibold ${isActive ? 'text-blue-400' : 'text-gray-600'}`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white border border-blue-100 rounded-lg p-8 shadow-2xl mt-12 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* STEP 1: ACADEMIC */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-800 mb-6 flex items-center">
                                     Academic Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-600 text-xs font-medium mb-2 font-medium">College / University</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Enter your institution" value={formData.academic.college} onChange={e => updateField('academic', 'college', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-xs font-medium mb-2 font-medium">Department / Branch</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. Computer Science" value={formData.academic.department} onChange={e => updateField('academic', 'department', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-xs font-medium mb-2 font-medium">Semester / Year</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. 6th Semester" value={formData.academic.semester} onChange={e => updateField('academic', 'semester', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-xs font-medium mb-2 font-medium">Current CGPA</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. 8.5" value={formData.academic.cgpa} onChange={e => updateField('academic', 'cgpa', e.target.value)} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-medium text-gray-800 mb-6 mt-8 flex items-center">
                                     Digital Links
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-600 text-xs font-medium mb-2 font-medium">LinkedIn URL</label>
                                        <input type="url" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="https://linkedin.com/in/..." value={formData.personal.linkedinUrl} onChange={e => updateField('personal', 'linkedinUrl', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-xs font-medium mb-2 font-medium">GitHub URL</label>
                                        <input type="url" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="https://github.com/..." value={formData.personal.githubUrl} onChange={e => updateField('personal', 'githubUrl', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: SKILLS */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-medium text-gray-800 flex items-center">
                                         Technical & Soft Skills
                                    </h3>
                                    <button onClick={() => addArrayItem('skills', { name: '', level: 'Beginner', category: 'Technical' })} className="flex items-center text-xs font-medium text-purple-400 hover:text-purple-300 bg-purple-900/30 px-3 py-1.5 rounded-md transition-colors">
                                         ADD SKILL
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {formData.skills.map((skill, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-end bg-gray-50 p-4 rounded-md border border-blue-100">
                                            <div className="flex-1 w-full">
                                                <label className="block text-gray-500 text-xs font-medium mb-1.5 font-medium">Skill Name</label>
                                                <input type="text" className="w-full bg-white border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:border-purple-500 outline-none" placeholder="e.g. React.js, Python, Communication" value={skill.name} onChange={e => handleArrayChange('skills', idx, 'name', e.target.value)} />
                                            </div>
                                            <div className="w-full md:w-40">
                                                <label className="block text-gray-500 text-xs font-medium mb-1.5 font-medium">Category</label>
                                                <select className="w-full bg-white border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:border-purple-500 outline-none" value={skill.category} onChange={e => handleArrayChange('skills', idx, 'category', e.target.value)}>
                                                    <option value="Technical">Technical</option>
                                                    <option value="Soft">Soft Skill</option>
                                                    <option value="Domain">Domain Knowledge</option>
                                                </select>
                                            </div>
                                            <div className="w-full md:w-40">
                                                <label className="block text-gray-500 text-xs font-medium mb-1.5 font-medium">Proficiency</label>
                                                <select className="w-full bg-white border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:border-purple-500 outline-none" value={skill.level} onChange={e => handleArrayChange('skills', idx, 'level', e.target.value)}>
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Advanced">Advanced</option>
                                                    <option value="Expert">Expert</option>
                                                </select>
                                            </div>
                                            {formData.skills.length > 1 && (
                                                <button onClick={() => removeArrayItem('skills', idx)} className="p-2.5 text-gray-500 hover:text-red-400 bg-white hover:bg-red-950/30 rounded-lg transition-colors border border-blue-100 hover:border-red-900/50">
                                                    
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PROJECTS */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-medium text-gray-800 flex items-center">
                                         Key Projects
                                    </h3>
                                    <button onClick={() => addArrayItem('projects', { title: '', description: '', technologiesUsed: '', githubUrl: '' })} className="flex items-center text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-900/30 px-3 py-1.5 rounded-md transition-colors">
                                         ADD PROJECT
                                    </button>
                                </div>
                                
                                <div className="space-y-6">
                                    {formData.projects.map((proj, idx) => (
                                        <div key={idx} className="bg-gray-50 p-5 rounded-md border border-blue-100 relative">
                                            {formData.projects.length > 1 && (
                                                <button onClick={() => removeArrayItem('projects', idx)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors">
                                                    
                                                </button>
                                            )}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                                                <div>
                                                    <label className="block text-gray-500 text-xs font-medium mb-1.5 font-medium">Project Title</label>
                                                    <input type="text" className="w-full bg-white border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 outline-none" placeholder="e.g. AI Chatbot" value={proj.title} onChange={e => handleArrayChange('projects', idx, 'title', e.target.value)} />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-500 text-xs font-medium mb-1.5 font-medium">Tech Stack (comma separated)</label>
                                                    <input type="text" className="w-full bg-white border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 outline-none" placeholder="e.g. React, Node.js, MongoDB" value={proj.technologiesUsed} onChange={e => handleArrayChange('projects', idx, 'technologiesUsed', e.target.value)} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-xs font-medium mb-1.5 font-medium">Description</label>
                                                <textarea rows="3" className="w-full bg-white border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 outline-none resize-none" placeholder="What did you build and what problem did it solve?" value={proj.description} onChange={e => handleArrayChange('projects', idx, 'description', e.target.value)}></textarea>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 4: RESUME GENERATOR */}
                        {currentStep === 4 && (
                            <div className="space-y-6 text-center py-8">
                                <div className="w-20 h-20 bg-blue-600 rounded-lg mx-auto flex items-center justify-center mb-6 shadow-sm">
                                    
                                </div>
                                <h3 className="text-2xl font-medium text-gray-800 mb-2">Profile Complete!</h3>
                                <p className="text-gray-600 max-w-md mx-auto mb-8">Your digital profile is ready. You can now generate an ATS-friendly resume using your verified data, or proceed to the Skill Center for gap analysis.</p>
                                
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <button onClick={generateResumePDF} className="flex items-center justify-center px-6 py-3 bg-white text-gray-800 rounded-md font-medium hover:bg-gray-100 transition-colors shadow-lg">
                                        
                                        Generate Resume (PDF)
                                    </button>
                                    
                                    <button onClick={saveProfile} disabled={isSaving} className="flex items-center justify-center px-6 py-3 bg-blue-600 border border-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-800 transition-colors">
                                        {isSaving ? 'Saving...' : 'Save Profile to Database'}
                                    </button>
                                </div>
                                {message.text && (
                                    <div className={`mt-6 px-4 py-2 rounded-md max-w-md mx-auto text-sm font-medium ${message.type === 'success' ? 'bg-green-900/50 text-green-400 border border-green-500' : 'bg-red-900/50 text-red-400 border border-red-500'}`}>
                                        {message.text}
                                    </div>
                                )}

                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8">
                <button 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center px-5 py-2.5 rounded-md font-semibold transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-white border border-blue-100 text-gray-800 hover:bg-gray-800'}`}
                >
                     Back
                </button>
                
                {currentStep < 4 ? (
                    <button 
                        onClick={nextStep}
                        className="flex items-center px-6 py-2.5 rounded-md font-medium bg-blue-600 text-gray-800 hover:bg-blue-500 transition-all shadow-sm"
                    >
                        Next Step 
                    </button>
                ) : (
                    <div className="w-24"></div> // spacer
                )}
            </div>
        </div>
    );
};

export default ProfileBuilder;
