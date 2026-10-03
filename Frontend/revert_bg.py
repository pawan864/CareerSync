import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the outer container and revert it
old_container = """<div 
            className="fixed inset-0 w-full h-full flex flex-col items-center justify-center py-2 px-4 overflow-hidden"
            style={{
                backgroundImage: "url('/login-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="absolute inset-0 bg-black/20 z-0"></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">"""

new_container = '<div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center py-2 px-4 overflow-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600">'

content = content.replace(old_container, new_container)

# And remove the closing div
def replace_last(source_string, replace_what, replace_with):
    head, _sep, tail = source_string.rpartition(replace_what)
    return head + replace_with + tail

content = replace_last(content, '            </div>\n        </div>\n\n    );\n};', '        </div>\n\n    );\n};')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
