import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the Admin OTP onChange and add dynamic border
old_admin_otp = r'onChange=\{\(e\) => handleOtpChange\(index, e\.target\.value\)\}\s*className="w-10 h-10 text-center bg-\[#0a0a0a\] border border-gray-800 text-white font-bold rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"'

new_admin_otp = """onChange={(e) => handleOtpChange(e.target, index)}
                                                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                                                className={`w-10 h-10 text-center bg-[#0a0a0a] border text-white font-bold rounded-md focus:ring-1 transition-all outline-none ${
                                                                    digit !== '' 
                                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                                                    : 'border-white/30 hover:border-white/50 focus:border-white focus:ring-white'
                                                                }`}"""

content = re.sub(old_admin_otp, new_admin_otp, content)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
