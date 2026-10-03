import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace emerald with orange/amber for a light brown feel
content = content.replace('via-emerald-100 to-emerald-400', 'via-orange-100 to-orange-300')
content = content.replace('bg-emerald-100 text-emerald-900 border-emerald-200', 'bg-orange-100 text-orange-900 border-orange-200')
content = content.replace('bg-emerald-700 hover:bg-emerald-600', 'bg-orange-800 hover:bg-orange-700')
content = content.replace('border-emerald-700 text-emerald-800 hover:bg-emerald-50', 'border-orange-800 text-orange-900 hover:bg-orange-50')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
