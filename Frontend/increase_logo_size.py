import re

# Update Navbar.jsx
nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

nav_content = nav_content.replace('h-8 w-8 mr-2', 'h-10 w-10 mr-3')
nav_content = nav_content.replace('text-xl tracking-tight', 'text-2xl tracking-tight')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(nav_content)

# Update StudentDashboard.jsx
dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    dash_content = f.read()

dash_content = dash_content.replace('w-10 h-10 bg-teal-50', 'w-12 h-12 bg-teal-50')
dash_content = dash_content.replace('w-6 h-6 text-teal-600', 'w-8 h-8 text-teal-600')
dash_content = dash_content.replace('text-xl font-bold text-slate-800', 'text-2xl font-bold text-slate-800')
dash_content = dash_content.replace('text-[10px] text-teal-700 font-medium', 'text-xs text-teal-700 font-medium')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(dash_content)

