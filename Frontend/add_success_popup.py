import re

# UPDATE LOGIN.JSX
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add state
if "const [successMsg, setSuccessMsg] = useState('');" not in content:
    content = content.replace("const [error, setError] = useState('');", "const [error, setError] = useState('');\n    const [successMsg, setSuccessMsg] = useState('');")

# 2. Update auto-clear effect
old_effect = """    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);"""
new_effect = """    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);"""
if "if (successMsg)" not in content:
    content = content.replace(old_effect, new_effect)

# 3. Update handleSubmit
old_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    setOtp(['', '', '', '', '', '']); // clear old OTP
                    if (res.otp) {"""
new_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    setOtp(['', '', '', '', '', '']); // clear old OTP
                    setSuccessMsg('OTP has been sent successfully to your registered mail id');
                    if (res.otp) {"""
content = content.replace(old_submit, new_submit)

# 4. Render success box alongside error box (which appears multiple times in Login.jsx)
success_box_1 = """                                              {error && (
                                                  <div className="bg-red-900/50 border border-red-500 text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium">
                                                      {error}
                                                  </div>
                                              )}
                                              {successMsg && (
                                                  <div className="bg-green-900/50 border border-green-500 text-green-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium">
                                                      {successMsg}
                                                  </div>
                                              )}"""
content = content.replace("""                                              {error && (
                                                  <div className="bg-red-900/50 border border-red-500 text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium">
                                                      {error}
                                                  </div>
                                              )}""", success_box_1)

success_box_2 = """                                              {error && (
                                                  <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-md text-[11px] text-center font-medium">
                                                      {error}
                                                  </div>
                                              )}
                                              {successMsg && (
                                                  <div className="bg-green-50 border border-green-200 text-green-600 px-3 py-1.5 rounded-md text-[11px] text-center font-medium">
                                                      {successMsg}
                                                  </div>
                                              )}"""
content = content.replace("""                                              {error && (
                                                  <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-md text-[11px] text-center font-medium">
                                                      {error}
                                                  </div>
                                              )}""", success_box_2)


with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)


# UPDATE ADMINLOGIN.JSX
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

if "const [successMsg, setSuccessMsg] = useState('');" not in admin_content:
    admin_content = admin_content.replace("const [error, setError] = useState('');", "const [error, setError] = useState('');\n    const [successMsg, setSuccessMsg] = useState('');")

if "if (successMsg)" not in admin_content:
    admin_content = admin_content.replace(old_effect, new_effect)

old_admin_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    setOtp(['', '', '', '', '', '']); // clear old OTP
                    setIsSubmitting(false);"""
new_admin_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    setOtp(['', '', '', '', '', '']); // clear old OTP
                    setSuccessMsg('OTP has been sent successfully to your registered mail id');
                    setIsSubmitting(false);"""
admin_content = admin_content.replace(old_admin_submit, new_admin_submit)

admin_success_box = """                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="bg-red-950/50 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium flex items-center justify-center"
                            >
                                {error}
                            </motion.div>
                        )}
                        {successMsg && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="bg-green-950/50 border border-green-500/50 text-green-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium flex items-center justify-center"
                            >
                                {successMsg}
                            </motion.div>
                        )}"""

admin_content = admin_content.replace("""                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="bg-red-950/50 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium flex items-center justify-center"
                            >
                                {error}
                            </motion.div>
                        )}""", admin_success_box)

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
