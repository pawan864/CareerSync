import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the missing brace. I replaced the end of the module with:
#         </div>
#     </div>
# );

# But since I used const VerificationModule = () => { return (...) }, it needs to be:
#         </div>
#     </div>
#   );
# };
content = content.replace(
"""        </div>
    </div>
);""", 
"""        </div>
    </div>
  );
};""")

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
