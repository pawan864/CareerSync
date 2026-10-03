import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace text-teal-600 inside the Tech Support success message
content = content.replace('className="text-teal-600 font-medium hover:underline cursor-pointer"', 'className={`font-medium hover:underline cursor-pointer ${themeStyles[globalTheme].iconColor}`}')

# Replace text-blue-900 in the external "Contact Technical Support" button
content = content.replace('className="font-bold text-blue-900 hover:underline transition-colors cursor-pointer"', 'className={`font-bold hover:underline transition-colors cursor-pointer ${themeStyles[globalTheme].accentText}`}')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
