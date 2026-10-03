import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace green success classes with blue ones for the successMsg blocks
content = content.replace('bg-green-900/50 border border-green-500 text-green-200', 'bg-blue-900/50 border border-blue-500 text-blue-200')
content = content.replace('bg-green-50 border border-green-200 text-green-600', 'bg-blue-50 border border-blue-200 text-blue-600')
content = content.replace('bg-green-950/50 border border-green-500/50 text-green-200', 'bg-blue-950/50 border border-blue-500/50 text-blue-200')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
