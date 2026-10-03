import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_button = r'<button\s*onClick=\{handleLogout\}\s*className="w-full flex items-center justify-center p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all text-sm font-medium border border-red-500/20 hover:border-red-500 shadow-sm group"\s*>'

new_button = """<button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center py-2 px-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 active:scale-95 text-xs font-semibold border border-red-500/20 hover:border-red-500 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] group"
                    >"""

content = re.sub(old_button, new_button, content)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)

# And let's do the same for Admin just to keep it consistent
admin_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin_content = f.read()

admin_old_button = r'<button\s*onClick=\{handleLogout\}\s*className="w-full flex items-center justify-center p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all text-sm font-medium border border-red-500/20 hover:border-red-500 shadow-sm group"\s*>'

admin_new_button = """<button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center py-2 px-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 active:scale-95 text-xs font-semibold border border-red-500/20 hover:border-red-500 hover:shadow-[0_0_12px_rgba(239,68,68,0.3)] group"
                    >"""

admin_content = re.sub(admin_old_button, admin_new_button, admin_content)

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin_content)
