import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all amber-related classes in the third slide with emerald
content = content.replace('via-amber-200 to-amber-500', 'via-emerald-100 to-emerald-400')
content = content.replace('bg-amber-100 text-amber-900 border-amber-200', 'bg-emerald-100 text-emerald-900 border-emerald-200')
content = content.replace('bg-amber-700 hover:bg-amber-600', 'bg-emerald-700 hover:bg-emerald-600')
content = content.replace('border-amber-700 text-amber-800 hover:bg-amber-50', 'border-emerald-700 text-emerald-800 hover:bg-emerald-50')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
