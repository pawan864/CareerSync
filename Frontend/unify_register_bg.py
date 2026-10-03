import re

register_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(register_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the image from the left panel
old_left = """<div 
                className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 relative overflow-hidden"
                style={{
                    backgroundImage: "url('/register-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="absolute inset-0 bg-black/40 z-0"></div>"""

new_left = """<div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 relative overflow-hidden bg-black/40 backdrop-blur-sm z-10">"""
content = content.replace(old_left, new_left)

# 2. Add the image to the root container
old_root = '<div \n            className="fixed inset-0 w-full h-full overflow-hidden flex font-sans"\n        >'
new_root = """<div 
            className="fixed inset-0 w-full h-full overflow-hidden flex font-sans"
            style={{
                backgroundImage: "url('/register-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >"""
content = content.replace(old_root, new_root)
if "backgroundImage: \"url('/register-bg.jpg')\"" not in content:
    # try another match
    old_root2 = '<div className="fixed inset-0 w-full h-full overflow-hidden flex font-sans">'
    content = content.replace(old_root2, new_root)

# 3. Make the right card glassmorphic
old_right_card = "className={`w-full lg:w-1/2 flex flex-col relative px-8 sm:px-16 py-8 overflow-y-auto slim-scrollbar  ${isDarkMode ? 'bg-[#020617]' : 'bg-white'}`}"
new_right_card = "className={`w-full lg:w-1/2 flex flex-col relative px-8 sm:px-16 py-8 overflow-y-auto slim-scrollbar z-10 backdrop-blur-md ${isDarkMode ? 'bg-[#020617]/85' : 'bg-white/85'}`}"
content = content.replace(old_right_card, new_right_card)

with open(register_path, 'w', encoding='utf-8') as f:
    f.write(content)
