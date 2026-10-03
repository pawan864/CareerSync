import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add logo styles to dynamicStyles
old_blue = 'linkHover: "hover:text-blue-900" }'
new_blue = 'linkHover: "hover:text-blue-900", logoBg: "from-green-500/20 to-blue-600/20", logoBorder: "border-blue-200", logoText: "text-blue-800" }'
content = content.replace(old_blue, new_blue)

old_indigo = 'linkHover: "hover:text-indigo-900" }'
new_indigo = 'linkHover: "hover:text-indigo-900", logoBg: "from-purple-500/20 to-indigo-600/20", logoBorder: "border-indigo-200", logoText: "text-indigo-800" }'
content = content.replace(old_indigo, new_indigo)

old_orange = 'linkHover: "hover:text-orange-900" }'
new_orange = 'linkHover: "hover:text-orange-900", logoBg: "from-amber-500/20 to-orange-600/20", logoBorder: "border-orange-200", logoText: "text-orange-800" }'
content = content.replace(old_orange, new_orange)

# Update the front face of the logo
old_front_face = """                                <div 
                                    style={{ backfaceVisibility: "hidden" }}
                                    className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-blue-200"
                                >
                                    <GraduationCap className="w-5 h-5 text-blue-800" />
                                </div>"""

new_front_face = """                                <div 
                                    style={{ backfaceVisibility: "hidden" }}
                                    className={`absolute inset-0 bg-gradient-to-br ${dynamicStyles[navTheme].logoBg} rounded-lg flex items-center justify-center border ${dynamicStyles[navTheme].logoBorder} transition-colors duration-500`}
                                >
                                    <GraduationCap className={`w-5 h-5 ${dynamicStyles[navTheme].logoText} transition-colors duration-500`} />
                                </div>"""
content = content.replace(old_front_face, new_front_face)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
