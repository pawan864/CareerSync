import re

def update_icons(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change iconColor in orange theme to amber-800 (brown)
    # Also inject iconBg into all themes
    content = content.replace(
        'iconColor: "text-blue-600", labelColor',
        'iconColor: "text-blue-600", iconBg: "bg-blue-50", labelColor'
    )
    content = content.replace(
        'iconColor: "text-indigo-600", labelColor',
        'iconColor: "text-indigo-600", iconBg: "bg-indigo-50", labelColor'
    )
    content = content.replace(
        'iconColor: "text-orange-600", labelColor',
        'iconColor: "text-amber-800", iconBg: "bg-orange-50", labelColor'
    )

    # Replace bg-blue-50 and bg-blue-500/10 in the role icons
    content = re.sub(r'bg-blue-500/10', r'${themeStyles[globalTheme].iconBg}', content)
    content = re.sub(r'bg-blue-50\b', r'${themeStyles[globalTheme].iconBg}', content)
    content = re.sub(r'bg-blue-100\b', r'${themeStyles[globalTheme].iconBg}', content) # For Register CTA icon bg

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_icons(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx')
update_icons(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx')

