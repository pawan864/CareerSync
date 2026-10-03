import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_end = """                </AnimatePresence>
            </div>
        </div>
    );
};"""

new_end = """                </AnimatePresence>
            </div>
            
            <div className="absolute bottom-6 w-full text-center z-20">
                <p className="text-sm font-medium text-gray-800 drop-shadow-sm">
                    Any issue? <a href="#" className="font-bold text-blue-900 hover:underline">Contact Administrator</a>
                </p>
            </div>
        </div>
    );
};"""

content = content.replace(old_end, new_end)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
