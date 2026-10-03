import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Explore Opportunities
content = content.replace('border-indigo-600 text-sm font-bold rounded-md text-indigo-700 bg-white hover:bg-indigo-50', 'border-blue-900 text-sm font-bold rounded-md text-blue-900 bg-white hover:bg-blue-50')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
