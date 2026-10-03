import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the block
bad_block = """    const themeClasses = {
        blue: "bg-blue-50/95 border-blue-200 shadow-blue-900/5",
        indigo: "bg-indigo-50/95 border-indigo-200 shadow-indigo-900/5",
        orange: "bg-orange-50/95 border-orange-200 shadow-orange-900/5"
    };

    const activeNavClass = scrolled 
        ? `${themeClasses[navTheme]} backdrop-blur-md shadow-md border-b`
        : "bg-white shadow-sm border-b border-gray-200";
"""

content = content.replace(bad_block, "")

# Insert it before the return
content = content.replace('    return (', bad_block + '\n    return (')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
