import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert Link wrapper
content = content.replace('className="group block p-3 rounded-lg transition-colors"', 'className="block p-3 rounded-lg hover:bg-indigo-50 transition-colors"')

# Revert Title
# The current title block is complex due to the arrow. Let's use regex to wipe it out.
# Current: <div className="font-semibold text-gray-900 group-hover:text-white group-hover:[text-shadow:0_0_8px_rgba(30,58,138,1)] text-sm flex items-center transition-colors"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1 mr-1.5 text-blue-900 group-hover:text-white opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-colors">&rarr;</span><span className="transition-transform duration-300 group-hover:translate-x-1">{detail.title}</span></div>
content = re.sub(
    r'<div className="font-semibold text-gray-900[^>]+>.*?\{detail\.title\}<\/span><\/div>',
    r'<div className="font-semibold text-gray-900 text-sm">{detail.title}</div>',
    content
)

# Revert Desc
# Current: <div className="text-xs text-gray-500 group-hover:text-blue-200 mt-1 transition-colors">{detail.desc}</div>
content = re.sub(
    r'<div className="text-xs text-gray-500[^>]+>\{detail\.desc\}<\/div>',
    r'<div className="text-xs text-gray-500 mt-1">{detail.desc}</div>',
    content
)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)

