import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_wrapper = '        <div className="h-screen overflow-hidden flex w-full font-sans">'
new_wrapper = '        <div className="fixed inset-0 w-full h-full overflow-hidden flex font-sans">'
content = content.replace(old_wrapper, new_wrapper)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
