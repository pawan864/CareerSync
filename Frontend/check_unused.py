import re

files = [
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx',
    r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"--- {file} ---")
    
    # Simple check for unused imports
    imports = re.findall(r'import\s+.*?from\s+[\'"].*?[\'"]', content)
    
    # Count occurrences of lucide-react icons specifically
    lucide_imports = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"]', content)
    if lucide_imports:
        icons = [i.strip() for i in lucide_imports.group(1).split(',')]
        for icon in icons:
            # check if icon is used in JSX
            if f'<{icon}' not in content and f'icon: {icon}' not in content:
                print(f"UNUSED ICON: {icon}")

