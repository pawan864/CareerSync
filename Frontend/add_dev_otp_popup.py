import re

# 1. Update Backend authController.js
auth_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js'
with open(auth_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_json = """        res.status(200).json({ 
            success: true, 
            message: 'Please check your mail. OTP sent.', 
            userId: user._id 
        });"""
new_json = """        res.status(200).json({ 
            success: true, 
            message: 'Please check your mail. OTP sent.', 
            userId: user._id,
            otp: otp // DEV ONLY: send OTP in response for popup
        });"""
content = content.replace(old_json, new_json)

with open(auth_path, 'w', encoding='utf-8') as f:
    f.write(content)


# 2. Update Frontend AuthContext.jsx
context_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\context\AuthContext.jsx'
with open(context_path, 'r', encoding='utf-8') as f:
    context = f.read()

old_login_return = """        if (res.data.success) {
            if (res.data.userId) {
                // Return userId for OTP flow
                return { success: true, userId: res.data.userId };
            }"""
new_login_return = """        if (res.data.success) {
            if (res.data.userId) {
                // Return userId for OTP flow
                return { success: true, userId: res.data.userId, otp: res.data.otp };
            }"""
context = context.replace(old_login_return, new_login_return)

with open(context_path, 'w', encoding='utf-8') as f:
    f.write(context)


# 3. Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    login_content = f.read()

old_login_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);"""
new_login_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    if (res.otp) {
                        setTimeout(() => window.alert(`[DEVELOPMENT MODE]\n\nYour OTP is: ${res.otp}\n\n(This popup will be removed in production)`), 500);
                    }"""
login_content = login_content.replace(old_login_submit, new_login_submit)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login_content)


# 4. Update AdminLogin.jsx
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

old_admin_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setIsSubmitting(false);"""
new_admin_submit = """                if (res.success && res.userId) {
                    setUserId(res.userId);
                    setOtpSent(true);
                    setIsSubmitting(false);
                    if (res.otp) {
                        setTimeout(() => window.alert(`[DEVELOPMENT MODE]\n\nYour OTP is: ${res.otp}\n\n(This popup will be removed in production)`), 500);
                    }"""
admin_content = admin_content.replace(old_admin_submit, new_admin_submit)

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
