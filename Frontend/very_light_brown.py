import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add textLight to pageStyles
old_blue = 'btnBg: "bg-blue-600 hover:bg-blue-700", ctaGradient: "from-white via-blue-200 to-blue-500" }'
new_blue = 'btnBg: "bg-blue-600 hover:bg-blue-700", ctaGradient: "from-white via-blue-200 to-blue-500", textLight: "text-white" }'
content = content.replace(old_blue, new_blue)

old_indigo = 'btnBg: "bg-indigo-600 hover:bg-indigo-700", ctaGradient: "from-white via-indigo-200 to-indigo-500" }'
new_indigo = 'btnBg: "bg-indigo-600 hover:bg-indigo-700", ctaGradient: "from-white via-indigo-200 to-indigo-500", textLight: "text-white" }'
content = content.replace(old_indigo, new_indigo)

# Set orange bgDark to very light (orange-200) and text to dark brown (orange-900) for contrast
old_orange = 'orange: { bgDark: "bg-orange-400", cardBg: "bg-[#fdfbf5]", iconBg: "bg-orange-100", iconText: "text-orange-600", borderHover: "hover:border-orange-200", btnBg: "bg-orange-600 hover:bg-orange-700", ctaGradient: "from-white via-orange-200 to-orange-400" }'
new_orange = 'orange: { bgDark: "bg-orange-200", cardBg: "bg-[#fdfbf5]", iconBg: "bg-orange-100", iconText: "text-orange-600", borderHover: "hover:border-orange-200", btnBg: "bg-orange-600 hover:bg-orange-700", ctaGradient: "from-white via-orange-200 to-orange-400", textLight: "text-orange-900" }'
content = content.replace(old_orange, new_orange)

# Update text-white usages inside elements that use bgDark
content = content.replace('text-white rounded-full h-10', '${pageStyles[pageTheme].textLight} rounded-full h-10')
content = content.replace('text-xs text-white px-3', 'text-xs ${pageStyles[pageTheme].textLight} px-3')
content = content.replace('text-white p-3 rounded-lg flex', '${pageStyles[pageTheme].textLight} p-3 rounded-lg flex')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
