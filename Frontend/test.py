import re

# Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update themeStyles to include accentText and linkText
old_themeStyles = """    const themeStyles = {
        blue: { bg: "from-white via-blue-100 to-blue-200", logoBg: "from-green-500/20 to-blue-600/20", logoBorder: "border-blue-200", logoText: "text-blue-800", cardBg: "bg-white" },
        indigo: { bg: "from-white via-indigo-100 to-indigo-200", logoBg: "from-purple-500/20 to-indigo-600/20", logoBorder: "border-indigo-200", logoText: "text-indigo-800", cardBg: "bg-white" },
        orange: { bg: "from-white via-orange-100 to-orange-200", logoBg: "from-amber-500/20 to-orange-600/20", logoBorder: "border-orange-200", logoText: "text-orange-800", cardBg: "bg-[#fdfbf5]" }
    };"""
# Wait, I might not have exact match because I used `bg: "from-white via-orange-100 to-orange-200"`.
# Let's dynamically inject it.
