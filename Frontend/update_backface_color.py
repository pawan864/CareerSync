import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_back_face = """<div 
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                    className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg flex items-center justify-center border border-orange-200"
                                >
                                    <GraduationCap className="w-5 h-5 text-orange-800" />
                                </div>"""

new_back_face = """<div 
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-fuchsia-600/20 rounded-lg flex items-center justify-center border border-purple-200"
                                >
                                    <GraduationCap className="w-5 h-5 text-purple-800" />
                                </div>"""

content = content.replace(old_back_face, new_back_face)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
