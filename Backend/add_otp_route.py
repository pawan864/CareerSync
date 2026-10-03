import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\routes\authRoutes.js', 'r', encoding='utf-8') as f:
    content = f.read()

if "verifyOtp" not in content:
    content = content.replace("const { register, login, getMe } = require('../controllers/authController');", "const { register, login, getMe, verifyOtp } = require('../controllers/authController');")
    content = content.replace("router.post('/login', login);", "router.post('/login', login);\nrouter.post('/verify-otp', verifyOtp);")

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\routes\authRoutes.js', 'w', encoding='utf-8') as f:
    f.write(content)
