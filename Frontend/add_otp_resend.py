import re

# UPDATE LOGIN.JSX
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update handleSubmit
old_submit = """            if (!otpSent) {
                const res = await login({ email, password, institutionCode, portal });
                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    if (res.otp) {
                        setDevOtp(res.otp);
                        setTimeout(() => setDevOtp(''), 15000); // hide after 15s
                    }
                } else if (res.success) {
                    navigate(portal === 'Recruiter' ? '/employer' : '/');
                } else {
                    setError('Invalid credentials');
                }
            } else {"""
new_submit = """            if (!otpSent || timeLeft === 0) {
                const res = await login({ email, password, institutionCode, portal });
                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    setOtp(['', '', '', '', '', '']); // clear old OTP
                    if (res.otp) {
                        setDevOtp(res.otp);
                        setTimeout(() => setDevOtp(''), 15000); // hide after 15s
                    }
                } else if (res.success) {
                    navigate(portal === 'Recruiter' ? '/employer' : '/');
                } else {
                    setError('Invalid credentials');
                }
            } else {"""
content = content.replace(old_submit, new_submit)

# Hide boxes when time over
content = content.replace("{otpSent && (", "{otpSent && timeLeft > 0 && (")

# Update button texts
content = content.replace("{otpSent ? 'Login' : 'Send OTP'}", "{otpSent ? (timeLeft > 0 ? 'Login' : 'Resend OTP') : 'Send OTP'}")
content = content.replace("{otpSent ? `Login as ${portal}` : 'Send OTP'}", "{otpSent ? (timeLeft > 0 ? `Login as ${portal}` : 'Resend OTP') : 'Send OTP'}")
content = content.replace("{otpSent ? 'Login as Faculty/Mentor' : 'Send OTP'}", "{otpSent ? (timeLeft > 0 ? 'Login as Faculty/Mentor' : 'Resend OTP') : 'Send OTP'}")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)


# UPDATE ADMINLOGIN.JSX
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

old_admin_submit = """            if (!otpSent) {
                const res = await login({ email, password, portal: 'Admin' });
                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    setIsSubmitting(false);
                    if (res.otp) {
                        setDevOtp(res.otp);
                        setTimeout(() => setDevOtp(''), 15000); // hide after 15s
                    }
                } else if (res.success) {
                    setTimeout(() => navigate('/admin-dashboard'), 800);
                } else {
                    setError('Invalid Admin credentials');
                    setIsSubmitting(false);
                }
            } else {"""
new_admin_submit = """            if (!otpSent || timeLeft === 0) {
                const res = await login({ email, password, portal: 'Admin' });
                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setTimeLeft(60);
                    setOtp(['', '', '', '', '', '']); // clear old OTP
                    setIsSubmitting(false);
                    if (res.otp) {
                        setDevOtp(res.otp);
                        setTimeout(() => setDevOtp(''), 15000); // hide after 15s
                    }
                } else if (res.success) {
                    setTimeout(() => navigate('/admin-dashboard'), 800);
                } else {
                    setError('Invalid Admin credentials');
                    setIsSubmitting(false);
                }
            } else {"""
admin_content = admin_content.replace(old_admin_submit, new_admin_submit)

# Hide boxes when time over
admin_content = admin_content.replace("{otpSent && (", "{otpSent && timeLeft > 0 && (")

# Update button text
admin_content = admin_content.replace('otpSent ? "Verifying..." : "Sending OTP..."', 'otpSent ? (timeLeft > 0 ? "Verifying..." : "Resending...") : "Sending OTP..."')
admin_content = admin_content.replace('otpSent ? "Login" : "Send OTP"', 'otpSent ? (timeLeft > 0 ? "Login" : "Resend OTP") : "Send OTP"')

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
