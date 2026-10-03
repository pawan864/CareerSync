import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Destructure user
content = content.replace("const { logout } = useContext(AuthContext);", "const { logout, user } = useContext(AuthContext);")

# Add state
content = content.replace("const [activeTab, setActiveTab] = useState('profile');", "const [activeTab, setActiveTab] = useState('profile');\n    const [isDropdownOpen, setIsDropdownOpen] = useState(false);")

# Replace header block
old_header = """
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col text-right mr-2">
                            <span className="text-sm font-medium text-blue-900">Student User</span>
                            <span className="text-xs text-blue-600 font-medium font-medium uppercase flex items-center justify-end">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> Online
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm border-2 border-white">
                            S
                        </div>
                    </div>
"""

new_header = """
                    <div className="flex items-center space-x-4 relative">
                        <div className="flex flex-col text-right mr-2">
                            <span className="text-sm font-semibold text-blue-900">{user?.name || 'Student Name'}</span>
                            <span className="text-xs text-blue-600 font-medium uppercase flex items-center justify-end">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> Online
                            </span>
                        </div>
                        <div 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-md border-2 border-white cursor-pointer hover:shadow-lg transition-all"
                        >
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        
                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-14 right-0 w-48 bg-white rounded-md shadow-lg border border-blue-100 py-2 z-50"
                                >
                                    <div className="px-4 py-2 border-b border-blue-50 mb-1">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || 'Student'}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email || 'student@careersync.com'}</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setActiveTab('profile');
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors flex items-center"
                                    >
                                        <User className="w-4 h-4 mr-2 text-blue-500" /> My Profile
                                    </button>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" /> Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
"""
# Need to use regex because the HTML might have slightly different spacing due to my previous AI typography script replacement.
content = re.sub(r'<div className="flex items-center space-x-4">.*?</div>\s*</div>', new_header.strip(), content, flags=re.DOTALL)

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)

