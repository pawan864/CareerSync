import re

# UPDATE LOGIN.JSX
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add timer state and effect
if "const [timeLeft, setTimeLeft] = useState(60);" not in content:
    content = content.replace("const [devOtp, setDevOtp] = useState('');", "const [devOtp, setDevOtp] = useState('');\n    const [timeLeft, setTimeLeft] = useState(60);")

timer_effect = """
    useEffect(() => {
        let timer;
        if (otpSent && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [otpSent, timeLeft]);
"""
if "setTimeLeft(prev => prev - 1)" not in content:
    content = content.replace("    const slides = [", timer_effect + "\n    const slides = [")

# 2. Reset timer when sending OTP
old_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);"""
new_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);"""
content = content.replace(old_submit, new_submit)

# 3. Add timer below the 6 boxes in the form
old_otp_block = """                                                    <div className="flex justify-between items-center gap-2 mb-2">
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
new_otp_block = """                                                    <div className="flex justify-between items-center gap-2 mb-2">
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
                                                    <div className="flex justify-center items-center mt-3 mb-2">
                                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${timeLeft > 0 ? 'bg-orange-100 text-orange-600 border border-orange-200' : 'bg-red-100 text-red-600 border border-red-200'}`}>
                                                            {timeLeft > 0 ? `Valid for 00:${timeLeft.toString().padStart(2, '0')}` : 'OTP Expired'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}"""
content = content.replace(old_otp_block, new_otp_block)

# 4. Remove 'Valid for 1 Min' from the Toast
old_toast = """                        <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-medium mt-1 uppercase tracking-wider">
                            <AlertCircle className="w-3 h-3 text-orange-500" />
                            Valid for 1 Min
                        </div>"""
content = content.replace(old_toast, "")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)


# UPDATE ADMINLOGIN.JSX
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

if "const [timeLeft, setTimeLeft] = useState(60);" not in admin_content:
    admin_content = admin_content.replace("const [devOtp, setDevOtp] = useState('');", "const [devOtp, setDevOtp] = useState('');\n    const [timeLeft, setTimeLeft] = useState(60);")

if "setTimeLeft(prev => prev - 1)" not in admin_content:
    admin_content = admin_content.replace("    const handleSubmit = async (e) => {", timer_effect + "\n    const handleSubmit = async (e) => {")

old_admin_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setIsSubmitting(false);"""
new_admin_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    setIsSubmitting(false);"""
admin_content = admin_content.replace(old_admin_submit, new_admin_submit)

old_admin_otp_block = """                                <div className="flex justify-between items-center gap-2 mb-2">
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
                        )}"""
new_admin_otp_block = """                                <div className="flex justify-between items-center gap-2 mb-2">
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
                                <div className="flex justify-center mt-4">
                                    <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded border uppercase ${timeLeft > 0 ? 'bg-red-950/30 text-red-500 border-red-900/50' : 'bg-red-900 text-white border-red-500'}`}>
                                        {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, '0')} REMAINING` : 'OTP EXPIRED'}
                                    </span>
                                </div>
                            </motion.div>
                        )}"""
admin_content = admin_content.replace(old_admin_otp_block, new_admin_otp_block)

old_admin_toast = """                        <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-medium mt-1 uppercase tracking-wider">
                            <AlertCircle className="w-3 h-3 text-red-500 animate-pulse" />
                            Valid for 1 Min
                        </div>"""
admin_content = admin_content.replace(old_admin_toast, "")

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
