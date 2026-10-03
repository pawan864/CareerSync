import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace wrapper bg
content = content.replace('bg-[#0a0a0a]', 'bg-gradient-to-r from-white via-blue-50 to-blue-100')
# Replace sidebar bg
content = content.replace('bg-[#121212] border-r border-gray-800', 'bg-white/60 backdrop-blur-md border-r border-blue-200')
# Replace main content bg
content = content.replace('bg-[#050505]', 'bg-transparent')
# Replace header
content = content.replace('border-b border-gray-800 bg-[#0a0a0a]/80', 'border-b border-blue-200 bg-white/40')
# Replace text-white on header/sidebar to text-blue-900
content = content.replace('text-xl font-bold text-white', 'text-xl font-bold text-blue-900')
content = content.replace('text-[10px] text-gray-400 uppercase', 'text-[10px] text-blue-600 uppercase')
content = content.replace('text-[10px] text-gray-500 uppercase', 'text-[10px] text-blue-600 uppercase')
content = content.replace('text-gray-400 hover:bg-white/5 hover:text-gray-200', 'text-gray-600 hover:bg-blue-50 hover:text-blue-900')
content = content.replace("isActive ? 'bg-blue-600/20'", "isActive ? 'bg-blue-100'")
content = content.replace("bg-gray-800/50", "bg-gray-100")
content = content.replace('text-gray-500', 'text-gray-500')
content = content.replace('text-2xl font-bold text-white', 'text-2xl font-bold text-blue-900')
content = content.replace('text-sm font-bold text-white', 'text-sm font-bold text-blue-900')
content = content.replace('text-sm text-gray-400', 'text-sm text-gray-600')
content = content.replace('border-t border-gray-800', 'border-t border-blue-200')
content = content.replace('border-2 border-gray-800', 'border-2 border-white')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)
