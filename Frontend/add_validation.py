import re
import os

# 1. Update Login.jsx
login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    login_content = f.read()

# Find all labels and append * if they don't contain Remember or I agree
def replace_label(match):
    full_match = match.group(0)
    label_text = match.group(1)
    if "Remember me" in label_text or "Remember Me" in label_text or "*" in label_text:
        return full_match
    # Check if the label text contains HTML tags (like I agree to the <button>...)
    if "<" in label_text and "Terms of Service" in label_text:
        return full_match
        
    return f'>{label_text}<span className="text-red-500 ml-0.5">*</span></label>'

# Regex to match >text</label> where text doesn't contain HTML tags (to avoid matching across multiple lines incorrectly, but we allow simple text)
login_content = re.sub(r'>([^<]+)</label>', replace_label, login_content)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login_content)


# 2. Update Register.jsx
register_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(register_path, 'r', encoding='utf-8') as f:
    register_content = f.read()

# Add termsAccepted state
old_state = "    const [showPrivacyModal, setShowPrivacyModal] = useState(false);"
new_state = "    const [showPrivacyModal, setShowPrivacyModal] = useState(false);\n    const [termsAccepted, setTermsAccepted] = useState(false);"
if "const [termsAccepted" not in register_content:
    register_content = register_content.replace(old_state, new_state)

# Replace the checkbox input
old_checkbox = '<input id="terms" type="checkbox" required className="w-3.5 h-3.5 border border-gray-600 rounded bg-transparent focus:ring-blue-500 cursor-pointer" />'
new_checkbox = '<input id="terms" type="checkbox" required checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="w-3.5 h-3.5 border border-gray-600 rounded bg-transparent focus:ring-blue-500 cursor-pointer" />'
register_content = register_content.replace(old_checkbox, new_checkbox)

# Replace the button
old_button = """                        <button
                            type="submit"
                            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 rounded-md transition-colors mt-2 text-sm shadow-md"
                        >
                            Create Account
                        </button>"""
new_button = """                        <button
                            type="submit"
                            disabled={!termsAccepted}
                            className={`w-full text-white font-medium py-2.5 rounded-md transition-colors mt-2 text-sm shadow-md ${!termsAccepted ? 'bg-gray-600 cursor-not-allowed opacity-70' : 'bg-[#2563eb] hover:bg-[#1d4ed8]'}`}
                        >
                            Create Account
                        </button>"""
register_content = register_content.replace(old_button, new_button)

# Add asterisks to labels
register_content = re.sub(r'>([^<]+)</label>', replace_label, register_content)

with open(register_path, 'w', encoding='utf-8') as f:
    f.write(register_content)

