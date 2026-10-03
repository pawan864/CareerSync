import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the flex centering issue that prevents scrolling to the top of the form
old_form_container = '                <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto mt-4 lg:mt-0">'
new_form_container = '                <div className="flex-1 flex flex-col py-10 max-w-md w-full mx-auto mt-4 lg:mt-0">'
content = content.replace(old_form_container, new_form_container)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
