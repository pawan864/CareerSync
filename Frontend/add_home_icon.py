import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Home to lucide-react imports
if "Home" not in content:
    content = content.replace("ArrowLeft,", "ArrowLeft, Home,")

# Add the back to home button to the support card
old_support_header = """                        {showSupport ? (
                            <div className="w-full p-8 flex flex-col justify-center h-full">
                                <div className="flex flex-col items-center text-center mb-6">"""
new_support_header = """                        {showSupport ? (
                            <div className="w-full p-8 flex flex-col justify-center h-full relative">
                                <Link to="/" className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer" title="Back to Home">
                                    <Home className="w-5 h-5" />
                                </Link>
                                <div className="flex flex-col items-center text-center mb-6">"""
content = content.replace(old_support_header, new_support_header)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
