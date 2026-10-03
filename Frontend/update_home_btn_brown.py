import re
home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('btnBg: "bg-orange-600 hover:bg-orange-700"', 'btnBg: "bg-amber-800 hover:bg-amber-900"')
with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
