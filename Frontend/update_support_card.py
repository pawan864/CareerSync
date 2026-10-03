import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Support.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_card = """            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-white rounded-2xl shadow-xl z-10 overflow-hidden"
            >
                <div className="bg-blue-600 p-6 text-white flex flex-col items-center text-center">
                    <MessageSquare className="w-12 h-12 mb-3 opacity-90" />
                    <h2 className="text-2xl font-bold tracking-tight">Technical Support</h2>
                    <p className="text-blue-100 mt-1 text-sm">We're here to help you resolve any issues.</p>
                </div>
                
                <div className="p-8">"""

new_card = """            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10 p-8"
            >
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-3">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Technical Support</h2>
                    <p className="text-gray-500 mt-1 text-sm">We're here to help you resolve any issues.</p>
                </div>
                
                <div>"""

content = content.replace(old_card, new_card)

# also change input backgrounds to be slightly transparent
content = content.replace('className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"', 'className="w-full px-4 py-2 bg-white/70 border border-white/40 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm"')
content = content.replace('className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm bg-white"', 'className="w-full px-4 py-2 bg-white/70 border border-white/40 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm"')
content = content.replace('className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"', 'className="w-full px-4 py-2 bg-white/70 border border-white/40 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm resize-none"')

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Support.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
