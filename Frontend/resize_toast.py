import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_toast = """                        className="fixed top-8 right-8 z-[100] bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-xl p-3 min-w-[160px] flex flex-col items-center gap-1"
                    >
                        <button onClick={() => setDevOtp('')} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                            <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="text-teal-600 text-[10px] font-bold tracking-widest uppercase mb-1">Your OTP Code</div>
                        <div className="text-center tracking-[0.3em] font-mono text-xl font-black text-gray-800">
                            {devOtp}
                        </div>"""

new_toast = """                        className="fixed top-8 right-8 z-[100] bg-white/95 backdrop-blur-md border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg p-2.5 min-w-[140px] flex flex-col items-center gap-0.5 cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
                        onClick={() => {
                            navigator.clipboard.writeText(devOtp);
                            setSuccessMsg('OTP copied to clipboard!');
                            setDevOtp('');
                        }}
                    >
                        <button onClick={(e) => { e.stopPropagation(); setDevOtp(''); }} className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full p-0.5">
                            <X className="w-3 h-3" />
                        </button>
                        <div className="text-blue-600 text-[9px] font-extrabold tracking-[0.2em] uppercase mt-0.5 group-hover:text-blue-700 transition-colors">Your OTP Code</div>
                        <div className="text-center tracking-[0.25em] font-mono text-lg font-black text-gray-800 group-hover:text-black transition-colors">
                            {devOtp}
                        </div>"""

content = content.replace(old_toast, new_toast)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
