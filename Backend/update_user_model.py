import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\models\User.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_fields = """
    studentId: String,
    college: String,
    course: String,
    branch: String,
    semester: String,
    phone: String,
    facultyId: String,
    department: String,
    designation: String,
    expertise: String,
    companyName: String,
    corporateEmail: String,
    website: String,
    industryType: String,
    companySize: String,
    location: String,
    registrationInfo: String,
    tpoId: String,
    institutionCode: String,
"""

content = content.replace("    role: {", new_fields + "    role: {")

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\models\User.js', 'w', encoding='utf-8') as f:
    f.write(content)
