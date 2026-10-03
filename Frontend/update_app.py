import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
if "import Support from" not in content:
    content = content.replace("import Register from './pages/Register';", "import Register from './pages/Register';\nimport Support from './pages/Support';")

# Add route
if "<Route path=\"/support\" element={<Support />} />" not in content:
    content = content.replace("<Route path=\"/register\" element={<Register />} />", "<Route path=\"/register\" element={<Register />} />\n                <Route path=\"/support\" element={<Support />} />")

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
