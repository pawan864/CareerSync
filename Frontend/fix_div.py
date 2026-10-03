import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken AnimatePresence injection
content = content.replace('            </AnimatePresence>\n            </div>', '            </AnimatePresence>')

# But we DO need to add the closing div at the very end of the file.
# The end of the file looks like:
#             </AnimatePresence>
#         </div>
#     );
# };
# I will just replace the VERY LAST `</div>` with `</div>\n</div>`
def replace_last(source_string, replace_what, replace_with):
    head, _sep, tail = source_string.rpartition(replace_what)
    return head + replace_with + tail

content = replace_last(content, '        </div>\n\n    );\n};', '            </div>\n        </div>\n\n    );\n};')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
