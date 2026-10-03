import re

path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\InstitutionDashboard.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure lucide-react has necessary icons
if 'import { LogOut } from' not in content:
    content = content.replace("import { Users, Briefcase, CheckCircle, TrendingUp, BarChart2 , LogOut } from 'lucide-react';", "import { Users, Briefcase, CheckCircle, TrendingUp, BarChart2, LogOut, LayoutDashboard, Settings } from 'lucide-react';")

# Also import motion
if 'import { motion } from' not in content:
    content = content.replace("import React,", "import { motion } from 'framer-motion';\nimport React,")

# Replace return block
return_pattern = r'return \(\s*<div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">[\s\S]*?\);\n\};'

new_return = """    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="h-screen overflow-hidden bg-[#050505] flex">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[40%] bg-purple-900/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Sidebar */}
            <motion.div 
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                className="w-64 bg-[#0a0a0a] border-r border-gray-800/60 flex flex-col relative z-20 shadow-2xl"
            >
                {/* Brand */}
                <div className="h-20 flex items-center px-6 border-b border-gray-800/60">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-md shadow-purple-500/20">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white">Career<span className="text-purple-500">Sync</span></h2>
                        <span className="text-[10px] uppercase tracking-widest text-purple-400 font-semibold">TPO Console</span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 py-6 px-4 space-y-1">
                    {[
                        { name: 'Overview', icon: LayoutDashboard },
                        { name: 'Students', icon: Users },
                        { name: 'Placements', icon: Briefcase },
                        { name: 'Reports', BarChart2 },
                        { name: 'Settings', icon: Settings }
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 active:scale-95 cursor-pointer ${
                                activeTab === item.name 
                                ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            {item.icon && <item.icon className={`w-4 h-4 ${activeTab === item.name ? 'text-purple-400' : 'text-gray-500'}`} />}
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
                <header className="h-20 border-b border-gray-800/60 flex items-center px-8 bg-[#0a0a0a]/50 backdrop-blur-md">
                    <h1 className="text-xl font-bold text-white">Institution Analytics</h1>
                </header>

                <main className="flex-1 overflow-y-auto p-8 slim-scrollbar">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 p-6 rounded-2xl shadow-lg flex items-center space-x-4">
                            <div className="p-3 bg-blue-900/30 text-blue-400 border border-blue-500/20 rounded-xl">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Students</p>
                                <p className="text-2xl font-bold text-white">{overview.totalStudents}</p>
                            </div>
                        </div>
                        
                        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 p-6 rounded-2xl shadow-lg flex items-center space-x-4">
                            <div className="p-3 bg-purple-900/30 text-purple-400 border border-purple-500/20 rounded-xl">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Opportunities</p>
                                <p className="text-2xl font-bold text-white">{overview.totalOpportunities}</p>
                            </div>
                        </div>

                        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 p-6 rounded-2xl shadow-lg flex items-center space-x-4">
                            <div className="p-3 bg-yellow-900/30 text-yellow-400 border border-yellow-500/20 rounded-xl">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Applications</p>
                                <p className="text-2xl font-bold text-white">{overview.totalApplications}</p>
                            </div>
                        </div>

                        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 p-6 rounded-2xl shadow-lg flex items-center space-x-4">
                            <div className="p-3 bg-green-900/30 text-green-400 border border-green-500/20 rounded-xl">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Placed</p>
                                <p className="text-2xl font-bold text-white">{overview.totalPlaced}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Application Status Chart/List */}
                        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl shadow-lg p-6">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center border-b border-gray-800 pb-3">
                                <BarChart2 className="h-5 w-5 mr-2 text-purple-400" />
                                Application Pipeline
                            </h2>
                            <div className="space-y-4">
                                {applicationStatus.map((status, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-gray-800 rounded-xl">
                                        <span className="text-sm font-medium text-gray-300">{status._id}</span>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-purple-900/20 text-purple-400 border border-purple-500/20">
                                            {status.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Skills */}
                        <div className="bg-[#121212]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl shadow-lg p-6">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center border-b border-gray-800 pb-3">
                                <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                                In-Demand Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {topRequiredSkills.map((skill, index) => (
                                    <div key={index} className="flex items-center bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2">
                                        <span className="text-sm font-medium text-gray-300 mr-3">{skill._id}</span>
                                        <span className="text-xs font-bold text-blue-400 bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-500/20">{skill.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};"""

content = re.sub(return_pattern, new_return, content)

# I need to fix { name: 'Reports', BarChart2 } to { name: 'Reports', icon: BarChart2 } in the new_return string!
content = content.replace("{ name: 'Reports', BarChart2 },", "{ name: 'Reports', icon: BarChart2 },")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
