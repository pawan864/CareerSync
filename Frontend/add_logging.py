import re

# Add logging to frontend
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'const otpString = otp.join(\'\');',
    'const otpString = otp.join(\'\');\n                console.log("Submitting OTP:", otpString, "for userId:", userId);'
)
content = content.replace(
    'const res = await api.post(\'/auth/verify-otp\', { userId, otp: otpString });',
    'console.log("Calling API...");\n                  const res = await api.post(\'/auth/verify-otp\', { userId, otp: otpString });\n                  console.log("API Response:", res.data);'
)
content = content.replace(
    'setError(err.response?.data?.error || \'Invalid OTP or Login failed\');',
    'console.error("API Error:", err);\n              setError(err.response?.data?.error || \'Invalid OTP or Login failed\');'
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Add logging to backend
auth_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js'
with open(auth_path, 'r', encoding='utf-8') as f:
    auth_content = f.read()

auth_content = auth_content.replace(
    'exports.verifyOtp = async (req, res, next) => {\n    try {\n        const { userId, otp } = req.body;',
    'exports.verifyOtp = async (req, res, next) => {\n    console.log("verifyOtp called with body:", req.body);\n    try {\n        const { userId, otp } = req.body;'
)

with open(auth_path, 'w', encoding='utf-8') as f:
    f.write(auth_content)
