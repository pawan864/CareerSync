import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# For Student form (dark background)
def replace_dark(match):
    full = match.group(0)
    success_div = """
                                            {successMsg && (
                                                <div className="bg-green-900/50 border border-green-500 text-green-200 px-3 py-1.5 rounded-md text-[11px] text-center font-medium mt-2">
                                                    {successMsg}
                                                </div>
                                            )}"""
    return full + success_div

# For other forms (light background)
def replace_light(match):
    full = match.group(0)
    success_div = """
                                        {successMsg && (
                                            <div className="bg-green-50 border border-green-200 text-green-600 px-3 py-1.5 rounded-md text-[11px] text-center font-medium mt-2">
                                                {successMsg}
                                            </div>
                                        )}"""
    return full + success_div

# 1. Dark error block (Student)
dark_regex = r'\{\s*error && \(\s*<div className="bg-red-900[^>]*>.*?</div>\s*\)\s*\}'
content = re.sub(dark_regex, replace_dark, content, flags=re.DOTALL)

# 2. Light error blocks (Faculty, Recruiter, TPO)
light_regex = r'\{\s*error && \(\s*<div className="bg-red-50[^>]*>.*?</div>\s*\)\s*\}'
content = re.sub(light_regex, replace_light, content, flags=re.DOTALL)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
