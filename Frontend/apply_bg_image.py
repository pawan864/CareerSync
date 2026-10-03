import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the outer container
old_container = r'<div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center py-2 px-4 \n?overflow-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600">'

new_container = """<div 
            className="fixed inset-0 w-full h-full flex flex-col items-center justify-center py-2 px-4 overflow-hidden"
            style={{
                backgroundImage: "url('/login-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="absolute inset-0 bg-black/20 z-0"></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">"""

content = re.sub(old_container, new_container, content)

# I also need to close the extra relative z-10 wrapper I just added right before the final </div> of the component!
# The component ends with:
#             {/* Custom Interactive Dev OTP Toast */}
#             <AnimatePresence>
# ...
#             </AnimatePresence>
#         </div>
#     );
# };
content = content.replace('            </AnimatePresence>\n        </div>\n    );\n};', '            </AnimatePresence>\n            </div>\n        </div>\n    );\n};')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
