import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add AnimatePresence to framer-motion import if it exists, or add it
if 'import { motion, AnimatePresence }' not in content:
    if 'import { motion }' in content:
        content = content.replace("import { motion }", "import { motion, AnimatePresence }")
    else:
        # We need to add framer-motion import
        content = content.replace("from 'react-router-dom';", "from 'react-router-dom';\nimport { motion, AnimatePresence } from 'framer-motion';")

# 2. Replace the form opening tag
old_form_start = '<form onSubmit={handleSubmit} className="space-y-4">'
new_form_start = """<div className="overflow-hidden relative w-full pb-4">
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

# 3. Replace the form closing tag
old_form_end = """                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors shadow-lg shadow-blue-500/30"
                        >
                            Create Account
                        </button>
                    </form>"""
new_form_end = """                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors shadow-lg shadow-blue-500/30"
                        >
                            Create Account
                        </button>
                            </motion.form>
                        </AnimatePresence>
                    </div>"""
content = content.replace(old_form_end, new_form_end)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
