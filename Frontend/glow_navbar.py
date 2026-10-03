import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add glow to all hover:text-blue-900 occurrences EXCEPT the Sign Up button
new_class = 'hover:text-blue-900 hover:drop-shadow-[0_0_8px_rgba(30,58,138,0.8)] transition-all duration-300'
content = content.replace('hover:text-blue-900 hover:bg-gray-50', new_class + ' hover:bg-gray-50')
content = content.replace('hover:text-blue-900 px-3 py-2', new_class + ' px-3 py-2')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)

