import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the Admin portal main right-side container which starts like this:
# <div className="w-full lg:w-1/3 bg-[#0a0a0a] border-l border-gray-800 flex flex-col relative z-20">
# And I'll insert the Back button link right after it.

admin_container_pattern = r'(<div className="w-full lg:w-1/3 bg-\[\#0a0a0a\] border-l border-gray-800 flex flex-col relative z-20">)'

back_button = """
                                    <Link to="/" className="absolute top-4 right-6 text-gray-400 hover:text-white flex items-center text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors z-50">
                                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                                    </Link>"""

content = re.sub(admin_container_pattern, r'\1' + back_button, content)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
