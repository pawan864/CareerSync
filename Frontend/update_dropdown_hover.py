import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The Link tag:
content = content.replace('className="group block p-3 rounded-lg transition-colors"', 'className="group block p-3 rounded-lg transition-colors hover:bg-blue-900"')

# The title block:
# `<div className="font-semibold text-gray-900 text-sm flex items-center">`
content = content.replace('className="font-semibold text-gray-900 text-sm flex items-center"', 'className="font-semibold text-gray-900 group-hover:text-white text-sm flex items-center transition-colors"')

# The arrow:
# `mr-1.5 text-blue-900 opacity-0 group-hover:opacity-100` -> add group-hover:text-white
content = content.replace('mr-1.5 text-blue-900 opacity-0 group-hover:opacity-100', 'mr-1.5 text-blue-900 group-hover:text-white opacity-0 group-hover:opacity-100 transition-colors')

# The desc block:
# `<div className="text-xs text-gray-500 mt-1">{detail.desc}</div>`
content = content.replace('className="text-xs text-gray-500 mt-1"', 'className="text-xs text-gray-500 group-hover:text-blue-200 mt-1 transition-colors"')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
