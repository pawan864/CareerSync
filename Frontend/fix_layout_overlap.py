import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_logo = """            {/* Brand Logo and Tagline */}
            <div className="text-center z-20 mb-8 drop-shadow-md">
                <div className="flex items-center justify-center text-blue-900 mb-2">
                    <GraduationCap className="h-10 w-10 mr-3 text-blue-700" />
                    <span className="font-extrabold text-4xl tracking-tight">
                        Career<span className="text-blue-700">Sync</span>
                    </span>
                </div>
                <p className="text-blue-900/80 font-medium tracking-wide">
                    Bridging the Gap Between Talent and Opportunity
                </p>
            </div>"""

new_logo = """            {/* Brand Logo and Tagline */}
            <div className="text-center z-20 mb-6 drop-shadow-md">
                <div className="flex items-center justify-center text-blue-900 mb-1.5">
                    <GraduationCap className="h-8 w-8 mr-2.5 text-blue-700" />
                    <span className="font-extrabold text-3xl tracking-tight">
                        Career<span className="text-blue-700">Sync</span>
                    </span>
                </div>
                <p className="text-blue-900/80 text-sm font-medium tracking-wide">
                    Bridging the Gap Between Talent and Opportunity
                </p>
            </div>"""

content = content.replace(old_logo, new_logo)

old_footer = """            <div className="absolute bottom-6 w-full text-center z-20">
                <p className="text-sm font-medium text-gray-800 drop-shadow-sm">
                    Need assistance? <a href="#" className="font-bold text-blue-900 hover:underline transition-colors">Contact Technical Support</a>
                </p>
            </div>"""
            
new_footer = """            <div className="mt-6 text-center z-20">
                <p className="text-sm font-medium text-gray-800 drop-shadow-sm">
                    Need assistance? <a href="#" className="font-bold text-blue-900 hover:underline transition-colors">Contact Technical Support</a>
                </p>
            </div>"""

content = content.replace(old_footer, new_footer)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
