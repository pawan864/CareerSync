import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Student focus rings
content = content.replace('focus-within:border-[#9b72f0]', 'focus-within:border-[#2563eb]')
content = content.replace('focus:ring-[#9b72f0]', 'focus:ring-[#2563eb]')
content = content.replace('text-[#9b72f0] focus:ring-[#2563eb]', 'text-[#2563eb] focus:ring-[#2563eb]')

# Replace Faculty focus rings
content = content.replace('focus-within:ring-[#047857]', 'focus-within:ring-[#2563eb]')
content = content.replace('focus:ring-[#047857]', 'focus:ring-[#2563eb]')
content = content.replace('text-[#047857] focus:ring-[#2563eb]', 'text-[#2563eb] focus:ring-[#2563eb]')

# Replace TPO/Recruiter generic blue-500 rings with dark blue (#2563eb)
content = content.replace('focus-within:ring-blue-500', 'focus-within:ring-[#2563eb]')
content = content.replace('focus:ring-blue-500', 'focus:ring-[#2563eb]')
content = content.replace('focus:border-blue-500', 'focus:border-[#2563eb]')

# Replace the TPO/Recruiter checkbox colors which were teal-600
content = content.replace('text-teal-600 focus:ring-[#2563eb]', 'text-[#2563eb] focus:ring-[#2563eb]')


with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
