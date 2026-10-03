import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_tpo_bottom = """<p className="text-gray-400 text-xs mb-1">Don't have an account?</p>
                                        <Link to="/register" state={{ role: "tpo" }} className="text-[#2563eb] hover:text-[#1d4ed8] underline text-sm font-semibold transition-all">
                                            Create new account
                                        </Link>"""

new_tpo_bottom = """<div className="flex items-center justify-center space-x-2 mt-4">
                                            <p className="text-gray-500 text-xs">Don't have an account?</p>
                                            <Link to="/register" state={{ role: "tpo" }} className="text-[#2563eb] hover:text-[#1d4ed8] underline text-xs font-semibold transition-all">
                                                Create new account
                                            </Link>
                                        </div>"""

content = content.replace(old_tpo_bottom, new_tpo_bottom)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
