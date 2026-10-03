import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_wrapper = """        <div className="min-h-screen flex flex-col items-center justify-center py-2 px-4 relative overflow-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600">"""
new_wrapper = """        <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center py-2 px-4 overflow-y-auto overflow-x-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600">"""
content = content.replace(old_wrapper, new_wrapper)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
