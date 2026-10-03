import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add states
if "const [otpSent, setOtpSent]" not in content:
    content = content.replace("    const [showPassword, setShowPassword] = useState(false);", "    const [showPassword, setShowPassword] = useState(false);\n    const [otpSent, setOtpSent] = useState(false);\n    const [otp, setOtp] = useState('');\n    const [userId, setUserId] = useState(null);")

# Update handleSubmit
old_submit = """    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await login({ email, password, institutionCode, portal });
            if (res.success && res.userId) {
                navigate('/otp-verify', { state: { userId: res.userId } });
            } else if (res.success) {
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        }
    };"""
new_submit = """    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (!otpSent) {
                const res = await login({ email, password, institutionCode, portal });
                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                } else if (res.success) {
                    navigate('/');
                } else {
                    setError('Invalid credentials');
                }
            } else {
                const res = await api.post('/auth/verify-otp', { userId, otp });
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    window.location.href = '/';
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid OTP or Login failed.');
        }
    };"""
content = content.replace(old_submit, new_submit)

# Import api
if "import api from '../services/api';" not in content:
    content = content.replace("import { AuthContext } from '../context/AuthContext';", "import { AuthContext } from '../context/AuthContext';\nimport api from '../services/api';")

# For the forms, I need to find the Submit button and replace it.
# There are multiple buttons.
# `<button type="submit" ... > Login ... </button>`

def replace_button(match):
    full_match = match.group(0)
    # The buttons have `Login` or `Login as {portal}`
    new_btn = full_match.replace("Login", "{otpSent ? 'Login' : 'Send OTP'}")
    new_btn = new_btn.replace("Login as {portal}", "{otpSent ? `Login as ${portal}` : 'Send OTP'}")
    new_btn = new_btn.replace("Login as Faculty/Mentor", "{otpSent ? 'Login as Faculty/Mentor' : 'Send OTP'}")
    return new_btn

content = re.sub(r'<button\s+type="submit"[^>]+>.*?</button>', replace_button, content, flags=re.DOTALL)

# Now, add the OTP input field dynamically just before the submit button in the 4 forms!
# We can find `<button type="submit"` and prepend the OTP input conditionally.
otp_jsx = """
                                            {otpSent && (
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
                                            )}
"""

content = content.replace('<button\n                                                type="submit"', otp_jsx + '\n                                            <button\n                                                type="submit"')
content = content.replace('<button\n                                            type="submit"', otp_jsx + '\n                                        <button\n                                            type="submit"')

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
