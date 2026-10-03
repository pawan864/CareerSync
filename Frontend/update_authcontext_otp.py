import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\context\AuthContext.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_login = """    const login = async (credentials) => {
        const res = await api.post('/auth/login', credentials);
        if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            return true;
        }
        return false;
    };"""
new_login = """    const login = async (credentials) => {
        const res = await api.post('/auth/login', credentials);
        if (res.data.success) {
            if (res.data.userId) {
                // Return userId for OTP flow
                return { success: true, userId: res.data.userId };
            }
            // Fallback if no OTP required
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            return { success: true };
        }
        return { success: false };
    };"""
content = content.replace(old_login, new_login)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\context\AuthContext.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
