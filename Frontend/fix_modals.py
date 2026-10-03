import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Terms Modal
old_terms = """                            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Terms of Service</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <p><strong>1. Acceptance of Terms:</strong> By creating an account, you agree to be bound by these Terms of Service. CareerSync reserves the right to modify these terms at any time.</p>
                                <p><strong>2. User Responsibilities:</strong> You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your sole responsibility.</p>
                                <p><strong>3. Data Authenticity:</strong> You agree to provide accurate, current, and complete information. CareerSync may suspend or terminate accounts that provide fraudulent academic or professional credentials.</p>
                                <p><strong>4. Code of Conduct:</strong> Users must maintain professional decorum when communicating with institutions or recruiters. Spamming, harassment, or abusive language will result in immediate termination.</p>
                                <p><strong>5. Platform Availability:</strong> While we strive for 99.9% uptime, CareerSync does not guarantee uninterrupted access to the platform and is not liable for data loss during outages.</p>
                                <p><strong>6. Intellectual Property:</strong> All content, features, and functionality on CareerSync are owned by us and are protected by international copyright laws.</p>
                            </div>"""
new_terms = """                            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Terms of Service</h3>
                            <div className="space-y-5 text-sm leading-relaxed text-justify opacity-90">
                                <p>Welcome to CareerSync. Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the CareerSync website and platform operated by CareerSync Inc. ("us", "we", or "our").</p>
                                <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, educational institutions, recruiters, and others who access or use the Service.</p>
                                <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
                                <p className="font-semibold uppercase text-xs mt-4 mb-2">Accounts & Verification</p>
                                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
                                <p className="font-semibold uppercase text-xs mt-4 mb-2">Code of Conduct</p>
                                <p>The Service facilitates professional networking and placement operations. Harassment, misrepresentation of academic or professional credentials, and unauthorized scraping of user data are strictly prohibited. We reserve the right to revoke access to any entity found violating these standards without prior notice.</p>
                                <p className="font-semibold uppercase text-xs mt-4 mb-2">Limitation Of Liability</p>
                                <p>In no event shall CareerSync Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
                            </div>"""
content = content.replace(old_terms, new_terms)

# Fix Privacy Modal
old_privacy = """                            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <p><strong>1. Information We Collect:</strong> We collect personal information you provide when registering, including your name, email, academic records, and professional details. We also collect usage data to improve our services.</p>
                                <p><strong>2. How We Use Your Data:</strong> Your data is used exclusively to connect you with relevant opportunities (if you are a student) or relevant candidates (if you are a recruiter). We use AI matching algorithms to process your profile.</p>
                                <p><strong>3. Data Sharing:</strong> Student profiles are only visible to verified recruiters and your associated educational institution. We do not sell your personal data to third-party advertising agencies.</p>
                                <p><strong>4. Security Measures:</strong> We implement enterprise-grade encryption and secure database practices to protect your information against unauthorized access, alteration, or destruction.</p>
                                <p><strong>5. Cookies and Tracking:</strong> CareerSync uses essential cookies to maintain your active session and preferences. You can control cookie settings through your browser.</p>
                                <p><strong>6. Your Rights:</strong> You have the right to request a copy of your data, correct inaccuracies, or request complete deletion of your account at any time by contacting support.</p>
                            </div>"""
new_privacy = """                            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h3>
                            <div className="space-y-5 text-sm leading-relaxed text-justify opacity-90">
                                <p>CareerSync Inc. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by CareerSync.</p>
                                <p>This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service") alongside our application. By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.</p>
                                <p className="font-semibold uppercase text-xs mt-4 mb-2">Information Collection</p>
                                <p>We collect information from you when you register on our platform, fill out a profile, or engage with our services. The collected information includes, but is not limited to, your name, email address, phone number, academic transcripts, and professional qualifications. We also automatically log standard usage data, including IP addresses, browser types, and timestamp data for analytical purposes.</p>
                                <p className="font-semibold uppercase text-xs mt-4 mb-2">Use of Information</p>
                                <p>Any of the information we collect from you may be used in one of the following ways: to personalize your experience, to improve our platform, to process placement workflows, and to send periodic emails regarding platform updates or recruitment opportunities. Your academic data is strictly utilized for the purpose of facilitating the campus recruitment pipeline.</p>
                                <p className="font-semibold uppercase text-xs mt-4 mb-2">Data Protection & Disclosure</p>
                                <p>We implement a variety of standard security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
                                <p>By utilizing CareerSync, you consent to our privacy policy and the processing of your data as outlined herein.</p>
                            </div>"""
content = content.replace(old_privacy, new_privacy)

# Add slim-scrollbar
content = content.replace('className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative ${isDarkMode ? \'bg-[#0f172a] text-gray-200\' : \'bg-white text-gray-800\'}`}', 'className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto slim-scrollbar rounded-2xl shadow-2xl p-8 relative ${isDarkMode ? \'bg-[#0f172a] text-gray-200\' : \'bg-white text-gray-800\'}`}')

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
