import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will insert the logo directly under the blur element in the left side of the admin layout.
admin_blur = '<div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-red-600/20 rounded-full blur-[100px] pointer-events-none z-10" />'

admin_logo = """                                    {/* CAREERSYNC BRAND TAG */}
                                    <div className="absolute top-8 left-8 z-50 flex items-center">
                                        <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mr-2 border border-white/5 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                                            <span className="text-white font-bold text-lg">C</span>
                                        </div>
                                        <span className="font-bold tracking-widest text-sm drop-shadow-md flex items-center">
                                            <span className="text-white">CAREER</span>
                                            <span className="bg-red-600 text-white px-1.5 py-0.5 rounded-sm leading-none ml-0.5 shadow-sm">SYNC</span>
                                        </span>
                                    </div>"""

content = content.replace(admin_blur, admin_blur + '\n' + admin_logo)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
