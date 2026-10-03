import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hover:underline with underline hover:underline (or just underline) for all the register links.

# 1. Student "Sign up"
# className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-xs font-semibold transition-all"
content = content.replace(
    'className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-xs font-semibold transition-all">\n                                                    Sign up',
    'className="text-[#2563eb] hover:text-[#1d4ed8] underline text-xs font-semibold transition-all">\n                                                    Sign up'
)

# 2. Faculty "Create Faculty Account"
# className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-sm font-semibold transition-all"
content = content.replace(
    'className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-sm font-semibold transition-all">\n                                                Create Faculty Account',
    'className="text-[#2563eb] hover:text-[#1d4ed8] underline text-sm font-semibold transition-all">\n                                                Create Faculty Account'
)

# 3. TPO & Recruiter "Create {portal} Account"
# className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-sm font-semibold transition-all">\n                                            Create {portal} Account
content = content.replace(
    'className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-sm font-semibold transition-all">\n                                            Create {portal} Account',
    'className="text-[#2563eb] hover:text-[#1d4ed8] underline text-sm font-semibold transition-all">\n                                            Create {portal} Account'
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
