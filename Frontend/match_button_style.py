import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Create Account button classes to perfectly match Login.jsx
old_button = "className={`w-full font-medium py-2 rounded-md transition-all ${termsAccepted ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 cursor-pointer' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}"
new_button = "className={`w-full flex items-center justify-center font-semibold py-2.5 rounded-lg transition-all duration-300 text-xs shadow-md ${termsAccepted ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-blue-500/30 cursor-pointer' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}"

content = content.replace(old_button, new_button)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
