import re

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Expand themeStyles with these new variables
    content = content.replace(
        'linkText: "text-blue-800" }',
        'linkText: "text-blue-800", primaryBtn: "bg-blue-600 hover:bg-blue-700", iconColor: "text-blue-600", labelColor: "text-blue-900", ringColor: "focus-within:ring-blue-600 focus:ring-blue-600" }'
    )
    content = content.replace(
        'linkText: "text-indigo-800" }',
        'linkText: "text-indigo-800", primaryBtn: "bg-indigo-600 hover:bg-indigo-700", iconColor: "text-indigo-600", labelColor: "text-indigo-900", ringColor: "focus-within:ring-indigo-600 focus:ring-indigo-600" }'
    )
    content = content.replace(
        'linkText: "text-orange-800" }',
        'linkText: "text-orange-800", primaryBtn: "bg-orange-600 hover:bg-orange-700", iconColor: "text-orange-600", labelColor: "text-orange-900", ringColor: "focus-within:ring-orange-600 focus:ring-orange-600" }'
    )
    
    # 1. Replace Primary Button `bg-[#2563eb] hover:bg-[#1d4ed8]`
    content = re.sub(r'bg-\[\#2563eb\] hover:bg-\[\#1d4ed8\]', r'${themeStyles[globalTheme].primaryBtn}', content)
    
    # Also replace isolated `bg-[#2563eb]` if it's the Send OTP button or slants
    # (Be careful, there's a slanted blue overlay at bottom with `bg-[#2563eb]`)
    content = re.sub(r'bg-\[\#2563eb\]', r'${themeStyles[globalTheme].primaryBtn}', content)

    # 2. Replace Icon color and text highlights `text-[#2563eb]`
    content = re.sub(r'text-\[\#2563eb\]', r'${themeStyles[globalTheme].iconColor}', content)
    
    # 3. Replace Labels and dark text `text-[#1e3a8a]`
    content = re.sub(r'text-\[\#1e3a8a\]', r'${themeStyles[globalTheme].labelColor}', content)

    # 4. Replace Focus Rings `focus-within:ring-[#2563eb]` and `focus:ring-[#2563eb]`
    content = re.sub(r'focus-within:ring-\[\#2563eb\]', r'${themeStyles[globalTheme].ringColor}', content)
    content = re.sub(r'focus:ring-\[\#2563eb\]', r'${themeStyles[globalTheme].ringColor}', content)
    content = re.sub(r'focus:border-\[\#2563eb\]', r'', content) # Just remove it, ring is enough

    # Ensure template literal string closures aren't broken.
    # The previous replacements might insert `${...}` into strings that are using `"..."` instead of `` `...` ``.
    # We must convert `className="..."` to `className={`...`}` if they now contain `${`
    
    # Find all classNames that contain `${` but are wrapped in double quotes
    pattern = r'className="([^"]*\$\{[^}]+\}[^"]*)"'
    content = re.sub(pattern, r'className={`\1`}', content)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_file(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx')
update_file(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx')
