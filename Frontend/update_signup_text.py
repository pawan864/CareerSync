import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change 'Sign up' to 'Create your account'
old_signup = '<Link to="/register" className="text-[#2563eb] hover:text-[#1d4ed8] underline text-xs font-semibold transition-all">\n                                                    Sign up\n                                                </Link>'
new_signup = '<Link to="/register" className="text-[#2563eb] hover:text-[#1d4ed8] underline text-xs font-semibold transition-all">\n                                                    Create your account\n                                                </Link>'

content = content.replace(old_signup, new_signup)

# Just in case formatting doesn't perfectly match
content = content.replace('>Sign up<', '>Create your account<')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
