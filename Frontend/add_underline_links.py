import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the classes to add hover:underline
# Student "Sign up" currently: className="text-[#2563eb] hover:text-[#1d4ed8] text-xs font-semibold transition-colors"
content = content.replace('className="text-[#2563eb] hover:text-[#1d4ed8] text-xs font-semibold transition-colors"', 'className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-xs font-semibold transition-all"')

# Faculty "Create Faculty Account" currently: className="text-[#2563eb] hover:text-[#1d4ed8] text-sm font-semibold transition-colors"
content = content.replace('className="text-[#2563eb] hover:text-[#1d4ed8] text-sm font-semibold transition-colors"', 'className="text-[#2563eb] hover:text-[#1d4ed8] hover:underline text-sm font-semibold transition-all"')

# Faculty "Forgot Password?" currently: className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8]"
content = content.replace('className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8]"', 'className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] hover:underline transition-all"')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
