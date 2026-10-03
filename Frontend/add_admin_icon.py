import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_footer = """            {!showSupport && (
                <div className="mt-3 text-center z-20">
                <p className="text-xs font-medium text-gray-800 drop-shadow-sm">
                    Need assistance? <button onClick={() => setShowSupport(true)} className="font-bold text-blue-900 hover:underline transition-colors cursor-pointer">Contact Technical Support</button>
                </p>
                </div>
            )}"""
new_footer = """            {!showSupport && (
                <div className="mt-4 text-center z-20 flex flex-col items-center gap-3">
                    <p className="text-xs font-medium text-gray-800 drop-shadow-sm">
                        Need assistance? <button onClick={() => setShowSupport(true)} className="font-bold text-blue-900 hover:underline transition-colors cursor-pointer">Contact Technical Support</button>
                    </p>
                    <Link to="/admin-login" className="flex items-center text-[10px] font-bold tracking-widest uppercase text-gray-700/60 hover:text-gray-900 transition-colors bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30 shadow-sm">
                        <ShieldCheck className="w-3 h-3 mr-1.5 text-gray-700/60 group-hover:text-gray-900" /> Admin Portal
                    </Link>
                </div>
            )}"""
content = content.replace(old_footer, new_footer)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
