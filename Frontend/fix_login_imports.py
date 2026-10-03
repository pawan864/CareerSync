import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will just lazily add it to the first line of lucide-react imports if it's not there
if "Loader2" not in content:
    content = content.replace("import { \n    Mail,", "import { \n    Mail, Loader2, CheckCircle,")
    
if "CheckCircle" not in content:
    content = content.replace("import { \n    Mail,", "import { \n    Mail, CheckCircle,")

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
