import re

logo_box_html = """<div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200">
                                <GraduationCap className="w-6 h-6 text-blue-800" />
                            </div>"""

auth_pages = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
]

for page in auth_pages:
    try:
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the raw GraduationCap in the auth headers
        content = re.sub(r'<GraduationCap className="h-8 w-8 mr-2.5 text-teal-600" />', logo_box_html, content)
        content = re.sub(r'<GraduationCap className="h-10 w-10 mr-3 text-teal-600" />', logo_box_html, content)
        
        # Fix any remaining teal-600 logos just in case
        content = re.sub(r'<GraduationCap className="[^"]*text-teal-600[^"]*" />', logo_box_html, content)

        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Failed on {page}: {e}")

