import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_label = """<div className="flex justify-between items-center mb-1.5">
                                                    <label className="block text-gray-400 text-xs font-semibold">Master Password</label>
                                                </div>"""

new_label = """<div className="flex justify-between items-center mb-1.5">
                                                    <label className="block text-gray-400 text-xs font-semibold">Master Password</label>
                                                    <Link to="/forgot-password" className="text-xs font-semibold text-red-500 hover:text-red-400 transition-colors">Forgot Password?</Link>
                                                </div>"""

content = content.replace(old_label, new_label)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
