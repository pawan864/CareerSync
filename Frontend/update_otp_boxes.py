import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update State
content = content.replace("const [otp, setOtp] = useState('');", "const [otp, setOtp] = useState(['', '', '', '', '', '']);")

# 2. Add handlers
handlers = """    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };"""

if "const handleOtpChange" not in content:
    content = content.replace("    const { login } = useContext(AuthContext);", handlers + "\n    const { login } = useContext(AuthContext);")

# 3. Update handleSubmit
old_verify = "const res = await api.post('/auth/verify-otp', { userId, otp });"
new_verify = "const otpString = otp.join('');\n                const res = await api.post('/auth/verify-otp', { userId, otp: otpString });"
content = content.replace(old_verify, new_verify)

# 4. Replace the OTP input block
old_otp_block = """                                            {otpSent && (
                                                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            required
                                                            maxLength="6"
                                                            placeholder="Enter 6-digit OTP"
                                                            className="w-full bg-white/5 border border-blue-400/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm text-center tracking-[0.5em] font-mono shadow-sm"
                                                            style={{ WebkitBoxShadow: '0 0 0px 1000px transparent inset' }}
                                                            value={otp}
                                                            onChange={(e) => setOtp(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            )}"""

new_otp_block = """                                            {otpSent && (
                                                <div className="mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <label className="block text-gray-600 text-xs font-semibold mb-2 text-center uppercase tracking-wider">Enter 6-Digit OTP</label>
                                                    <div className="flex justify-between items-center gap-2 mb-2">
                                                        {otp.map((data, index) => (
                                                            <input
                                                                key={index}
                                                                type="text"
                                                                name="otp"
                                                                maxLength="1"
                                                                className="w-10 h-12 text-center text-lg font-bold text-gray-800 bg-white/80 border border-gray-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm"
                                                                value={data}
                                                                onChange={e => handleOtpChange(e.target, index)}
                                                                onKeyDown={e => handleOtpKeyDown(e, index)}
                                                                onFocus={e => e.target.select()}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}"""
content = content.replace(old_otp_block, new_otp_block)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

# AdminLogin.jsx
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

admin_content = admin_content.replace("const [otp, setOtp] = useState('');", "const [otp, setOtp] = useState(['', '', '', '', '', '']);")

if "const handleOtpChange" not in admin_content:
    admin_content = admin_content.replace("    const { login } = useContext(AuthContext);", handlers + "\n    const { login } = useContext(AuthContext);")

old_admin_verify = "const res = await api.post('/auth/verify-otp', { userId, otp });"
new_admin_verify = "const otpString = otp.join('');\n                const res = await api.post('/auth/verify-otp', { userId, otp: otpString });"
admin_content = admin_content.replace(old_admin_verify, new_admin_verify)

old_admin_otp_block = """                    <AnimatePresence>
                        {otpSent && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                            >
                                <label className="block text-gray-400 text-[10px] font-bold mb-1.5 uppercase tracking-widest mt-1">6-Digit OTP</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <ShieldCheck className="h-4 w-4 text-red-500 animate-pulse" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        maxLength="6"
                                        style={{ WebkitBoxShadow: '0 0 0px 1000px #0f0f0f inset', WebkitTextFillColor: '#f3f4f6' }}
                                        className="w-full bg-[#0f0f0f] border border-red-500/50 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm hover:border-red-500/70 shadow-inner tracking-[0.5em] font-mono"
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>"""

new_admin_otp_block = """                    <AnimatePresence>
                        {otpSent && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="pt-2"
                            >
                                <label className="block text-gray-400 text-[10px] font-bold mb-3 uppercase tracking-widest text-center">Enter 6-Digit OTP</label>
                                <div className="flex justify-between items-center gap-2 mb-2">
                                    {otp.map((data, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            name="otp"
                                            maxLength="1"
                                            className="w-11 h-12 text-center text-xl font-mono font-bold text-white bg-[#0f0f0f] border border-gray-800 rounded-xl focus:bg-[#151515] focus:ring-1 focus:ring-red-500/70 focus:border-red-500/70 transition-all outline-none shadow-inner"
                                            value={data}
                                            onChange={e => handleOtpChange(e.target, index)}
                                            onKeyDown={e => handleOtpKeyDown(e, index)}
                                            onFocus={e => e.target.select()}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>"""

admin_content = admin_content.replace(old_admin_otp_block, new_admin_otp_block)

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
