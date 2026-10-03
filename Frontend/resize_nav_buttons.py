import re

dashboards = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\FacultyDashboard.jsx'
]

for path in dashboards:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace Admin/Faculty pattern
        content = content.replace('className={`w-full flex items-center px-4 py-3 rounded-lg text-sm', 'className={`w-full flex items-center py-2 px-3 rounded-lg text-xs')
        
        # Replace Student pattern
        content = content.replace('className={`w-full flex items-center p-3 rounded-md', 'className={`w-full flex items-center py-2 px-3 text-xs rounded-md')
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {path}")
    except Exception as e:
        print(f"Error on {path}: {e}")
