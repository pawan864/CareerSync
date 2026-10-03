import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the hardcoded blue Tech Support submit button
content = content.replace(
    "${supportStatus === 'submitting' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}",
    "${themeStyles[globalTheme].primaryBtn} ${supportStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}"
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
