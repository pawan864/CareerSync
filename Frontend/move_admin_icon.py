import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the Admin Portal link from the bottom footer
old_footer = """            {!showSupport && (
                <div className="mt-4 text-center z-20 flex flex-col items-center gap-3">
                    <p className="text-xs font-medium text-gray-800 drop-shadow-sm">
                        Need assistance? <button onClick={() => setShowSupport(true)} className="font-bold text-blue-900 hover:underline transition-colors cursor-pointer">Contact Technical Support</button>
                    </p>
                    <Link to="/admin-login" className="flex items-center text-[10px] font-bold tracking-widest uppercase text-gray-700/60 hover:text-gray-900 transition-colors bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30 shadow-sm">
                        <ShieldCheck className="w-3 h-3 mr-1.5 text-gray-700/60 group-hover:text-gray-900" /> Admin Portal
                    </Link>
                </div>
            )}"""
new_footer = """            {!showSupport && (
                <div className="mt-3 text-center z-20">
                <p className="text-xs font-medium text-gray-800 drop-shadow-sm">
                    Need assistance? <button onClick={() => setShowSupport(true)} className="font-bold text-blue-900 hover:underline transition-colors cursor-pointer">Contact Technical Support</button>
                </p>
                </div>
            )}"""
content = content.replace(old_footer, new_footer)

# Add the link to the Student layout
old_student_tabs = """                                            {['Student', 'Faculty', 'TPO', 'Recruiter'].map((p) => (
                                                <button 
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPortal(p)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                                        portal === p 
                                                            ? 'bg-[#9b72f0] text-white shadow-sm' 
                                                            : 'text-gray-400 hover:text-gray-200'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}"""
new_student_tabs = """                                            {['Student', 'Faculty', 'TPO', 'Recruiter'].map((p) => (
                                                <button 
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPortal(p)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                                        portal === p 
                                                            ? 'bg-[#9b72f0] text-white shadow-sm' 
                                                            : 'text-gray-400 hover:text-gray-200'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                            <Link to="/admin-login" className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 text-gray-400 hover:text-white flex items-center ml-1">
                                                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin
                                            </Link>"""
content = content.replace(old_student_tabs, new_student_tabs)

# Add the link to the Faculty layout
old_faculty_tabs = """                                            {['Student', 'Faculty', 'TPO', 'Recruiter'].map((p) => (
                                                <button 
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPortal(p)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                                        portal === p 
                                                            ? 'bg-[#047857] text-white shadow-sm' 
                                                            : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}"""
new_faculty_tabs = """                                            {['Student', 'Faculty', 'TPO', 'Recruiter'].map((p) => (
                                                <button 
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPortal(p)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                                        portal === p 
                                                            ? 'bg-[#047857] text-white shadow-sm' 
                                                            : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                            <Link to="/admin-login" className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 text-gray-500 hover:text-[#047857] flex items-center ml-1">
                                                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin
                                            </Link>"""
content = content.replace(old_faculty_tabs, new_faculty_tabs)

# Add the link to the TPO layout
old_tpo_tabs = """                                            {['Student', 'Faculty', 'TPO', 'Recruiter'].map((p) => (
                                                <button 
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPortal(p)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                                        portal === p 
                                                            ? 'bg-[#1e40af] text-white shadow-sm' 
                                                            : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}"""
new_tpo_tabs = """                                            {['Student', 'Faculty', 'TPO', 'Recruiter'].map((p) => (
                                                <button 
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPortal(p)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                                        portal === p 
                                                            ? 'bg-[#1e40af] text-white shadow-sm' 
                                                            : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                            <Link to="/admin-login" className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 text-gray-500 hover:text-[#1e40af] flex items-center ml-1">
                                                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin
                                            </Link>"""
content = content.replace(old_tpo_tabs, new_tpo_tabs)

# Add the link to the Recruiter layout
old_rec_tabs = """                                            {['Student', 'Faculty', 'TPO', 'Recruiter'].map((p) => (
                                                <button 
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPortal(p)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                                        portal === p 
                                                            ? 'bg-white text-blue-600 shadow-sm' 
                                                            : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}"""
new_rec_tabs = """                                            {['Student', 'Faculty', 'TPO', 'Recruiter'].map((p) => (
                                                <button 
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPortal(p)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                                        portal === p 
                                                            ? 'bg-white text-blue-600 shadow-sm' 
                                                            : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                            <Link to="/admin-login" className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 text-gray-500 hover:text-blue-600 flex items-center ml-1">
                                                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin
                                            </Link>"""
content = content.replace(old_rec_tabs, new_rec_tabs)


with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
