home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Lists are 0-indexed, so line 203 is index 202
lines[202] = lines[202].replace('</div>', '</motion.div>')
lines[249] = lines[249].replace('</div>', '</motion.div>')

with open(home_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
