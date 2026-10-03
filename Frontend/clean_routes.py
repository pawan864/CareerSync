import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import OtpVerification from './pages/OtpVerification';\n", "")
content = content.replace("          <Route path=\"/otp-verify\" element={<OtpVerification />} />\n", "")

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
