import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make all submit buttons have the exact same spinner logic
old_btn_pattern = r'<button\s+type="submit"\s+className="w-full flex items-center justify-center bg-[#2563eb].*?>.*?<\/button>'
# Wait, I don't know the exact classes of the other buttons.
