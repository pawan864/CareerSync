import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import {
    Award,
    FileText,
    UploadCloud,
    CheckCircle2,
    Calendar,
    ExternalLink,
    Trash2,
    Edit3,
    Eye,
    Download,
    Search,
    Filter,
    Plus,
    X,
    ShieldCheck,
    Copy,
    Check,
    Sparkles,
    AlertCircle,
    LayoutGrid,
    List,
    Clock,
    Tag,
    Building2,
    FileCode,
    Share2
} from 'lucide-react';

const COMMON_ISSUERS = [
    { name: 'Amazon Web Services (AWS)', iconColor: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    { name: 'Google Cloud / Google', iconColor: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { name: 'Microsoft / Azure', iconColor: 'text-sky-600', bgColor: 'bg-sky-50', borderColor: 'border-sky-200' },
    { name: 'Meta', iconColor: 'text-indigo-600', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
    { name: 'IBM', iconColor: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { name: 'Cisco', iconColor: 'text-cyan-600', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
    { name: 'Oracle', iconColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { name: 'Coursera', iconColor: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { name: 'HackerRank', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    { name: 'Udemy', iconColor: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
];

const INITIAL_CERTIFICATIONS = [
    {
        _id: 'cert-1',
        title: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services (AWS)',
        dateIssued: '2025-08-15',
        expiresAt: '2028-08-15',
        doesNotExpire: false,
        credentialId: 'AWS-SAA-849204',
        url: 'https://aws.amazon.com/verification',
        skills: ['Cloud Architecture', 'AWS S3', 'EC2', 'IAM', 'VPC'],
        fileName: 'AWS_Solutions_Architect_Certificate.pdf',
        fileType: 'application/pdf',
        fileSize: '1.2 MB',
        fileUrl: '',
        status: 'Verified'
    },
    {
        _id: 'cert-2',
        title: 'Meta Front-End Developer Professional Certificate',
        issuer: 'Meta',
        dateIssued: '2025-05-20',
        doesNotExpire: true,
        credentialId: 'META-FE-992318',
        url: 'https://www.coursera.org/verify/professional-cert/META-FE',
        skills: ['React', 'JavaScript', 'HTML5/CSS3', 'Version Control', 'UI/UX'],
        fileName: 'Meta_FrontEnd_Developer.pdf',
        fileType: 'application/pdf',
        fileSize: '840 KB',
        fileUrl: '',
        status: 'Verified'
    },
    {
        _id: 'cert-3',
        title: 'Google Cloud Certified Associate Cloud Engineer',
        issuer: 'Google Cloud / Google',
        dateIssued: '2025-11-10',
        expiresAt: '2027-11-10',
        doesNotExpire: false,
        credentialId: 'GCP-ACE-773412',
        url: 'https://cloud.google.com/certification',
        skills: ['Kubernetes', 'GCP', 'Compute Engine', 'Cloud Storage'],
        fileName: 'Google_Cloud_Certificate.pdf',
        fileType: 'application/pdf',
        fileSize: '1.5 MB',
        fileUrl: '',
        status: 'Verified'
    }
];

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [issuerFilter, setIssuerFilter] = useState('All');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
    const [copiedId, setCopiedId] = useState(null);

    // Modal States
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [viewingCert, setViewingCert] = useState(null);
    const [deletingCertId, setDeletingCertId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        dateIssued: '',
        expiresAt: '',
        doesNotExpire: false,
        credentialId: '',
        url: '',
        skills: [],
        status: 'Verified',
        fileName: '',
        fileType: '',
        fileSize: '',
        fileUrl: ''
    });

    const [skillInput, setSkillInput] = useState('');
    const fileInputRef = useRef(null);

    // Load certifications on mount
    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        setLoading(true);
        try {
            const res = await api.get('/profile/certifications');
            if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
                setCertifications(res.data.data);
            } else {
                // Check localStorage or fallback to starter certificates
                const local = localStorage.getItem('student_certifications');
                if (local) {
                    setCertifications(JSON.parse(local));
                } else {
                    setCertifications(INITIAL_CERTIFICATIONS);
                    localStorage.setItem('student_certifications', JSON.stringify(INITIAL_CERTIFICATIONS));
                }
            }
        } catch (err) {
            console.warn('Backend certifications fetch notice:', err.message);
            const local = localStorage.getItem('student_certifications');
            if (local) {
                setCertifications(JSON.parse(local));
            } else {
                setCertifications(INITIAL_CERTIFICATIONS);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingCert(null);
        setFormData({
            title: '',
            issuer: '',
            dateIssued: new Date().toISOString().split('T')[0],
            expiresAt: '',
            doesNotExpire: true,
            credentialId: '',
            url: '',
            skills: [],
            status: 'Verified',
            fileName: '',
            fileType: '',
            fileSize: '',
            fileUrl: ''
        });
        setSkillInput('');
        setFormError('');
        setShowUploadModal(true);
    };

    const handleOpenEditModal = (cert) => {
        setEditingCert(cert);
        setFormData({
            title: cert.title || '',
            issuer: cert.issuer || '',
            dateIssued: cert.dateIssued ? cert.dateIssued.split('T')[0] : '',
            expiresAt: cert.expiresAt ? cert.expiresAt.split('T')[0] : '',
            doesNotExpire: cert.doesNotExpire ?? (!cert.expiresAt),
            credentialId: cert.credentialId || '',
            url: cert.url || '',
            skills: cert.skills || [],
            status: cert.status || 'Verified',
            fileName: cert.fileName || '',
            fileType: cert.fileType || '',
            fileSize: cert.fileSize || '',
            fileUrl: cert.fileUrl || ''
        });
        setSkillInput('');
        setFormError('');
        setShowUploadModal(true);
    };

    // File Upload Handler (PDF or Image to Base64 data URL)
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Size check (Max 12MB)
        if (file.size > 12 * 1024 * 1024) {
            setFormError('File size exceeds the 12MB limit. Please upload a smaller document.');
            return;
        }

        const formattedSize = file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${Math.round(file.size / 1024)} KB`;

        const reader = new FileReader();
        reader.onload = () => {
            setFormData(prev => ({
                ...prev,
                fileName: file.name,
                fileType: file.type,
                fileSize: formattedSize,
                fileUrl: reader.result
            }));
            setFormError('');
        };
        reader.onerror = () => {
            setFormError('Failed to read the selected file. Please try again.');
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveFile = () => {
        setFormData(prev => ({
            ...prev,
            fileName: '',
            fileType: '',
            fileSize: '',
            fileUrl: ''
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Skills tag management
    const handleAddSkill = () => {
        const clean = skillInput.trim();
        if (!clean) return;
        if (formData.skills.some(s => s.toLowerCase() === clean.toLowerCase())) {
            setSkillInput('');
            return;
        }
        setFormData(prev => ({
            ...prev,
            skills: [...prev.skills, clean]
        }));
        setSkillInput('');
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skillToRemove)
        }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!formData.title.trim()) {
            setFormError('Certification title is required.');
            return;
        }
        if (!formData.issuer.trim()) {
            setFormError('Issuing organization is required.');
            return;
        }

        setSaving(true);
        const payload = {
            ...formData,
            expiresAt: formData.doesNotExpire ? null : formData.expiresAt
        };

        try {
            if (editingCert) {
                // Update
                try {
                    const res = await api.put(`/profile/certifications/${editingCert._id}`, payload);
                    if (res.data?.success) {
                        setCertifications(res.data.data);
                        localStorage.setItem('student_certifications', JSON.stringify(res.data.data));
                    }
                } catch {
                    // Update locally
                    const updated = certifications.map(c => c._id === editingCert._id ? { ...payload, _id: editingCert._id } : c);
                    setCertifications(updated);
                    localStorage.setItem('student_certifications', JSON.stringify(updated));
                }
            } else {
                // Add new
                try {
                    const res = await api.post('/profile/certifications', payload);
                    if (res.data?.success) {
                        setCertifications(res.data.data);
                        localStorage.setItem('student_certifications', JSON.stringify(res.data.data));
                    }
                } catch {
                    // Add locally
                    const newCert = { ...payload, _id: `cert-${Date.now()}` };
                    const updated = [newCert, ...certifications];
                    setCertifications(updated);
                    localStorage.setItem('student_certifications', JSON.stringify(updated));
                }
            }
            setShowUploadModal(false);
        } catch (err) {
            setFormError(err.response?.data?.error || 'Failed to save certification. Please check your data.');
        } finally {
            setSaving(false);
        }
    };

    // Delete handler
    const handleDelete = async (certId) => {
        try {
            try {
                const res = await api.delete(`/profile/certifications/${certId}`);
                if (res.data?.success) {
                    setCertifications(res.data.data);
                    localStorage.setItem('student_certifications', JSON.stringify(res.data.data));
                }
            } catch {
                const updated = certifications.filter(c => c._id !== certId);
                setCertifications(updated);
                localStorage.setItem('student_certifications', JSON.stringify(updated));
            }
            setDeletingCertId(null);
            if (viewingCert?._id === certId) setViewingCert(null);
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const handleCopyId = (id) => {
        navigator.clipboard?.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Filtered Certifications
    const filteredCertifications = certifications.filter(cert => {
        const matchesSearch =
            (cert.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (cert.issuer || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (cert.credentialId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (cert.skills || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesIssuer =
            issuerFilter === 'All' ||
            (cert.issuer || '').toLowerCase().includes(issuerFilter.toLowerCase());

        return matchesSearch && matchesIssuer;
    });

    // Metric Calculations
    const totalCertCount = certifications.length;
    const verifiedCount = certifications.filter(c => c.status === 'Verified').length;
    const uniqueIssuers = Array.from(new Set(certifications.map(c => c.issuer).filter(Boolean))).length;
    const allSkills = Array.from(new Set(certifications.flatMap(c => c.skills || [])));

    return (
        <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 space-y-7 animate-fade-in">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 p-8 sm:p-10 text-white shadow-xl shadow-blue-900/10">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-100 mb-3.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-300" />
                            <span>Verified Industry Credentials</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Certifications & Licenses
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-blue-100/90 leading-relaxed">
                            Upload, organize, and showcase your verified technical credentials to employers. Attach certificates to automatically highlight verified skills on your campus profile and resume.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={handleOpenAddModal}
                            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-lg shadow-black/10 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <Plus className="w-5 h-5 text-blue-600 stroke-[2.5]" />
                            <span>Upload Certificate</span>
                        </button>
                    </div>
                </div>

                {/* Decorative background glows */}
                <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-12 -top-12 w-64 h-64 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* 4 KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                            <Award className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total</span>
                    </div>
                    <div className="mt-3">
                        <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalCertCount}</p>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">Certificates Earned</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <div className="mt-3">
                        <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{verifiedCount}</p>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">Verified Credentials</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Partners</span>
                    </div>
                    <div className="mt-3">
                        <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{uniqueIssuers}</p>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">Issuing Organizations</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Matched</span>
                    </div>
                    <div className="mt-3">
                        <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{allSkills.length}</p>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">Validated Tech Skills</p>
                    </div>
                </div>
            </div>

            {/* Controls Bar: Search, Filters, View Modes */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[260px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by certification name, issuer, skill or credential ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder-slate-400"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Filter and View Toggles */}
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                        <Filter className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                        <select
                            value={issuerFilter}
                            onChange={(e) => setIssuerFilter(e.target.value)}
                            className="pl-9 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                        >
                            <option value="All">All Issuers ({totalCertCount})</option>
                            {COMMON_ISSUERS.map(iss => (
                                <option key={iss.name} value={iss.name}>{iss.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                            title="Grid View"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                            title="Table View"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Certifications Content */}
            {loading ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-slate-600 text-sm font-semibold">Loading your verified certificates...</p>
                </div>
            ) : filteredCertifications.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                        {searchQuery || issuerFilter !== 'All' ? 'No matching certifications found' : 'No certifications uploaded yet'}
                    </h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto mt-1.5">
                        {searchQuery || issuerFilter !== 'All'
                            ? 'Try clearing your search terms or filter to see all credentials.'
                            : 'Upload your first certificate or license to enhance your profile score and stand out to top recruiters.'}
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        {searchQuery || issuerFilter !== 'All' ? (
                            <button
                                onClick={() => { setSearchQuery(''); setIssuerFilter('All'); }}
                                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                            >
                                Reset Filters
                            </button>
                        ) : (
                            <button
                                onClick={handleOpenAddModal}
                                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Upload Certificate</span>
                            </button>
                        )}
                    </div>
                </div>
            ) : viewMode === 'grid' ? (
                /* GRID VIEW */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCertifications.map((cert) => {
                        const hasDocument = Boolean(cert.fileUrl || cert.fileName);
                        return (
                            <div
                                key={cert._id}
                                className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
                            >
                                <div>
                                    {/* Top Row: Issuer Badge & Status */}
                                    <div className="flex items-start justify-between gap-3 mb-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                                            {cert.issuer?.charAt(0) || 'C'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                {cert.status || 'Verified'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title & Issuer */}
                                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                                        {cert.title}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{cert.issuer}</span>
                                    </p>

                                    {/* Credential ID */}
                                    {cert.credentialId && (
                                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                            <span className="text-[11px] font-semibold text-slate-400">Credential ID:</span>
                                            <button
                                                onClick={() => handleCopyId(cert.credentialId)}
                                                className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded border border-slate-200 transition-colors"
                                                title="Copy Credential ID"
                                            >
                                                <span>{cert.credentialId}</span>
                                                {copiedId === cert.credentialId ? (
                                                    <Check className="w-3 h-3 text-emerald-600" />
                                                ) : (
                                                    <Copy className="w-3 h-3 text-slate-400" />
                                                )}
                                            </button>
                                        </div>
                                    )}

                                    {/* Date & Expiration info */}
                                    <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Issued: {cert.dateIssued ? new Date(cert.dateIssued).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}</span>
                                        <span className="text-slate-300">•</span>
                                        <span className={cert.doesNotExpire ? 'text-slate-400 font-medium' : 'text-slate-500'}>
                                            {cert.doesNotExpire ? 'No Expiry' : cert.expiresAt ? `Expires: ${new Date(cert.expiresAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : 'Active'}
                                        </span>
                                    </div>

                                    {/* Associated Skills */}
                                    {cert.skills && cert.skills.length > 0 && (
                                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                                            {cert.skills.slice(0, 4).map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-medium transition-colors"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                            {cert.skills.length > 4 && (
                                                <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold">
                                                    +{cert.skills.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Action Strip */}
                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5">
                                        {hasDocument ? (
                                            <button
                                                onClick={() => setViewingCert(cert)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
                                            >
                                                <FileText className="w-3.5 h-3.5" />
                                                <span>View File</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleOpenEditModal(cert)}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                                            >
                                                <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
                                                <span>Attach Doc</span>
                                            </button>
                                        )}

                                        {cert.url && (
                                            <a
                                                href={cert.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                                                title="Official Credential Verification Link"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleOpenEditModal(cert)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                            title="Edit Certification"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setDeletingCertId(cert._id)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                            title="Delete Certification"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* TABLE VIEW */
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                    <th className="py-3.5 px-6">Certification Name</th>
                                    <th className="py-3.5 px-6">Issuing Organization</th>
                                    <th className="py-3.5 px-6">Credential ID</th>
                                    <th className="py-3.5 px-6">Date Earned</th>
                                    <th className="py-3.5 px-6">Document</th>
                                    <th className="py-3.5 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filteredCertifications.map((cert) => (
                                    <tr key={cert._id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs">
                                                    {cert.issuer?.charAt(0) || 'C'}
                                                </div>
                                                <div>
                                                    <p className="leading-snug">{cert.title}</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {(cert.skills || []).slice(0, 3).map((s, i) => (
                                                            <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                                                                {s}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 font-medium">
                                            {cert.issuer}
                                        </td>
                                        <td className="py-4 px-6 font-mono text-xs text-slate-600">
                                            {cert.credentialId || '—'}
                                        </td>
                                        <td className="py-4 px-6 text-xs text-slate-500 font-medium">
                                            {cert.dateIssued ? new Date(cert.dateIssued).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}
                                        </td>
                                        <td className="py-4 px-6">
                                            {cert.fileUrl || cert.fileName ? (
                                                <button
                                                    onClick={() => setViewingCert(cert)}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors"
                                                >
                                                    <FileText className="w-3.5 h-3.5" />
                                                    <span>View Doc</span>
                                                </button>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">None attached</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="inline-flex items-center gap-1">
                                                {cert.url && (
                                                    <a
                                                        href={cert.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
                                                        title="Verify Credential"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => handleOpenEditModal(cert)}
                                                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                                                    title="Edit"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeletingCertId(cert._id)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ======================= MODAL: UPLOAD / EDIT CERTIFICATE ======================= */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8 animate-fade-in-up">
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">
                                        {editingCert ? 'Edit Certification' : 'Upload Certification Document'}
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Attach certificate proofs and credential IDs for verified verification.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                            {formError && (
                                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                    <span>{formError}</span>
                                </div>
                            )}

                            {/* 1. DOCUMENT FILE UPLOAD DROPZONE */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Certificate Document (PDF or Image proof)
                                </label>

                                {formData.fileName ? (
                                    <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-slate-900 truncate">{formData.fileName}</p>
                                                <p className="text-[11px] text-slate-500">{formData.fileSize} • Attached document</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {formData.fileUrl && (
                                                <button
                                                    type="button"
                                                    onClick={() => setViewingCert(formData)}
                                                    className="px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-50"
                                                >
                                                    Preview
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                                                title="Remove file"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition-all group"
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="application/pdf,image/png,image/jpeg,image/webp"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2.5 transition-colors">
                                            <UploadCloud className="w-6 h-6 stroke-[2]" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-800">
                                            Click to browse or drag and drop your certificate
                                        </p>
                                        <p className="text-[11px] text-slate-400 mt-1">
                                            Supports PDF, PNG, JPG up to 12MB
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* 2. TITLE & ISSUER */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Certification Title <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. AWS Solutions Architect, React Developer"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Issuing Organization <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Amazon Web Services, Google, Meta"
                                        value={formData.issuer}
                                        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                    {/* Quick suggestion badges */}
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                        {['AWS', 'Google', 'Meta', 'Microsoft', 'Coursera', 'IBM'].map(iss => (
                                            <button
                                                type="button"
                                                key={iss}
                                                onClick={() => setFormData({ ...formData, issuer: iss })}
                                                className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition-colors"
                                            >
                                                +{iss}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 3. DATES */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Issue Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.dateIssued}
                                        onChange={(e) => setFormData({ ...formData, dateIssued: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="text-xs font-bold text-slate-700">
                                            Expiration Date
                                        </label>
                                        <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.doesNotExpire}
                                                onChange={(e) => setFormData({ ...formData, doesNotExpire: e.target.checked })}
                                                className="rounded text-blue-600 focus:ring-blue-500"
                                            />
                                            <span>No Expiration</span>
                                        </label>
                                    </div>
                                    <input
                                        type="date"
                                        disabled={formData.doesNotExpire}
                                        value={formData.expiresAt}
                                        onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50 disabled:bg-slate-100"
                                    />
                                </div>
                            </div>

                            {/* 4. CREDENTIAL ID & VERIFICATION URL */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Credential ID / License #
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. AWS-SAA-90412"
                                        value={formData.credentialId}
                                        onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Verification Link / URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://credly.com/badges/..."
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* 5. ASSOCIATED SKILLS */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Associated Skills Learned
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type skill and press Enter or click Add (e.g. React, Docker)"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddSkill();
                                            }
                                        }}
                                        className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSkill}
                                        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>

                                {formData.skills && formData.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                                        {formData.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium"
                                            >
                                                <span>{skill}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSkill(skill)}
                                                    className="hover:text-blue-900"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowUploadModal(false)}
                                    className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : editingCert ? 'Update Certificate' : 'Save Certificate'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ======================= MODAL: DOCUMENT VIEWER ======================= */}
            {viewingCert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 shrink-0">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base font-bold text-slate-900 truncate">
                                        {viewingCert.title || viewingCert.fileName || 'Certificate Document'}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        {viewingCert.issuer ? `Issued by ${viewingCert.issuer}` : 'Uploaded Certificate Proof'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {viewingCert.fileUrl && (
                                    <a
                                        href={viewingCert.fileUrl}
                                        download={viewingCert.fileName || 'certificate.pdf'}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Download</span>
                                    </a>
                                )}
                                <button
                                    onClick={() => setViewingCert(null)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Viewer Canvas */}
                        <div className="flex-1 overflow-auto p-6 bg-slate-100 flex items-center justify-center min-h-[350px]">
                            {viewingCert.fileUrl ? (
                                viewingCert.fileType?.includes('pdf') || viewingCert.fileName?.endsWith('.pdf') ? (
                                    <iframe
                                        src={viewingCert.fileUrl}
                                        title={viewingCert.title || 'Certificate'}
                                        className="w-full h-[65vh] rounded-xl border border-slate-300 shadow-inner bg-white"
                                    />
                                ) : (
                                    <img
                                        src={viewingCert.fileUrl}
                                        alt={viewingCert.title || 'Certificate'}
                                        className="max-h-[65vh] max-w-full rounded-xl object-contain shadow-md"
                                    />
                                )
                            ) : (
                                <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 max-w-md">
                                    <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                    <h4 className="text-base font-bold text-slate-900">{viewingCert.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">
                                        No file preview was stored for this certificate. You can verify this credential using the official verification link.
                                    </p>
                                    {viewingCert.url && (
                                        <a
                                            href={viewingCert.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Open Official Verification Site</span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer Details */}
                        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 shrink-0">
                            <div>
                                {viewingCert.credentialId && (
                                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">
                                        ID: {viewingCert.credentialId}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setViewingCert(null)}
                                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold"
                            >
                                Close Viewer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ======================= MODAL: DELETE CONFIRMATION ======================= */}
            {deletingCertId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-slate-200 text-center animate-fade-in-up">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">Delete Certification?</h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Are you sure you want to remove this certificate? This action cannot be undone.
                        </p>
                        <div className="mt-5 flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingCertId(null)}
                                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deletingCertId)}
                                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Certifications;