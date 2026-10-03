import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add the style prop to all inputs, textareas, and selects
content = content.replace('<input ', '<input style={isDarkMode ? { WebkitBoxShadow: "0 0 0px 1000px #1e293b inset", WebkitTextFillColor: "#f3f4f6" } : { WebkitBoxShadow: "0 0 0px 1000px #f8fafc inset", WebkitTextFillColor: "#111827" }} ')
content = content.replace('<textarea ', '<textarea style={isDarkMode ? { WebkitBoxShadow: "0 0 0px 1000px #1e293b inset", WebkitTextFillColor: "#f3f4f6" } : { WebkitBoxShadow: "0 0 0px 1000px #f8fafc inset", WebkitTextFillColor: "#111827" }} ')

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
