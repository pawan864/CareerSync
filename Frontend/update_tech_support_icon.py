import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the MessageSquare background
content = content.replace('className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-3"', 'className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${themeStyles[globalTheme].iconBg}`}')

# Replace the MessageSquare icon color
content = content.replace('className="w-6 h-6 text-teal-600"', 'className={`w-6 h-6 ${themeStyles[globalTheme].iconColor}`}')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
