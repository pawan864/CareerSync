import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

buttons = re.findall(r'<button[^>]*type="submit"[^>]*>[\s\S]*?<\/button>', content)
for i, btn in enumerate(buttons):
    print(f"--- Button {i} ---")
    print(btn)
