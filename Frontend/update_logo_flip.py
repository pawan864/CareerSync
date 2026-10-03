import re

nav_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Navbar.jsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_logo = """<motion.div 
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200"
                            >
                                <GraduationCap className="w-5 h-5 text-blue-800" />
                            </motion.div>"""

new_logo = """<motion.div 
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                style={{ transformStyle: "preserve-3d" }}
                                className="w-8 h-8 relative mr-3"
                            >
                                {/* Front Face (Original) */}
                                <div 
                                    style={{ backfaceVisibility: "hidden" }}
                                    className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-blue-200"
                                >
                                    <GraduationCap className="w-5 h-5 text-blue-800" />
                                </div>
                                {/* Back Face (New Color) */}
                                <div 
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                    className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg flex items-center justify-center border border-orange-200"
                                >
                                    <GraduationCap className="w-5 h-5 text-orange-800" />
                                </div>
                            </motion.div>"""

content = content.replace(old_logo, new_logo)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(content)
