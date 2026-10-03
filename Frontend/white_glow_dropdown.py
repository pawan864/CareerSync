import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the faint hover:bg-indigo-50 with a glowing white card effect
content = content.replace(
    'className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"', 
    'className="block p-3 rounded-lg hover:bg-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"'
)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)

