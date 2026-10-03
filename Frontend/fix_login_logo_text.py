import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Career<span with <span className="text-black">Career</span><span
content = content.replace('Career<span className="text-blue-900">Sync</span>', '<span className="text-black">Career</span><span className="text-blue-900">Sync</span>')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
