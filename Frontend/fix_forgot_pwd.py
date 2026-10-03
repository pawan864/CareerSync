import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove hover:underline from Faculty Forgot Password
content = content.replace(
    'className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] hover:underline transition-all">Forgot Password?</Link>',
    'className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors">Forgot Password?</Link>'
)

# 2. Update TPO & Recruiter Forgot Password (text-teal-600 hover:text-blue-800) to blue without underline
content = content.replace(
    'className="text-xs font-semibold text-teal-600 hover:text-blue-800">Forgot Password?</Link>',
    'className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors">Forgot Password?</Link>'
)

# 3. Update Create {portal} Account to have blue + underline
content = content.replace(
    'className="text-teal-600 hover:text-teal-600 text-sm font-semibold transition-colors">\n                                            Create {portal} Account',
    'className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-sm font-semibold transition-all">\n                                            Create {portal} Account'
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
