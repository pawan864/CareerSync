import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace corrupted labels
content = re.sub(r'className=\{\s*[\x08]?lock\s+text-xs\s+mb-1\}', 'className={`block ${isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"} text-xs mb-1`}', content)

# Replace corrupted h3 headers
content = re.sub(r'className=\{\$\{isDarkMode \? [^\}]+\}\s+text-sm\s+font-semibold\s+mb-3\s+border-b\s+pb-1\}', 'className={`${isDarkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"} text-sm font-semibold mb-3 border-b pb-1`}', content)

# Replace corrupted buttons
content = re.sub(r'className=\{\s*[\x0C]?lex-1\s+flex\s+items-center\s+justify-center\s+border\s+py-2\s+rounded-md\s+transition-colors\s*\}', 'className={`flex-1 flex items-center justify-center border py-2 rounded-md transition-colors ${isDarkMode ? "bg-transparent border-gray-800 hover:border-gray-600 text-white" : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"}`}', content)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
