import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace general transparent inputs (Faculty email, Faculty password, TPO password)
content = content.replace(
    'className="w-full bg-transparent text-gray-900 focus:outline-none text-sm"',
    'className="w-full bg-transparent text-gray-900 focus:outline-none text-xs placeholder-gray-400"'
)

# Replace TPO specific padded inputs
# className="w-full px-4 py-2.5 bg-[#f0f4f8] border-transparent text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm"
content = content.replace(
    'className="w-full px-4 py-2.5 bg-[#f0f4f8] border-transparent text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm"',
    'className="w-full px-4 py-2.5 bg-[#f0f4f8] border-transparent text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-xs placeholder-gray-400"'
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
