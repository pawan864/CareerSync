import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

colorful_mail_svg = """<svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <defs>
                                                        <linearGradient id="mailGradReg" x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop offset="0%" stopColor="#ff512f" />
                                                            <stop offset="100%" stopColor="#dd2476" />
                                                        </linearGradient>
                                                    </defs>
                                                    <rect x="2" y="4" width="20" height="16" rx="2" fill="url(#mailGradReg)" fillOpacity="0.15" stroke="url(#mailGradReg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M2 6L12 13L22 6" stroke="url(#mailGradReg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>"""

# Using \s* to match any spacing
content = re.sub(r'<Mail className="w-3\.5 h-3\.5 mr-2" />\s*<span className="text-xs font-medium">EMAIL</span>', colorful_mail_svg + '\n                                                <span className="text-xs font-medium">EMAIL</span>', content)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
