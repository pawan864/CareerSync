import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all variations of "Send OTP as X" with just "Send OTP"
content = re.sub(r'Send OTP as [A-Za-z/]+\s*<ArrowRight', r'Send OTP <ArrowRight', content)

# There is also one that uses {portal}: "Send OTP as {portal} <ArrowRight"
content = re.sub(r'Send OTP as \{portal\}\s*<ArrowRight', r'Send OTP <ArrowRight', content)

# Check if there are any trailing spaces before <ArrowRight that need fixing
content = content.replace('Send OTP <ArrowRight', 'Send OTP <ArrowRight')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
