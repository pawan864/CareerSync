import re

files = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\AdminLogin.jsx'
]

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        content = content.replace('h-10 w-10 text-teal-600', 'h-12 w-12 text-teal-600')
        content = content.replace('h-8 w-8 text-teal-600', 'h-12 w-12 text-teal-600')
        content = content.replace('text-2xl font-extrabold', 'text-3xl font-extrabold')
        content = content.replace('text-3xl font-extrabold', 'text-4xl font-extrabold')

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(e)

