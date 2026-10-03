import re

files = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Support.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
]

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Change GraduationCap colors
        content = content.replace('text-indigo-600', 'text-teal-600')
        content = content.replace('text-blue-700', 'text-teal-600')
        content = content.replace('text-blue-600', 'text-teal-600')
        content = content.replace('text-blue-500', 'text-teal-600')

        # Keep some specific texts if needed, but for the logo span:
        content = content.replace('<span className="text-gray-900">Career</span>', '<span className="text-slate-800">Career</span>')
        content = content.replace('<span className="text-indigo-600">Sync</span>', '<span className="text-teal-600">Sync</span>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Error on {file_path}: {e}")

# Now restore the logo in StudentDashboard.jsx
dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    dash_content = f.read()

if 'GraduationCap' not in dash_content:
    dash_content = dash_content.replace('import { \n    User, BookOpen, Briefcase, FileText,', 'import { \n    GraduationCap, User, BookOpen, Briefcase, FileText,')
    dash_content = dash_content.replace('import { \n    LogOut, User, BookOpen, Briefcase, FileText,', 'import { \n    GraduationCap, LogOut, User, BookOpen, Briefcase, FileText,')
    # If the import line was squashed:
    if 'import { ' in dash_content:
        dash_content = dash_content.replace('import { ', 'import { GraduationCap, ')

logo_replacement = """
                <div className="p-6 border-b border-blue-200 bg-white/40 flex items-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3 border border-teal-200">
                        <GraduationCap className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Career<span className="text-teal-600">Sync</span></h1>
                        <p className="text-[10px] text-teal-700 font-medium">Student Portal</p>
                    </div>
                </div>
"""
# Need to find the logo area and replace it.
dash_content = re.sub(r'<div className="p-6 border-b border-blue-200 bg-white/40 flex items-center">.*?</div>\s*</div>\s*</div>', logo_replacement.strip(), dash_content, flags=re.DOTALL)

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(dash_content)

