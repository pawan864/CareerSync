import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all stray `  );\n};` that should just be `);`
# EXCEPT for VerificationModule, which we want to be `  );\n};`

# Let's just find `  );\n};` and replace with `);` globally
content = re.sub(r'\s*\);\n};', '\n);', content)

# Now, specifically fix VerificationModule to close properly
# We know VerificationModule uses React.useEffect, so it is a full block `{ ... return ( ... ); }`
# Let's find the end of VerificationModule and make sure it has `  );\n};`
ver_end_pattern = r'(<XCircle className="w-3\.5 h-3\.5 mr-1" /> Reject\s*</button>\s*</div>\s*</div>\s*\)\)}\s*</div>\s*</div>\s*\n\);)'
content = re.sub(ver_end_pattern, r'\1\n};', content)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
