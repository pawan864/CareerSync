import re

dashboard_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\admin\AdminDashboard.jsx'
with open(dashboard_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's fix OverviewModule which was broken by my naive string replace
# It currently has:
#         </div>
#     </div>
#   );
# };
# 
# const VerificationModule = () => {

broken_overview = """        </div>
    </div>
  );
};

const VerificationModule = () => {"""

fixed_overview = """        </div>
    </div>
);

const VerificationModule = () => {"""

content = content.replace(broken_overview, fixed_overview)

with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(content)
