import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the portal array everywhere
content = content.replace("['Student', 'Faculty', 'TPO', 'Recruiter']", "['Student', 'Faculty', 'TPO', 'Recruiter', 'Admin']")

# 2. Remove the existing Link to /admin-login next to the switchers
content = re.sub(r'<Link to="/admin-login".*?</Link>', '', content, flags=re.DOTALL)

# 3. Insert the Admin layout.
# It should be placed right after the Recruiter layout.
# The Recruiter layout ends with:
#                                        </div>
#                                    </div>
#                                </>
#                            ) : (
# Wait, the structure is:
# {portal === 'Student' ? ( <> Student Layout </> ) : portal === 'Faculty' ? ( <> Faculty Layout </> ) : portal === 'Recruiter' ? ( <> Recruiter Layout </> ) : portal === 'TPO' ? ( <> TPO Layout </> ) : null}

# Let's find the exact end of Recruiter or TPO to insert Admin.
# Actually, the last one is TPO or Recruiter. Let's find out which is last.
