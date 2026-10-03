import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the portal arrays and remove the Link
content = content.replace("['Student', 'Faculty', 'TPO', 'Recruiter']", "['Student', 'Faculty', 'TPO', 'Recruiter', 'Admin']")
content = re.sub(r'<Link to="/admin-login".*?</Link>', '', content, flags=re.DOTALL)

# 2. Redirect on login
content = content.replace(
    "navigate(portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : '/');",
    "navigate(portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : portal === 'Admin' ? '/admin-dashboard' : '/');"
)
content = content.replace(
    "window.location.href = portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : '/';",
    "window.location.href = portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : portal === 'Admin' ? '/admin-dashboard' : '/';"
)

# 3. Add Admin Layout
# Find where TPO layout ends.
# It ends with:
#                                 </div>
#                             </>
#                         )}
#                     </motion.div>
#                 </AnimatePresence>

# We need to change the TPO fallback into `portal === 'TPO' ? ( <> TPO Layout </> ) : ( <> Admin Layout </> )`
# First, let's find the start of TPO layout:
#                         ) : (
#                             <>
#                                 {/* TPO Layout */}

content = content.replace(
    """) : (
                            <>
                                {/* TPO Layout */}""",
    """) : portal === 'TPO' ? (
                            <>
                                {/* TPO Layout */}"""
)

admin_layout = """                            </>
                        ) : (
                            <>
                                {/* ADMIN Layout */}
                                <div className="hidden lg:flex lg:w-1/2 flex-col relative bg-[#050505] overflow-hidden items-center justify-center p-14">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-black/80 to-[#050505] z-10"></div>
                                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" alt="Cyber Security" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-overlay" />
                                    <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-red-600/20 rounded-full blur-[100px] pointer-events-none z-10" />
                                    
                                    <div className="relative z-20 w-full text-center">
                                        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-[0_0_30px_rgba(220,38,38,0.3)] border border-red-500/30">
                                            <ShieldCheck className="w-10 h-10 text-white" />
                                        </div>
                                        <h1 className="text-4xl font-bold mb-3 leading-tight text-white drop-shadow-md tracking-tight">System Control<br/>Center</h1>
                                        <p className="text-gray-400 text-sm font-medium">Authorized Personnel Only</p>
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-[#050505] flex flex-col relative overflow-y-auto slim-scrollbar">
                                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />
                                    
                                    <div className="flex justify-between items-center mb-6 mt-4 lg:mt-0 relative z-20">
                                        <div className="flex p-1 bg-[#121212] rounded-lg w-fit border border-gray-800">
                                            {['Student', 'Faculty', 'TPO', 'Recruiter', 'Admin'].map((p) => (
                                                <button 
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPortal(p)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                                                        portal === p 
                                                            ? 'bg-red-900/50 text-red-200 border border-red-500/30 shadow-[0_0_10px_rgba(220,38,38,0.2)]' 
                                                            : 'text-gray-500 hover:text-gray-300'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto relative z-20">
                                        <div className="flex flex-col items-center lg:items-start mb-6">
                                            <div className="w-12 h-12 bg-red-950/50 rounded-full flex items-center justify-center mb-3 text-red-500 border border-red-900/50">
                                                <ShieldCheck className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-white text-2xl font-bold mb-1 tracking-tight">Admin Login</h2>
                                            <p className="text-gray-500 text-xs">Enter your master credentials</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {error && (
                                                <div className="bg-red-950/50 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium">
                                                    {error}
                                                </div>
                                            )}
                                            {successMsg && (
                                                <div className="bg-green-950/50 border border-green-500/50 text-green-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium mt-2">
                                                    {successMsg}
                                                </div>
                                            )}

                                            <div>
                                                <label className="block text-gray-400 text-xs font-semibold mb-1.5">Master Email</label>
                                                <div className="relative flex items-center w-full px-3 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg focus-within:ring-1 focus-within:ring-red-500/70 focus-within:border-red-500/70 transition-all">
                                                    <Mail className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0" />
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="admin@careersync.com"
                                                        className="w-full bg-transparent text-white focus:outline-none text-xs placeholder-gray-700"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <label className="block text-gray-400 text-xs font-semibold">Master Password</label>
                                                </div>
                                                <div className="relative flex items-center justify-between w-full px-3 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg focus-within:ring-1 focus-within:ring-red-500/70 focus-within:border-red-500/70 transition-all">
                                                    <div className="flex items-center flex-1">
                                                        <Lock className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0" />
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            required
                                                            placeholder="Enter master password"
                                                            className="w-full bg-transparent text-white focus:outline-none text-xs placeholder-gray-700"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-600 hover:text-gray-400 focus:outline-none ml-2">
                                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-6 text-xs shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                                            >
                                                Authenticate <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                            </button>
                                        </form>
                                    </div>
                                </div>"""

# Insert the Admin Layout before the closing tags
content = content.replace("""                                </div>
                            </>
                        )}
                    </motion.div>""", admin_layout + """
                            </>
                        )}
                    </motion.div>""")


with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
