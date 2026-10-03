import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the missing </div> to the TPO layout
# I'll just find where the ADMIN layout starts and inject the </div> right before it.
content = content.replace(
    """) : (
                            <>
                                {/* ADMIN Layout */}""",
    """                                </div>
                            </>
                        ) : (
                            <>
                                {/* ADMIN Layout */}"""
)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
