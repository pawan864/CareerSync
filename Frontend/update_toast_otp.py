import re

# Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    login_content = f.read()

# Remove window.alert
old_alert = """                    if (res.otp) {
                        setTimeout(() => window.alert(`[DEVELOPMENT MODE]\n\nYour OTP is: ${res.otp}\n\n(This popup will be removed in production)`), 500);
                    }"""
new_alert = """                    if (res.otp) {
                        setDevOtp(res.otp);
                        setTimeout(() => setDevOtp(''), 15000); // hide after 15s
                    }"""
login_content = login_content.replace(old_alert, new_alert)

# Add devOtp state
if "const [devOtp, setDevOtp]" not in login_content:
    login_content = login_content.replace("const [otp, setOtp] = useState(['', '', '', '', '', '']);", "const [otp, setOtp] = useState(['', '', '', '', '', '']);\n    const [devOtp, setDevOtp] = useState('');")

# Add the toast UI before the closing div
toast_ui = """
            {/* Custom Interactive Dev OTP Toast */}
            <AnimatePresence>
                {devOtp && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-8 right-8 z-[100] bg-white border-l-4 border-blue-500 shadow-2xl rounded-lg p-5 max-w-sm flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                                <AlertCircle className="w-4 h-4" />
                                DEVELOPMENT MODE
                            </div>
                            <button onClick={() => setDevOtp('')} className="text-gray-400 hover:text-gray-600">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-gray-600 text-sm">Simulated Email Received. Your OTP is:</p>
                        <div className="bg-gray-100 rounded-md py-3 text-center tracking-[0.5em] font-mono text-2xl font-bold text-gray-800 shadow-inner">
                            {devOtp}
                        </div>
                        <p className="text-gray-400 text-xs italic mt-1 text-center">This popup will be replaced by a real email in production.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
"""

# Import X if not imported
if " X " not in login_content and ", X," not in login_content:
    login_content = login_content.replace("Eye, EyeOff,", "Eye, EyeOff, X,")

login_content = login_content.replace("        </div>\n    );\n};\n\nexport default Login;", toast_ui + "\n    );\n};\n\nexport default Login;")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login_content)

# Update AdminLogin.jsx
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

admin_content = admin_content.replace(old_alert, new_alert)

if "const [devOtp, setDevOtp]" not in admin_content:
    admin_content = admin_content.replace("const [otp, setOtp] = useState(['', '', '', '', '', '']);", "const [otp, setOtp] = useState(['', '', '', '', '', '']);\n    const [devOtp, setDevOtp] = useState('');")

admin_toast_ui = """
            {/* Custom Interactive Dev OTP Toast */}
            <AnimatePresence>
                {devOtp && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-8 right-8 z-[100] bg-[#121212] border-l-4 border-red-600 shadow-2xl shadow-red-900/20 rounded-lg p-5 max-w-sm flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                                <AlertCircle className="w-4 h-4 animate-pulse" />
                                SECURE DEVELOPMENT MODE
                            </div>
                            <button onClick={() => setDevOtp('')} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm">Intercepted Admin OTP Transmission:</p>
                        <div className="bg-black border border-gray-800 rounded-md py-3 text-center tracking-[0.5em] font-mono text-2xl font-bold text-white shadow-inner">
                            {devOtp}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
"""

if " X " not in admin_content and ", X," not in admin_content:
    admin_content = admin_content.replace("Eye, EyeOff,", "Eye, EyeOff, X, AlertCircle,")

admin_content = admin_content.replace("        </motion.div>\n    );\n};\n\nexport default AdminLogin;", admin_toast_ui + "\n    );\n};\n\nexport default AdminLogin;")

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
