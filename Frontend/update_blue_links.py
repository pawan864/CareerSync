import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Terms and Privacy
content = content.replace('className="text-blue-600 cursor-pointer">Terms and Conditions</button>', 'className="text-blue-500 underline cursor-pointer">Terms and Conditions</button>')
content = content.replace('className="text-blue-600 cursor-pointer">Privacy Policy</button>', 'className="text-blue-500 underline cursor-pointer">Privacy Policy</button>')

# 2. Update Contact Technical Support
old_support = '<Link to="/support" className="text-blue-600 font-semibold transition-all">\n                                    Contact Technical Support'
new_support = '<Link to="/support" className="text-blue-500 underline font-semibold transition-all">\n                                    Contact Technical Support'
content = content.replace(old_support, new_support)
# Just in case of formatting mismatch, try regex:
content = re.sub(r'className="text-blue-600([^"]*)"([^>]*)>\s*Contact Technical Support', r'className="text-blue-500 underline\1"\2>\n                                    Contact Technical Support', content)


with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
