import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix navbar links hover color (was hover:text-teal-600)
content = content.replace('hover:text-teal-600', 'hover:text-blue-900')

# Fix Login button (was text-teal-600)
content = content.replace('text-teal-600 bg-transparent', 'text-blue-900 bg-transparent')
content = content.replace('border-blue-600', 'border-blue-900') # Match the dark blue border
content = content.replace('bg-blue-600', 'bg-blue-900') # Make the fill animation dark blue

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
