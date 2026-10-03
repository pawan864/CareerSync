import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Mail icon in the "EMAIL" buttons with a colorful vibrant SVG
colorful_mail_svg = """<svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <defs>
                                                            <linearGradient id="mailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                <stop offset="0%" stopColor="#ff512f" />
                                                                <stop offset="100%" stopColor="#dd2476" />
                                                            </linearGradient>
                                                        </defs>
                                                        <rect x="2" y="4" width="20" height="16" rx="2" fill="url(#mailGrad)" fillOpacity="0.15" stroke="url(#mailGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M2 6L12 13L22 6" stroke="url(#mailGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>"""

# Find the button containing the Mail icon and "EMAIL"
content = re.sub(r'<Mail className="w-3\.5 h-3\.5 mr-2" />\s*<span className="text-xs font-(?:medium|semibold)">EMAIL</span>', colorful_mail_svg + '\n                                                    <span className="text-xs font-semibold">EMAIL</span>', content)

# For the inputs, let's also give them a colorful tint based on their section (optional, but we'll stick to the button first)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
