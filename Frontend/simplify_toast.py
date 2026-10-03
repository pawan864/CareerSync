import re

# 1. Update Backend (1 min expiry)
auth_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js'
with open(auth_path, 'r', encoding='utf-8') as f:
    auth_content = f.read()

auth_content = auth_content.replace("user.loginOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes", "user.loginOtpExpire = Date.now() + 1 * 60 * 1000; // 1 minute")

with open(auth_path, 'w', encoding='utf-8') as f:
    f.write(auth_content)


# 2. Update Login.jsx Toast
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    login_content = f.read()

old_toast = """            {/* Custom Interactive Dev OTP Toast */}
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
            </AnimatePresence>"""

new_toast = """            {/* Custom Interactive Dev OTP Toast */}
            <AnimatePresence>
                {devOtp && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="fixed top-8 right-8 z-[100] bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-xl p-4 min-w-[200px] flex flex-col items-center gap-1"
                    >
                        <button onClick={() => setDevOtp('')} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                            <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-1">Your OTP Code</div>
                        <div className="text-center tracking-[0.3em] font-mono text-3xl font-black text-gray-800">
                            {devOtp}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-medium mt-1 uppercase tracking-wider">
                            <AlertCircle className="w-3 h-3 text-orange-500" />
                            Valid for 1 Min
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>"""

login_content = login_content.replace(old_toast, new_toast)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login_content)


# 3. Update AdminLogin.jsx Toast
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

old_admin_toast = """            {/* Custom Interactive Dev OTP Toast */}
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
            </AnimatePresence>"""

new_admin_toast = """            {/* Custom Interactive Dev OTP Toast */}
            <AnimatePresence>
                {devOtp && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="fixed top-8 right-8 z-[100] bg-[#0a0a0a]/95 backdrop-blur-md border border-red-900/50 shadow-2xl shadow-red-900/20 rounded-xl p-4 min-w-[200px] flex flex-col items-center gap-1"
                    >
                        <button onClick={() => setDevOtp('')} className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors">
                            <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="text-red-500 text-[10px] font-bold tracking-widest uppercase mb-1">Admin Auth Code</div>
                        <div className="text-center tracking-[0.3em] font-mono text-3xl font-black text-white">
                            {devOtp}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-medium mt-1 uppercase tracking-wider">
                            <AlertCircle className="w-3 h-3 text-red-500 animate-pulse" />
                            Valid for 1 Min
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>"""

admin_content = admin_content.replace(old_admin_toast, new_admin_toast)

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
