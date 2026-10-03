import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Student active tab (bg-[#9b72f0])
content = content.replace("? 'bg-[#9b72f0] text-white shadow-sm'", "? 'bg-[#1e40af] text-white shadow-sm'")

# Replace Faculty active tab (bg-[#047857])
content = content.replace("? 'bg-[#047857] text-white shadow-sm'", "? 'bg-[#1e40af] text-white shadow-sm'")

# Replace TPO active tab (bg-white text-teal-600)
content = content.replace("? 'bg-white text-teal-600 shadow-sm'", "? 'bg-[#1e40af] text-white shadow-sm'")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
