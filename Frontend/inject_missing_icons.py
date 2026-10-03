import re

dash_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\student\StudentDashboard.jsx'
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The current block looks like this:
# <div className="text-left flex-1">
#     <div className="text-sm font-semibold">{item.label}</div>
#     
# </div>

# Use regex to find it and inject Icon
pattern = r'<div className="text-left flex-1">\s*<div className="text-sm font-semibold">\{item\.label\}<\/div>\s*<\/div>'
replacement = """<Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                <div className="text-left flex-1">
                                    <div className="text-sm font-medium">{item.label}</div>
                                </div>"""

content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)

