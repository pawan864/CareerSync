import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace labels
content = content.replace('<label className="block text-gray-400 text-xs mb-1">', '<label className={lock  text-xs mb-1}>')

# Replace inputs
content = content.replace('className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"', 'className={w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm }')

# Replace password input (has pr-10)
content = content.replace('className="w-full px-3 py-2 bg-[#f8fafc] text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm"', 'className={w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm }')

# Section headers
content = content.replace('className="text-white text-sm font-semibold mb-3 border-b border-gray-700 pb-1"', 'className={${isDarkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"} text-sm font-semibold mb-3 border-b pb-1}')

# Footer OR line text
content = content.replace('className="px-3 text-gray-500 text-[10px] font-bold tracking-widest uppercase"', 'className={px-3 text-[10px] font-bold tracking-widest uppercase }')

# Note: The OR line span currently doesn't have bg-color inside the border-t, actually it's just a span. The parent has border-t.
# Wait, let's just do text-gray-500 for the OR. It's fine in both modes.

# Google/Email buttons
content = content.replace('className="flex-1 flex items-center justify-center bg-transparent border border-gray-800 hover:border-gray-600 text-white py-2 rounded-md transition-colors"', 'className={lex-1 flex items-center justify-center border py-2 rounded-md transition-colors }')

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
