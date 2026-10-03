import re

def update_switcher(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace bg-[#1e40af] text-white with the primaryBtn background
    content = content.replace(
        "? 'bg-[#1e40af] text-white shadow-sm'",
        "? `${themeStyles[globalTheme].primaryBtn} text-white shadow-sm`"
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_switcher(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx')
update_switcher(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx')
