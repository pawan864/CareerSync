import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Decrease box size
content = content.replace('w-10 h-10 bg-gradient-to-br', 'w-8 h-8 bg-gradient-to-br')
# Decrease icon size
content = content.replace('w-6 h-6 text-blue-800', 'w-5 h-5 text-blue-800')
# Decrease text size
content = content.replace('font-bold text-2xl tracking-tight', 'font-bold text-xl tracking-tight')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
