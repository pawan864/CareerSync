import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change the background of the Technical Support card
content = content.replace(
    "`${themeStyles[globalTheme].iconBg} shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]`",
    "`${themeStyles[globalTheme].cardBg} shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]`"
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
