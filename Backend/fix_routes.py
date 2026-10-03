import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\routes\authRoutes.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const { register, login, getMe, logout, forgotPassword } = require('../controllers/authController');", "const { register, login, verifyOtp, getMe, logout, forgotPassword } = require('../controllers/authController');")

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\routes\authRoutes.js', 'w', encoding='utf-8') as f:
    f.write(content)
