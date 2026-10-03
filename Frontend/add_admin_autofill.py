import re

css_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\index.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

admin_css = """
.autofill-admin:-webkit-autofill,
.autofill-admin:-webkit-autofill:hover, 
.autofill-admin:-webkit-autofill:focus, 
.autofill-admin:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #0a0a0a inset !important;
    -webkit-text-fill-color: #ffffff !important;
    caret-color: #ffffff !important;
}
"""

content += admin_css

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)
