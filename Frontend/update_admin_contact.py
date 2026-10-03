import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_text = """                    Any issue? <a href="#" className="font-bold text-blue-900 hover:underline">Contact Administrator</a>"""

new_text = """                    Need assistance? <a href="#" className="font-bold text-blue-900 hover:underline transition-colors">Contact Technical Support</a>"""

content = content.replace(old_text, new_text)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
