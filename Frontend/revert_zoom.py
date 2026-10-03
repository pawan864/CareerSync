import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the motion.div with whileHover back to the clean version
old_chunk = """<motion.div
                        key={showSupport ? 'support' : portal}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        whileHover={portal === 'Admin' && !showSupport ? { scale: 1.02, boxShadow: "0 0 60px rgba(220,38,38,0.4)" } : {}}
                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-300 ${portal === 'Admin' && !showSupport ? 'bg-[#050505] ring-2 ring-inset ring-red-500/60 shadow-2xl hover:ring-red-500' : 'bg-white shadow-2xl'}`}
                    >"""

# Back to before the zoom stuff, just a static red border ring
new_chunk = """<motion.div
                          key={showSupport ? 'support' : portal}
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                          className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500 ${portal === 'Admin' && !showSupport ? 'bg-[#050505] ring-2 ring-inset ring-red-500 shadow-[0_0_40px_rgba(220,38,38,0.3)]' : showSupport ? 'bg-blue-50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]' : 'bg-white shadow-2xl'}`}
                      >"""

content = content.replace(old_chunk, new_chunk)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
