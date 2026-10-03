import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add state variables
state_vars = """    const [devOtp, setDevOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);"""
content = content.replace("    const [devOtp, setDevOtp] = useState('');", state_vars)

# 2. Add Loader import (from lucide-react)
if "Loader2" not in content:
    content = content.replace("ArrowLeft,", "ArrowLeft, Loader2,")

# 3. Update handleSubmit
old_submit = """            } else {
                const otpString = otp.join('');
                const res = await api.post('/auth/verify-otp', { userId, otp: otpString });
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    window.location.href = portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : portal === 'Admin' ? '/admin-dashboard' : portal === 'Faculty' ? '/faculty-dashboard' : '/';
                }
            }"""

new_submit = """            } else {
                const otpString = otp.join('');
                setIsVerifying(true);
                const res = await api.post('/auth/verify-otp', { userId, otp: otpString });
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    
                    // Artificially delay for 4 seconds to show spinner per user request
                    await new Promise(resolve => setTimeout(resolve, 4000));
                    
                    setIsVerifying(false);
                    setLoginSuccess(true);
                    
                    // Wait 1.5s to show the green success state before redirecting
                    setTimeout(() => {
                        window.location.href = portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : portal === 'Admin' ? '/admin-dashboard' : portal === 'Faculty' ? '/faculty-dashboard' : '/';
                    }, 1500);
                } else {
                    setIsVerifying(false);
                }
            }"""
content = content.replace(old_submit, new_submit)

# Also need to make sure we set isVerifying to false on catch
old_catch = """        } catch (err) {
            setError(err.response?.data?.error || 'Invalid OTP or Login failed');
        }"""
new_catch = """        } catch (err) {
            setIsVerifying(false);
            setError(err.response?.data?.error || 'Invalid OTP or Login failed');
        }"""
content = content.replace(old_catch, new_catch)

# 4. Update the Button UI
old_btn = """                                            <button
                                                type="submit"
                                                className="w-full flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-2.5 rounded-lg transition-colors mt-4 text-xs shadow-md shadow-blue-500/30"
                                            >
                                                {otpSent ? (timeLeft > 0 ? 'Login' : 'Resend OTP') : 'Send OTP'}
                                            </button>"""

new_btn = """                                            <button
                                                type="submit"
                                                disabled={isVerifying || loginSuccess}
                                                className={`w-full flex items-center justify-center font-semibold py-2.5 rounded-lg transition-all duration-300 mt-4 text-xs shadow-md ${
                                                    loginSuccess 
                                                    ? 'bg-green-500 text-white shadow-green-500/40 cursor-default' 
                                                    : isVerifying
                                                    ? 'bg-[#1d4ed8] text-white cursor-wait opacity-90'
                                                    : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-blue-500/30'
                                                }`}
                                            >
                                                {loginSuccess ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4 mr-2" /> Login Successful!
                                                    </>
                                                ) : isVerifying ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...
                                                    </>
                                                ) : otpSent ? (
                                                    timeLeft > 0 ? 'Verify & Login' : 'Resend OTP'
                                                ) : (
                                                    'Send OTP'
                                                )}
                                            </button>"""
content = content.replace(old_btn, new_btn)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
