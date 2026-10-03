import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update labels
# Old: className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
# New: className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
content = content.replace("className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}", "className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}")

# 2. Update inputs (text, email, url)
# Old: className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent' : 'bg-[#f8fafc] text-gray-900 border border-gray-300'}`}
# New: className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-colors text-xs placeholder-gray-400 ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent focus:bg-[#0f172a]' : 'bg-[#f0f4f8] text-gray-900 border-transparent focus:bg-white'}`}

old_input = "className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent' : 'bg-[#f8fafc] text-gray-900 border border-gray-300'}`}"
new_input = "className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-colors text-xs placeholder-gray-400 ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent focus:bg-[#0f172a]' : 'bg-[#f0f4f8] text-gray-900 border-transparent focus:bg-white'}`}"
content = content.replace(old_input, new_input)

# Update password input
old_password = "className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent' : 'bg-[#f8fafc] text-gray-900 border border-gray-300'}`}"
new_password = "className={`w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-colors text-xs placeholder-gray-400 pr-10 ${isDarkMode ? 'bg-[#1e293b] text-gray-100 border-transparent focus:bg-[#0f172a]' : 'bg-[#f0f4f8] text-gray-900 border-transparent focus:bg-white'}`}"
content = content.replace(old_password, new_password)

# 3. Add placeholders to fields that don't have them
content = content.replace('<input type="text" name="name" required className=', '<input type="text" name="name" placeholder="Enter full name" required className=')
# Need to be careful because some already have placeholder.
# Let's use regex for specific name="" to add placeholders.

# name="name" might be Recruiter Name, TPO Name, or Full Name.
# Let's just do a blanket regex to add placeholder based on name if it doesn't have one.
# It's easier to just rely on the new CSS for now, and manually add placeholders where missing.

def add_placeholder(match):
    name = match.group(1)
    if 'placeholder=' in match.group(0):
        return match.group(0)
    
    placeholders = {
        'name': 'Enter full name',
        'email': 'Enter email address',
        'studentId': 'e.g. STU-2023-001',
        'facultyId': 'e.g. FAC-2023',
        'college': 'e.g. MIT',
        'department': 'e.g. Computer Science',
        'designation': 'e.g. Professor',
        'expertise': 'e.g. AI, Machine Learning',
        'phone': 'Enter 10-digit number',
        'tpoId': 'e.g. TPO-1234',
        'institutionCode': 'e.g. INST-5678',
        'companyName': 'e.g. Google',
        'corporateEmail': 'e.g. hr@company.com',
        'website': 'https://www.company.com',
        'industryType': 'e.g. Technology',
        'companySize': 'e.g. 50-200',
        'location': 'e.g. New York, USA',
        'registrationInfo': 'Enter registration details',
        'password': 'Enter your password'
    }
    p = placeholders.get(name, f'Enter {name}')
    return match.group(0).replace('name="' + name + '"', f'name="{name}" placeholder="{p}"')

content = re.sub(r'<input\s+(?:[^>]*?)name="([^"]+)"(?:[^>]*?)>', add_placeholder, content)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
