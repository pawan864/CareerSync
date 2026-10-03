import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find all inputs and append autofill-light if they don't have autofill-admin
def inject_autofill(match):
    full_str = match.group(0)
    if 'autofill-admin' not in full_str and 'autofill-light' not in full_str:
        return full_str[:-1] + ' autofill-light"'
    return full_str

content = re.sub(r'className="[^"]*bg-transparent[^"]*"', inject_autofill, content)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
