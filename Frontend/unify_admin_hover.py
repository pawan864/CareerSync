import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Admin hover in Faculty
content = content.replace('hover:text-[#047857] flex items-center ml-1">\n                                                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin', 'hover:text-[#1e40af] flex items-center ml-1">\n                                                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin')

# Fix Admin hover in TPO
content = content.replace('hover:text-teal-600 flex items-center ml-1">\n                                                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin', 'hover:text-[#1e40af] flex items-center ml-1">\n                                                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Admin')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
