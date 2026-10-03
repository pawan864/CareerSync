import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The "Sign in" link currently is:
# <Link to="/login" className="text-blue-500 font-semibold transition-all">
#     Sign in
# </Link>

old_signin = 'className="text-blue-500 font-semibold transition-all">\n                                    Sign in'
new_signin = 'className="text-blue-500 hover:underline font-semibold transition-all">\n                                    Sign in'
content = content.replace(old_signin, new_signin)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
