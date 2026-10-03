import re

path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\EmployerDashboard.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure lucide-react has necessary icons
if 'import { LogOut } from' in content:
    content = content.replace("import { LogOut } from 'lucide-react';", "import { LogOut, Briefcase, Users, LayoutDashboard, PlusCircle, Activity } from 'lucide-react';")

# Also import motion
if 'import { motion } from' not in content:
    content = content.replace("import React,", "import { motion } from 'framer-motion';\nimport React,")

# Let's find the return block and replace it
return_pattern = r'return \(\s*<div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">[\s\S]*?\);\n\};'

new_return = """    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="h-screen overflow-hidden bg-[#050505] flex">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Sidebar */}
            <motion.div 
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                className="w-64 bg-[#0a0a0a] border-r border-gray-800/60 flex flex-col relative z-20 shadow-2xl"
            >
                {/* Brand */}
                <div className="h-20 flex items-center px-6 border-b border-gray-800/60">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-md shadow-blue-500/20">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white">Career<span className="text-blue-500">Sync</span></h2>
                        <span className="text-[10px] uppercase tracking-widest text-blue-400 font-semibold">Employer Portal</span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 py-6 px-4 space-y-1">
                    {[
                        { name: 'Overview', icon: LayoutDashboard },
                        { name: 'Applications', icon: Users },
                        { name: 'Analytics', icon: Activity }
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 active:scale-95 cursor-pointer ${
                                activeTab === item.name 
                                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <item.icon className={`w-4 h-4 ${activeTab === item.name ? 'text-blue-400' : 'text-gray-500'}`} />
                            <span>{item.name}</span>
                        </button>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-800/60">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-xs font-bold hover:bg-red-500/20 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] active:scale-95 transition-all cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Secure Logout</span>
                    </button>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                <header className="h-20 border-b border-gray-800/60 flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-md">
                    <h1 className="text-xl font-bold text-white">Employer Dashboard</h1>
                    
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 border border-blue-500/30 text-xs font-medium rounded-lg text-blue-400 bg-blue-600/10 hover:bg-blue-600/20 active:scale-95 transition-all flex items-center cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.15)]"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        {showForm ? 'Cancel' : 'Post Opportunity'}
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-8 slim-scrollbar">
                    {showForm ? (
                        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6 mb-8 shadow-2xl">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-3">Post a New Opportunity</h2>
                            <form onSubmit={handleCreateOpportunity} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Title</label>
                                        <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Type</label>
                                        <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors">
                                            <option value="Internship">Internship</option>
                                            <option value="Placement">Placement</option>
                                            <option value="Project">Industry Project</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Location</label>
                                        <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Work Mode</label>
                                        <select name="workMode" value={formData.workMode} onChange={handleChange} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors">
                                            <option value="On-site">On-site</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Remote">Remote</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Duration</label>
                                        <input required type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 6 Months" className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Stipend/Salary</label>
                                        <input required type="text" name="stipendOrSalary" value={formData.stipendOrSalary} onChange={handleChange} placeholder="e.g. 15,000/month" className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Required Skills (Comma separated)</label>
                                        <input type="text" name="skillsStr" value={formData.skillsStr} onChange={handleChange} placeholder="e.g. React, Node.js, SQL" className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600" />
                                    </div>
                                </div>
                                <button type="submit" className="mt-6 w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer">
                                    Submit Posting
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-3">Received Applications</h2>
                            {loading ? <p className="text-gray-500 text-sm">Loading applications...</p> : (
                                <div className="space-y-4">
                                    {applications.map(app => (
                                        <div key={app._id} className="p-4 bg-[#0a0a0a] border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-bold text-blue-400">{app.opportunity.title} <span className="text-[10px] text-gray-400 uppercase ml-2 border border-gray-700 px-1.5 py-0.5 rounded">{app.opportunity.type}</span></p>
                                                    <p className="text-xs text-gray-300 mt-1.5">Applicant ID: <span className="font-mono text-gray-500">{app.student?._id || 'Unknown'}</span></p>
                                                    <p className="text-xs text-gray-500 mt-1">CGPA: {app.student?.academicInfo?.cgpa || 'N/A'}</p>
                                                </div>
                                                <div className="text-right flex flex-col items-end">
                                                    <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-900/30 text-green-400 border border-green-500/30 mb-2">
                                                        Match: {app.matchScore}%
                                                    </div>
                                                    <span className={`text-[10px] uppercase tracking-wider font-bold ${app.status === 'Applied' ? 'text-yellow-500' : 'text-blue-500'}`}>
                                                        {app.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {applications.length === 0 && <p className="text-gray-500 text-sm text-center py-8">No applications received yet.</p>}
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};"""

content = re.sub(return_pattern, new_return, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
