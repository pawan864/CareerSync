import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix first back button
old_btn1 = """<button onClick={() => { setSupportStatus('idle'); setShowSupport(false); }} className="text-blue-600 font-medium hover:underline">"""
new_btn1 = """<button onClick={() => { setSupportStatus('idle'); setShowSupport(false); }} className="text-blue-600 font-medium hover:underline cursor-pointer">"""
content = content.replace(old_btn1, new_btn1)

# Fix second back button
old_btn2 = """<button onClick={() => setShowSupport(false)} className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">"""
new_btn2 = """<button onClick={() => setShowSupport(false)} className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">"""
content = content.replace(old_btn2, new_btn2)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
