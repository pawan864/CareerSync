import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the button content
old_content = """                                >
                                    {p.label}
                                </button>"""

new_content = """                                >
                                    <div className="flex items-center space-x-1.5">
                                        <p.icon className="w-3.5 h-3.5" />
                                        <span>{p.label}</span>
                                    </div>
                                </button>"""

content = content.replace(old_content, new_content)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
