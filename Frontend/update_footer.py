import re

footer_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Footer.jsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the logo block
old_logo = """<div className="flex items-center text-blue-600 mb-4">
                            <GraduationCap className="h-8 w-8 mr-2" />
                            <span className="font-bold text-2xl tracking-tight">
                                <span className="text-gray-900">Career</span>
                                <span className="text-blue-600">Sync</span>
                            </span>
                        </div>"""

new_logo = """<div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200">
                                <GraduationCap className="w-5 h-5 text-blue-800" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">
                                <span className="text-slate-800">Career</span>
                                <span className="text-blue-900">Sync</span>
                            </span>
                        </div>"""

content = content.replace(old_logo, new_logo)

# Update texts to dark blue
content = content.replace('text-gray-600', 'text-blue-900')
content = content.replace('text-gray-500', 'text-blue-900/80')
content = content.replace('text-gray-400', 'text-blue-900/60')

# Update headers and hover links
content = content.replace('text-blue-600', 'text-blue-900')
content = content.replace('hover:text-blue-600', 'hover:text-blue-800')

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(content)
