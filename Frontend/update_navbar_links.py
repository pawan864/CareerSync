import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Expand dynamicStyles to include linkHover
old_blue = 'signupTextHover: "hover:text-blue-900" }'
new_blue = 'signupTextHover: "hover:text-blue-900", linkHover: "hover:text-blue-900" }'
content = content.replace(old_blue, new_blue)

old_indigo = 'signupTextHover: "hover:text-indigo-900" }'
new_indigo = 'signupTextHover: "hover:text-indigo-900", linkHover: "hover:text-indigo-900" }'
content = content.replace(old_indigo, new_indigo)

old_orange = 'signupTextHover: "hover:text-orange-900" }'
new_orange = 'signupTextHover: "hover:text-orange-900", linkHover: "hover:text-orange-900" }'
content = content.replace(old_orange, new_orange)

# Replace all occurrences of `hover:text-blue-900` in the links
# specifically in className="text-gray-600 hover:text-blue-900..."
# and className="text-gray-700 hover:text-blue-900..."
content = content.replace('hover:text-blue-900 transition-all duration-300', '${dynamicStyles[navTheme].linkHover} transition-all duration-300')
content = content.replace('className="text-gray-600 ${dynamicStyles', 'className={`text-gray-600 ${dynamicStyles')
content = content.replace('h-full"', 'h-full`')
content = content.replace('className="text-gray-700 ${dynamicStyles', 'className={`text-gray-700 ${dynamicStyles')
content = content.replace('font-medium"', 'font-medium`')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
