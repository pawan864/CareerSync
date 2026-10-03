import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert hover:bg-blue-900
content = content.replace('className="group block p-3 rounded-lg transition-colors hover:bg-blue-900"', 'className="group block p-3 rounded-lg transition-colors"')

# Leave group-hover:text-white on the title and arrow, but add a text-shadow so it's readable, 
# or maybe they just wanted it white for some reason.
# Let's add text-shadow so they can actually see the white text on the light blue card.
content = content.replace('group-hover:text-white text-sm', 'group-hover:text-white group-hover:[text-shadow:0_0_8px_rgba(30,58,138,1)] text-sm')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
