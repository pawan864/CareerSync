import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# First, let's fix the className of motion.div to support the static red ring for Admin
old_class_def = "className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col \nlg:flex-row transition-all duration-500 ${showSupport ? 'bg-blue-50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]' : \n'bg-white shadow-2xl'}`}"

# Wait, the exact string is:
# className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500 ${showSupport ? 'bg-blue-50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]' : 'bg-white shadow-2xl'}`}

# Let's replace the motion.div wrapper entirely using regex
pattern = r'<motion\.div\s+key=\{showSupport \? \'support\' : portal\}\s+initial="initial"\s+animate="in"\s+exit="out"\s+variants=\{pageVariants\}\s+transition=\{pageTransition\}\s+className=\{`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row [^`]*`\}\s*>'

new_motion_div = """<motion.div
                        key={showSupport ? 'support' : portal}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        whileHover={portal === 'Admin' && !showSupport ? { scale: 1.02, boxShadow: "0 0 60px rgba(220,38,38,0.4)" } : {}}
                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-300 ${portal === 'Admin' && !showSupport ? 'bg-[#050505] ring-2 ring-inset ring-red-500/60 shadow-2xl hover:ring-red-500' : 'bg-white shadow-2xl'}`}
                    >"""

content = re.sub(pattern, new_motion_div, content, flags=re.DOTALL)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
