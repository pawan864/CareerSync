import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the badge styling
content = content.replace('bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-200', 'bg-blue-50 text-blue-900 font-bold text-sm mb-6 border border-blue-200')
# I used text-blue-900 for dark blue, and made it font-bold so it's a bit crisper.

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
