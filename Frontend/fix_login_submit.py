import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_submit = """    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const success = await login({ email, password, institutionCode, portal });
            if (success) {
                navigate(portal === 'Recruiter' ? '/employer' : '/');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during login');
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
                    navigate(portal === 'Recruiter' ? '/employer' : '/');
                } else {
                    setError('Invalid credentials');
                }
            } else {
                const res = await api.post('/auth/verify-otp', { userId, otp });
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    window.location.href = portal === 'Recruiter' ? '/employer' : '/';
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid OTP or Login failed');
        }
    };"""

content = content.replace(old_submit, new_submit)

# Let's also check if the disabled property was added to email and password in Login.jsx.
# Since it's a huge file with 4 forms, it's safer to not touch the disabled state if it's too complex,
# but the user said "once user click on send otp automatically add new placeholder of otp and change button name from otp to login".
# We already added the placeholder and changed the button name via previous python script (it succeeded).
# We can just write back the content.

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
