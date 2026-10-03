import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the Admin right-side container
admin_container = '<div className="w-full lg:w-1/2 p-8 lg:p-12 bg-[#050505] flex flex-col relative overflow-y-auto slim-scrollbar">'
back_button = """<div className="w-full lg:w-1/2 p-8 lg:p-12 bg-[#050505] flex flex-col relative overflow-y-auto slim-scrollbar">
                                    <Link to="/" className="absolute top-4 right-6 text-gray-400 hover:text-white flex items-center text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors z-50">
                                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                                    </Link>"""

content = content.replace(admin_container, back_button)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
