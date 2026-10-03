import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the active tab text color in the portal switcher
content = content.replace("? 'bg-white text-blue-900 shadow-sm'", "? `bg-white ${themeStyles[globalTheme].labelColor} shadow-sm`")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
