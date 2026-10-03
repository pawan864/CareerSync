import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_text = '<p className="text-gray-400 text-sm font-medium">Authorized Personnel Only</p>'
new_text = """<p className="text-gray-400 text-sm font-medium mb-3">Authorized Personnel Only</p>
                                        <p className="text-red-300/70 text-sm max-w-xs mx-auto leading-relaxed italic font-light tracking-wide">
                                            "Maintaining the integrity, security, and performance of the CareerSync network."
                                        </p>"""

content = content.replace(old_text, new_text)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
