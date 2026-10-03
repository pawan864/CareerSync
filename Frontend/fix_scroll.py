import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix layout padding and gap
old_layout = """        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600">
            <>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </>
            
            {/* Brand Logo and Tagline */}
            <div className="text-center z-20 mb-6 drop-shadow-md">"""
new_layout = """        <div className="min-h-screen flex flex-col items-center justify-center py-2 px-4 relative overflow-hidden bg-gradient-to-r from-white via-blue-200 to-blue-600">
            <>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </>
            
            {/* Brand Logo and Tagline */}
            <div className="text-center z-20 mb-3 drop-shadow-md">"""
content = content.replace(old_layout, new_layout)

# Fix min-height of card
content = content.replace('className="w-full max-w-5xl rounded-3xl min-h-[600px] shadow-2xl relative z-10 perspective-1000"', 'className="w-full max-w-5xl rounded-3xl min-h-[540px] shadow-2xl relative z-10 perspective-1000"')

# Fix bottom margin
old_footer = """            <div className="mt-6 text-center z-20">
                <p className="text-sm font-medium text-gray-800 drop-shadow-sm">
                    Need assistance? <a href="#" className="font-bold text-blue-900 hover:underline transition-colors">Contact Technical Support</a>
                </p>
            </div>"""
new_footer = """            <div className="mt-3 text-center z-20">
                <p className="text-xs font-medium text-gray-800 drop-shadow-sm">
                    Need assistance? <a href="#" className="font-bold text-blue-900 hover:underline transition-colors">Contact Technical Support</a>
                </p>
            </div>"""
content = content.replace(old_footer, new_footer)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
