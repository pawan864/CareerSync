import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_link = """            <div className="mt-3 text-center z-20">
                <p className="text-xs font-medium text-gray-800 drop-shadow-sm">
                    Need assistance? <a href="#" className="font-bold text-blue-900 hover:underline transition-colors">Contact Technical Support</a>
                </p>
            </div>"""

new_link = """            <div className="mt-3 text-center z-20">
                <p className="text-xs font-medium text-gray-800 drop-shadow-sm">
                    Need assistance? <Link to="/support" className="font-bold text-blue-900 hover:underline transition-colors">Contact Technical Support</Link>
                </p>
            </div>"""

content = content.replace(old_link, new_link)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
