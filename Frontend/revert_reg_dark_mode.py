import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert the fullscreen background
content = content.replace(
    "${isDarkMode ? themeStyles[globalTheme].darkBg : themeStyles[globalTheme].bg}",
    "${isDarkMode ? 'from-slate-900 to-slate-800' : themeStyles[globalTheme].bg}"
)

# Revert the main card background
content = content.replace(
    "${isDarkMode ? themeStyles[globalTheme].darkCardBg : themeStyles[globalTheme].cardBg}",
    "${isDarkMode ? 'bg-[#020617]' : themeStyles[globalTheme].cardBg}"
)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
