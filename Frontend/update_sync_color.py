import re

files = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Support.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
]

# Update "Sync" to dark blue
for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace('<span className="text-teal-600">Sync</span>', '<span className="text-blue-900">Sync</span>')
        
        # If they meant the logo itself should be colored differently
        # Let's change the raw SVG text color just in case to a solid blue-green mix, or leave it teal
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        pass

# Update Student Dashboard
dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    dash_content = f.read()

# Change Sync text
dash_content = dash_content.replace('<span className="text-teal-600">Sync</span>', '<span className="text-blue-900">Sync</span>')

# Change Logo box background to transparent green -> transparent blue
dash_content = dash_content.replace('bg-teal-50', 'bg-gradient-to-br from-green-500/20 to-blue-600/20')
dash_content = dash_content.replace('border-teal-200', 'border-blue-200')
dash_content = dash_content.replace('text-teal-600', 'text-blue-800')

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(dash_content)

