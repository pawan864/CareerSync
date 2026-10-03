import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Modal Max Width
content = content.replace('className={`w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]', 'className={`w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]')
# make header simpler and more professional
content = content.replace('className={`text-lg font-bold ${isDarkMode ? \'text-white\' : \'text-gray-900\'}`}', 'className={`text-xl font-semibold tracking-tight ${isDarkMode ? \'text-white\' : \'text-gray-900\'}`}')

# 2. Re-write the internal text
old_terms = """                                {modalType === 'terms' ? (
                                    <>
                                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Welcome to CareerSync. By accessing or using our platform, you agree to be bound by these terms.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1. User Accounts</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>You are responsible for safeguarding your password and for all activities that occur under your account. You agree to provide accurate and complete information during registration.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2. Acceptable Use</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>You agree not to use the platform to post false, misleading, or inappropriate content. Employers must post legitimate opportunities, and students must provide truthful academic records.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3. Termination</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We reserve the right to suspend or terminate accounts that violate our community guidelines or terms of service without prior notice.</p>
                                    </>
                                ) : (
                                    <>
                                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your privacy is critical to us. This policy explains how we collect, use, and protect your data.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1. Data Collection</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We collect information you provide directly to us (e.g., resumes, academic records) and automated usage data (e.g., cookies, IP addresses) to improve our services.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2. Data Usage</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your data is used solely to facilitate career placements, skill gap analysis, and platform functionality. We do not sell your personal data to third parties.</p>
                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3. Security</h4>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We implement enterprise-grade security measures to protect your information, though no system is 100% secure.</p>
                                    </>
                                )}"""

new_terms = """                                {modalType === 'terms' ? (
                                    <div className="space-y-5 text-[13px] leading-relaxed">
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                            Last updated: October 2026. Please read these Terms of Service completely using CareerSync.com which is owned and operated by CareerSync, Inc.
                                        </p>
                                        
                                        <div>
                                            <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>1. Acceptance of Terms</h4>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service. These Terms apply to all visitors, users, and others who access or use the Service.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>2. User Registration and Security</h4>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>3. Intellectual Property Rights</h4>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                The Service and its original content, features, and functionality are and will remain the exclusive property of CareerSync and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of CareerSync.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>4. Limitation of Liability</h4>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                In no event shall CareerSync, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-5 text-[13px] leading-relaxed">
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                            Last updated: October 2026. CareerSync ("us", "we", or "our") operates the CareerSync.com website.
                                        </p>
                                        
                                        <div>
                                            <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>1. Information Collection And Use</h4>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                We collect several different types of information for various purposes to provide and improve our Service to you. Types of Data collected include Personally Identifiable Information (email address, first name and last name, phone number) and Usage Data (how the Service is accessed and used).
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>2. Use of Data</h4>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                CareerSync uses the collected data for various purposes: to provide and maintain our Service, to notify you about changes to our Service, to allow you to participate in interactive features when you choose to do so, to provide customer support, and to monitor the usage of the Service.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>3. Transfer of Data</h4>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Your information, including Personal Data, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction. We will take all steps reasonably necessary to ensure that your data is treated securely.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>4. Security of Data</h4>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                                            </p>
                                        </div>
                                    </div>
                                )}"""

content = content.replace(old_terms, new_terms)

# 3. Update the accept button to be completely gray/professional instead of a bright CTA blue.
content = content.replace('className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"', 'className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${isDarkMode ? \'bg-gray-800 text-gray-200 hover:bg-gray-700\' : \'bg-gray-900 text-white hover:bg-gray-800\'}`}')

# Also we want to ensure slim-scrollbar classes are applied properly.
content = content.replace('className="p-6 overflow-y-auto slim-scrollbar text-sm space-y-4"', 'className="p-6 overflow-y-auto slim-scrollbar"')


with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
