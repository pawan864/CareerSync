import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# For Recruiter Email and Password inputs
content = content.replace('text-xs placeholder-gray-400 autofill-light', 'text-sm placeholder-gray-400 autofill-light')

# For TPO Institutional ID / Email and password (which doesn't have autofill-light on the ID one)
content = content.replace('transition-colors text-xs placeholder-gray-400', 'transition-colors text-sm placeholder-gray-400')

# And for Admin, just in case they meant it, let's bump it to text-sm too so they match!
content = content.replace('text-xs placeholder-gray-700 autofill-admin', 'text-sm placeholder-gray-700 autofill-admin')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
