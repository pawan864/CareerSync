import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\models\User.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add otp fields
if "loginOtp" not in content:
    old_fields = """    resetPasswordExpire: Date,
    createdAt: {"""
    new_fields = """    resetPasswordExpire: Date,
    loginOtp: String,
    loginOtpExpire: Date,
    createdAt: {"""
    content = content.replace(old_fields, new_fields)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\models\User.js', 'w', encoding='utf-8') as f:
    f.write(content)
