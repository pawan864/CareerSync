import re

logo_box_html = """<div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200">
                                <GraduationCap className="w-6 h-6 text-blue-800" />
                            </div>"""

auth_logo_box_html = """<div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-200 shadow-sm">
                        <GraduationCap className="w-8 h-8 text-blue-800" />
                    </div>"""

# Navbar.jsx
nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

nav_content = re.sub(r'<GraduationCap className="[^"]+" />', logo_box_html, nav_content)
with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(nav_content)

# Auth Pages
auth_pages = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
]

for page in auth_pages:
    try:
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the raw GraduationCap with the boxed version
        content = re.sub(r'<div className="flex justify-center mb-4">\s*<GraduationCap className="[^"]+" />\s*</div>', auth_logo_box_html, content)
        # If it doesn't have the wrapper div:
        content = re.sub(r'<GraduationCap className="h-12 w-12 text-teal-600 mx-auto mb-4" />', auth_logo_box_html, content)
        content = re.sub(r'<GraduationCap className="h-12 w-12 text-teal-600" />', auth_logo_box_html, content)

        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Failed on {page}: {e}")

