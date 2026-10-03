import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_button = r'<button\s*onClick=\{handleLogout\}\s*className="w-full flex items-center justify-center p-3 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-md transition-colors text-sm font-semibold border border-transparent hover:border-red-900/50"\s*>\s*Secure Logout\s*</button>'

new_button = """<button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all text-sm font-medium border border-red-500/20 hover:border-red-500 shadow-sm group"
                    >
                        <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Secure Logout
                    </button>"""

content = re.sub(old_button, new_button, content)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
