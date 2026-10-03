import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# For Admin inputs: class currently has "bg-transparent border-none text-white text-sm" or similar
# Let's target the Admin inputs specifically
admin_email_pattern = r'(<input[^>]*type="email"[^>]*className="w-full pl-10 pr-4 py-2\.5 bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0")'
content = re.sub(admin_email_pattern, r'\1 autofill-admin', content)
admin_pass_pattern = r'(<input[^>]*type="password"[^>]*className="w-full pl-10 pr-10 py-2\.5 bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0")'
content = re.sub(admin_pass_pattern, r'\1 autofill-admin', content)

# For Recruiter inputs
rec_email_pattern = r'(<input[^>]*type="email"[^>]*className="w-full pl-10 pr-4 py-2\.5 bg-transparent border-none text-gray-100 text-sm focus:outline-none focus:ring-0")'
content = re.sub(rec_email_pattern, r'\1 autofill-recruiter', content)
rec_pass_pattern = r'(<input[^>]*type="password"[^>]*className="w-full pl-10 pr-10 py-2\.5 bg-transparent border-none text-gray-100 text-sm focus:outline-none focus:ring-0")'
content = re.sub(rec_pass_pattern, r'\1 autofill-recruiter', content)

# For Light mode inputs (Student, Faculty, TPO)
light_email_pattern = r'(<input[^>]*type="email"[^>]*className="w-full pl-10 pr-4 py-2\.5 bg-transparent border-none text-gray-900 text-sm focus:outline-none focus:ring-0")'
content = re.sub(light_email_pattern, r'\1 autofill-light', content)
light_pass_pattern = r'(<input[^>]*type="password"[^>]*className="w-full pl-10 pr-10 py-2\.5 bg-transparent border-none text-gray-900 text-sm focus:outline-none focus:ring-0")'
content = re.sub(light_pass_pattern, r'\1 autofill-light', content)

# And for the support form inputs
support_email_pattern = r'(<input[^>]*type="email"[^>]*className="w-full px-3 py-2 bg-white/70 border border-white/40)'
content = re.sub(support_email_pattern, r'\1 autofill-light', content)
support_text_pattern = r'(<input[^>]*type="text"[^>]*className="w-full px-3 py-2 bg-white/70 border border-white/40)'
content = re.sub(support_text_pattern, r'\1 autofill-light', content)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
