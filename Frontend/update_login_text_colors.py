import re

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add accent colors to themeStyles
    content = content.replace('cardBg: "bg-white" }', 'cardBg: "bg-white", accentText: "text-blue-900", linkText: "text-blue-800" }')
    content = content.replace('cardBg: "bg-[#fdfbf5]" }', 'cardBg: "bg-[#fdfbf5]", accentText: "text-orange-900", linkText: "text-orange-800" }')
    
    # Wait, indigo has bg-white too. Let's do it safely.
    content = re.sub(r'logoText: "text-blue-800", cardBg: "bg-white" \}', r'logoText: "text-blue-800", cardBg: "bg-white", accentText: "text-blue-900", linkText: "text-blue-800" }', content)
    content = re.sub(r'logoText: "text-indigo-800", cardBg: "bg-white" \}', r'logoText: "text-indigo-800", cardBg: "bg-white", accentText: "text-indigo-900", linkText: "text-indigo-800" }', content)
    content = re.sub(r'logoText: "text-orange-800", cardBg: "bg-\[#fdfbf5\]" \}', r'logoText: "text-orange-800", cardBg: "bg-[#fdfbf5]", accentText: "text-orange-900", linkText: "text-orange-800" }', content)

    # 1. Update text-blue-900 above card
    content = content.replace('className="flex items-center justify-center text-blue-900 mb-1.5"', 'className={`flex items-center justify-center mb-1.5 ${themeStyles[globalTheme].accentText}`}')
    content = content.replace('<span className="text-blue-900">Sync</span>', '<span className={themeStyles[globalTheme].accentText}>Sync</span>')
    
    # 2. Update technical support link below card
    content = content.replace('className="text-blue-800 font-bold hover:underline bg-white/50 px-2 py-0.5 rounded"', 'className={`font-bold hover:underline bg-white/50 px-2 py-0.5 rounded transition-colors ${themeStyles[globalTheme].linkText}`}')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_file(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx')
update_file(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx')

