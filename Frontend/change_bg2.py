import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change Logo Background
# Currently: className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
# Change to: className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-md"
content = content.replace(
    'className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(220,38,38,0.3)]"',
    'className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-md"'
)
content = content.replace(
    '<ShieldCheck className="w-5 h-5 text-white" />',
    '<span className="text-black font-bold text-lg">C</span>'
)

# Change Signout Background
# Currently: className="w-full flex items-center justify-center p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-white/10 group"
content = content.replace(
    'className="w-full flex items-center justify-center p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-white/10 group"',
    'className="w-full flex items-center justify-center p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all text-sm font-medium border border-red-500/20 hover:border-red-500 shadow-sm group"'
)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
