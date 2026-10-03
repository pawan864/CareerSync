import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change default dark mode to false
content = content.replace("const [isDarkMode, setIsDarkMode] = useState(true);", "const [isDarkMode, setIsDarkMode] = useState(false);")

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
