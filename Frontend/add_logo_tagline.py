import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_wrapper = """        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600">
            <>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </>

            {/* Absolute positioning container wrapper so layout doesn't break during transition */}
            <div className="w-full max-w-5xl rounded-3xl min-h-[600px] shadow-2xl relative z-10 perspective-1000">"""

new_wrapper = """        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600">
            <>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </>
            
            {/* Brand Logo and Tagline */}
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
            </div>

            {/* Absolute positioning container wrapper so layout doesn't break during transition */}
            <div className="w-full max-w-5xl rounded-3xl min-h-[600px] shadow-2xl relative z-10 perspective-1000">"""

content = content.replace(old_wrapper, new_wrapper)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
