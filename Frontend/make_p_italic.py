import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_interactive_p = """<p className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed">
                                Empowering students with <span className="text-blue-700 font-medium hover:bg-blue-100 hover:text-blue-900 px-1.5 py-0.5 rounded-md cursor-default transition-all duration-300">AI-driven skill mapping</span>, connecting industries with <span className="text-blue-700 font-medium hover:bg-blue-100 hover:text-blue-900 px-1.5 py-0.5 rounded-md cursor-default transition-all duration-300">top-tier verified talent</span>, and providing TPOs with <span className="text-blue-700 font-medium hover:bg-blue-100 hover:text-blue-900 px-1.5 py-0.5 rounded-md cursor-default transition-all duration-300">real-time placement analytics</span>.
                            </p>"""

new_italic_p = """<p className="text-lg text-gray-500 mb-8 max-w-xl leading-relaxed italic">
                                Empowering students with AI-driven skill mapping, connecting industries with top-tier verified talent, and providing TPOs with real-time placement analytics.
                            </p>"""

content = content.replace(old_interactive_p, new_italic_p)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
