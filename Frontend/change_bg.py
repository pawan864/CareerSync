import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change Logo Background
# Currently: className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center mr-3"
# Change to: className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-md"
# and change the text inside to text-blue-900
content = content.replace(
    'className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center mr-3"',
    'className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-md"'
)
content = content.replace(
    '<span className="text-white font-bold text-lg">C</span>',
    '<span className="text-blue-900 font-bold text-lg">C</span>'
)

# Change Signout Background
# Currently: className="w-full flex items-center justify-center p-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium group"
# Change to: className="w-full flex items-center justify-center p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all text-sm font-medium border border-red-500/20 hover:border-red-500 group"
content = content.replace(
    'className="w-full flex items-center justify-center p-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium group"',
    'className="w-full flex items-center justify-center p-3 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white rounded-lg transition-all text-sm font-medium border border-red-500/20 hover:border-red-500 shadow-sm group"'
)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
