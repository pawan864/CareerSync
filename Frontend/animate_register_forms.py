import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add AnimatePresence to framer-motion import
content = content.replace("import { motion } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';")

# Replace <form ...> with wrapped form
old_form_start = '                    <form onSubmit={handleSubmit} className="space-y-4">'
new_form_start = """                    <div className="overflow-hidden relative w-full pb-4">
                        <AnimatePresence mode="wait">
                            <motion.form
                                key={formData.role}
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
                                onSubmit={handleSubmit} 
                                className="space-y-4"
                            >"""
content = content.replace(old_form_start, new_form_start)

# Replace the end of the form
old_form_end = """                        <button
                            type="submit"
                            className={`w-full text-white font-medium py-2 rounded-md transition-colors shadow-lg shadow-blue-500/30 ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            Create Account
                        </button>
                    </form>"""
new_form_end = """                        <button
                            type="submit"
                            className={`w-full text-white font-medium py-2 rounded-md transition-colors shadow-lg shadow-blue-500/30 ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            Create Account
                        </button>
                            </motion.form>
                        </AnimatePresence>
                    </div>"""
content = content.replace(old_form_end, new_form_end)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
