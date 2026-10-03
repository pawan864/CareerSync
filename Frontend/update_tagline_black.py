import re

def update_tagline(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace text-blue-900/80 with text-black
    content = content.replace(
        'className="text-blue-900/80 text-sm font-medium tracking-wide"',
        'className="text-black text-sm font-medium tracking-wide"'
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_tagline(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx')
update_tagline(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx')

