import re

def fix_quotes(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change `'${...}'` to `` `${...}` ``
    # Specifically:
    # : '${themeStyles[globalTheme].primaryBtn} text-white shadow-blue-500/30'
    # needs to become
    # : `${themeStyles[globalTheme].primaryBtn} text-white shadow-blue-500/30`
    
    # We can just search for anything like `'${` and replace the surrounding quotes
    content = re.sub(r"'(\$\{themeStyles\[globalTheme\]\.primaryBtn\}[^']*)'", r"`\1`", content)

    # What about group-hover:${themeStyles[globalTheme].primaryBtn} inside double quotes?
    # `className="... group-hover:${themeStyles[globalTheme].primaryBtn} ..."`
    # The previous script had: `pattern = r'className="([^"]*\$\{[^}]+\}[^"]*)"'` which fixed the double quotes to backticks!
    # But for single quotes inside an already backticked template literal block, we need backticks.
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_quotes(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx')
fix_quotes(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx')

