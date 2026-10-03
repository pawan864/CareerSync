import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change autofill-light to autofill-admin in the Admin Email field
content = content.replace('className="w-full bg-transparent text-white focus:outline-none text-xs placeholder-gray-700 autofill-light"', 'className="w-full bg-transparent text-white focus:outline-none text-xs placeholder-gray-700 autofill-admin"')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
