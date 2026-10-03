import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The recruiter button style:
recruiter_style = 'w-full flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-2.5 rounded-lg transition-colors mt-4 text-xs shadow-md shadow-blue-500/30'

# Replace Student button (bg-[#9b72f0])
content = re.sub(
    r'className="w-full bg-\[\#9b72f0\] hover:bg-\[\#865eea\] text-white font-medium py-2\.5 rounded-lg transition-colors mt-6 text-sm"',
    f'className="{recruiter_style}"',
    content
)

# Replace Faculty button (bg-[#047857])
content = re.sub(
    r'className="w-full bg-\[\#047857\] hover:bg-\[\#065f46\] text-white font-semibold py-3 rounded-lg transition-colors mt-4 text-sm flex items-center justify-center shadow-md"',
    f'className="{recruiter_style}"',
    content
)

# Replace generic portal button (bg-blue-600)
content = re.sub(
    r'className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-6 text-sm"',
    f'className="{recruiter_style}"',
    content
)

# Ensure the recruiter button itself has mt-4 so they all match perfectly
content = content.replace(
    'className="w-full flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-2.5 rounded-lg transition-colors mt-1 text-xs shadow-md shadow-blue-500/30"',
    f'className="{recruiter_style}"'
)

# The user also wants the arrow in the Student button to match? The recruiter button has: 
# {otpSent ? (timeLeft > 0 ? 'Login' : 'Resend OTP') : 'Send OTP'} as Recruiter <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
# The Student button currently has NO arrow and NO "as Student". Let's check what it has.
# We will just change the class names as requested ("only button").

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
