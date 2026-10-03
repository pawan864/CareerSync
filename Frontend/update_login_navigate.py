import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_submit = """    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await login({ email, password, institutionCode, portal });
            if (success) {
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
content = content.replace(old_submit, new_submit)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx', 'r', encoding='utf-8') as f:
    admin_content = f.read()

old_admin_submit = """        try {
            const success = await login({ email, password, portal: 'Admin' });
            if (success) {
                setTimeout(() => navigate('/admin-dashboard'), 800); // slight delay for cool effect
            } else {
                setError('Invalid Admin credentials');
                setIsSubmitting(false);
            }"""
new_admin_submit = """        try {
            const res = await login({ email, password, portal: 'Admin' });
            if (res.success && res.userId) {
                setTimeout(() => navigate('/otp-verify', { state: { userId: res.userId } }), 800); // slight delay for cool effect
            } else if (res.success) {
                setTimeout(() => navigate('/admin-dashboard'), 800);
            } else {
                setError('Invalid Admin credentials');
                setIsSubmitting(false);
            }"""
admin_content = admin_content.replace(old_admin_submit, new_admin_submit)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx', 'w', encoding='utf-8') as f:
    f.write(admin_content)
