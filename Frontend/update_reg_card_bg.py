import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix card background to use themeStyles[globalTheme].cardBg when not in dark mode
content = content.replace(
    "${isDarkMode ? 'bg-[#020617]' : 'bg-white'}",
    "${isDarkMode ? 'bg-[#020617]' : themeStyles[globalTheme].cardBg}"
)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
