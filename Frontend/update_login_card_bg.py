import re

# 1. Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    login_content = f.read()

# Update themeStyles to include cardBg
old_themeStyles = """    const themeStyles = {
        blue: { bg: "from-white via-blue-200 to-blue-600", logoBg: "from-green-500/20 to-blue-600/20", logoBorder: "border-blue-200", logoText: "text-blue-800" },
        indigo: { bg: "from-white via-indigo-200 to-indigo-600", logoBg: "from-purple-500/20 to-indigo-600/20", logoBorder: "border-indigo-200", logoText: "text-indigo-800" },
        orange: { bg: "from-white via-orange-200 to-orange-500", logoBg: "from-amber-500/20 to-orange-600/20", logoBorder: "border-orange-200", logoText: "text-orange-800" }
    };"""

new_themeStyles = """    const themeStyles = {
        blue: { bg: "from-white via-blue-200 to-blue-600", logoBg: "from-green-500/20 to-blue-600/20", logoBorder: "border-blue-200", logoText: "text-blue-800", cardBg: "bg-white" },
        indigo: { bg: "from-white via-indigo-200 to-indigo-600", logoBg: "from-purple-500/20 to-indigo-600/20", logoBorder: "border-indigo-200", logoText: "text-indigo-800", cardBg: "bg-white" },
        orange: { bg: "from-white via-orange-200 to-orange-500", logoBg: "from-amber-500/20 to-orange-600/20", logoBorder: "border-orange-200", logoText: "text-orange-800", cardBg: "bg-[#fdfbf5]" }
    };"""
login_content = login_content.replace(old_themeStyles, new_themeStyles)

# Replace the white backgrounds of the right-hand panel
login_content = login_content.replace('className="w-full lg:w-1/2 p-8 lg:p-12 bg-white flex flex-col relative overflow-y-auto slim-scrollbar"', 'className={`w-full lg:w-1/2 p-8 lg:p-12 flex flex-col relative overflow-y-auto slim-scrollbar transition-colors duration-700 ${themeStyles[globalTheme].cardBg}`}')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login_content)

# 2. Update Register.jsx
reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    reg_content = f.read()

reg_content = reg_content.replace(old_themeStyles, new_themeStyles)
reg_content = reg_content.replace('className="w-full lg:w-1/2 p-8 lg:p-12 bg-white flex flex-col relative overflow-y-auto slim-scrollbar"', 'className={`w-full lg:w-1/2 p-8 lg:p-12 flex flex-col relative overflow-y-auto slim-scrollbar transition-colors duration-700 ${themeStyles[globalTheme].cardBg}`}')

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(reg_content)
