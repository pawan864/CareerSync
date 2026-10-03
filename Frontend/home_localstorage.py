import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

# Make Home save pageTheme to localStorage
old_hook = """    useEffect(() => {
        window.dispatchEvent(new CustomEvent('pageThemeChange', { detail: { theme: pageTheme } }));
    }, [pageTheme]);"""

new_hook = """    useEffect(() => {
        localStorage.setItem('globalTheme', pageTheme);
        window.dispatchEvent(new CustomEvent('pageThemeChange', { detail: { theme: pageTheme } }));
    }, [pageTheme]);"""

home_content = home_content.replace(old_hook, new_hook)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(home_content)
