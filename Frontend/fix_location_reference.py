import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I need to move `const location = useLocation();` to the top of the component, just below `const Login = () => {`

# Let's find it and remove it from its current position
content = content.replace('    const location = useLocation();\n', '')

# Now let's insert it right after `const Login = () => {`
content = content.replace('const Login = () => {', 'const Login = () => {\n    const location = useLocation();\n')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
