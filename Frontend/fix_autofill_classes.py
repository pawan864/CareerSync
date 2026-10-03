import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the dynamic autofill class to all inputs
old_input = "className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-colors text-xs placeholder-gray-400 ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent focus:bg-[#0f172a]' : 'bg-white text-gray-900 border border-gray-300 focus:border-transparent focus:bg-white'}`}"
new_input = "className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-colors text-xs placeholder-gray-400 ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent focus:bg-[#0f172a] autofill-dark' : 'bg-white text-gray-900 border border-gray-300 focus:border-transparent focus:bg-white autofill-light'}`}"
content = content.replace(old_input, new_input)

# Update password inputs
old_password = "className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-colors text-xs placeholder-gray-400 pr-10 ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent focus:bg-[#0f172a]' : 'bg-white text-gray-900 border border-gray-300 focus:border-transparent focus:bg-white'}`}"
new_password = "className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-colors text-xs placeholder-gray-400 pr-10 ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent focus:bg-[#0f172a] autofill-dark' : 'bg-white text-gray-900 border border-gray-300 focus:border-transparent focus:bg-white autofill-light'}`}"
content = content.replace(old_password, new_password)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
