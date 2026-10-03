home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

lines[175] = lines[175].replace('</div>', '</motion.div>')

with open(home_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
