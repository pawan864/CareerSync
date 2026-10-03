import re

register_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(register_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the left panel container
old_left = r'<div className="hidden lg:flex lg:w-1/2 bg-\[\#091024\] flex-col justify-center px-16 relative \n?overflow-hidden ">'

new_left = """<div 
                className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 relative overflow-hidden"
                style={{
                    backgroundImage: "url('/register-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>
                
                {/* Content Container (elevated above overlay) */}
                <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">"""

# Wait, if I wrap it in a content container, I have to close it. 
# Alternatively, I can just rely on the fact that the existing elements in the left panel have z-index or I can just add z-10 to them.
# Let's see: The decorative dots has "absolute top-12 left-16".
# The text has "z-10 mt-10".
# So if I just add the absolute inset-0 bg-black/40 z-0 right after the panel opening, the rest of the absolute/relative elements will just render on top if they have z-index!

new_left_simple = """<div 
                className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 relative overflow-hidden"
                style={{
                    backgroundImage: "url('/register-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="absolute inset-0 bg-black/40 z-0"></div>"""

content = re.sub(old_left, new_left_simple, content)

# But wait, the decorative dots have `absolute top-12 left-16 flex space-x-2`. They need `z-10`.
content = content.replace('className="absolute top-12 left-16 flex space-x-2"', 'className="absolute top-12 left-16 flex space-x-2 z-10"')

with open(register_path, 'w', encoding='utf-8') as f:
    f.write(content)
