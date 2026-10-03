import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Expand themeStyles with darkBg and darkCardBg
content = content.replace(
    'blue: { bg: "from-white via-blue-100 to-blue-200",',
    'blue: { bg: "from-white via-blue-100 to-blue-200", darkBg: "from-slate-900 via-blue-950 to-slate-900", darkCardBg: "bg-slate-950",'
)
content = content.replace(
    'indigo: { bg: "from-white via-indigo-100 to-indigo-200",',
    'indigo: { bg: "from-white via-indigo-100 to-indigo-200", darkBg: "from-slate-900 via-indigo-950 to-slate-900", darkCardBg: "bg-slate-950",'
)
content = content.replace(
    'orange: { bg: "from-white via-orange-100 to-orange-200",',
    'orange: { bg: "from-white via-orange-100 to-orange-200", darkBg: "from-stone-900 via-orange-950 to-stone-900", darkCardBg: "bg-[#1f1209]",'
)

# Replace the hardcoded dark mode backgrounds with dynamic ones
# 1. Fullscreen background
content = content.replace(
    "${isDarkMode ? 'from-slate-900 to-slate-800' : themeStyles[globalTheme].bg}",
    "${isDarkMode ? themeStyles[globalTheme].darkBg : themeStyles[globalTheme].bg}"
)

# 2. Main Card Background
content = content.replace(
    "${isDarkMode ? 'bg-[#020617]' : themeStyles[globalTheme].cardBg}",
    "${isDarkMode ? themeStyles[globalTheme].darkCardBg : themeStyles[globalTheme].cardBg}"
)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
