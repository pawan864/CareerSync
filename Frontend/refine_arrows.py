import re

footer_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Footer.jsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<span className="inline-block transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 mr-0 group-hover:mr-1.5">&rarr;</span>',
    '<span className="inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 text-blue-900">&rarr;</span>'
)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(content)

