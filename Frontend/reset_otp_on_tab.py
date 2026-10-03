import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_effect = """    useEffect(() => {
        // Reset slide to 0 when portal changes
        setCurrentSlide(0);
        setError('');
    }, [portal]);"""
new_effect = """    useEffect(() => {
        // Reset slide to 0 when portal changes
        setCurrentSlide(0);
        setError('');
        
        // Reset OTP state when switching roles
        setOtpSent(false);
        setOtp(['', '', '', '', '', '']);
        setTimeLeft(60);
        setDevOtp('');
    }, [portal]);"""

content = content.replace(old_effect, new_effect)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
