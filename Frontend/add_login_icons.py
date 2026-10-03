import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Student tab
old_student_header = """<h2 className="text-white text-xl font-bold mb-2 text-center lg:text-left">Login</h2>
                                        <p className="text-gray-400 text-xs mb-8 text-center lg:text-left">Enter your account details</p>"""
new_student_header = """<div className="flex flex-col items-center lg:items-start mb-6">
                                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3 text-[#2563eb]">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-white text-xl font-bold mb-1">Student Login</h2>
                                            <p className="text-gray-400 text-xs">Enter your account details</p>
                                        </div>"""
content = content.replace(old_student_header, new_student_header)

# 2. Faculty tab
old_faculty_header = """<h2 className="text-[#0f172a] text-xl font-bold mb-2">Faculty/Mentor Login</h2>
                                        <p className="text-gray-500 text-sm mb-6">Enter your academic credentials</p>"""
new_faculty_header = """<div className="flex flex-col items-center lg:items-start mb-6">
                                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 text-[#2563eb]">
                                                <Users className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-1">Faculty Login</h2>
                                            <p className="text-gray-500 text-xs">Enter your academic credentials</p>
                                        </div>"""
content = content.replace(old_faculty_header, new_faculty_header)

# 3. TPO tab
old_tpo_header = """<h2 className="text-[#0f172a] text-xl font-bold mb-2">Welcome back</h2>
                                    <p className="text-gray-500 text-sm mb-6">Login to your account to continue</p>"""
new_tpo_header = """<div className="flex flex-col items-center lg:items-start mb-6">
                                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 text-[#2563eb]">
                                            <Building className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-[#1e3a8a] text-2xl font-bold mb-1">TPO Login</h2>
                                        <p className="text-gray-500 text-xs">Login to your account to continue</p>
                                    </div>"""
content = content.replace(old_tpo_header, new_tpo_header)

# Also fix the Recruiter icon color to match (text-[#2563eb])
content = content.replace(
    '<div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2 text-teal-600">',
    '<div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2 text-[#2563eb]">'
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
