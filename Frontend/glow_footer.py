import re

footer_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Footer.jsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change the base color of the lists to Slate Gray
content = content.replace('text-blue-900/80 font-medium', 'text-slate-500 font-medium')

# Change the hover state of the links to have a dark blue glow
old_link_class = 'className="hover:text-blue-900 transition"'
new_link_class = 'className="hover:text-blue-900 hover:drop-shadow-[0_0_8px_rgba(30,58,138,0.8)] transition-all duration-300"'

content = content.replace(old_link_class, new_link_class)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(content)

