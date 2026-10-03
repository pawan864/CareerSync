import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will use a regex to find the button block inside the Admin UI and insert the OTP block right before it.
admin_button_pattern = r'(\s*<button\s*type="submit"\s*disabled=\{isVerifying \|\| loginSuccess\}\s*className={`w-full flex items-center justify-center font-semibold py-2\.5 rounded-lg transition-all duration-300 mt-6 text-xs shadow-\[0_0_15px_rgba\(220,38,38,0\.2\)\] \$\{)'

otp_block = """
                                            {otpSent && (
                                                <div className="animate-fade-in-up mt-4">
                                                    <div className="flex justify-between items-center mb-1.5">
                                                        <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider">Authentication Code</label>
                                                        <span className="text-[10px] text-red-500 font-mono">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                                                    </div>
                                                    <div className="flex justify-between space-x-2">
                                                        {otp.map((digit, index) => (
                                                            <input
                                                                key={index}
                                                                id={`admin-otp-${index}`}
                                                                type="text"
                                                                maxLength="1"
                                                                value={digit}
                                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                                className="w-10 h-10 text-center bg-[#0a0a0a] border border-gray-800 text-white font-bold rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}"""

content = re.sub(admin_button_pattern, otp_block + r'\1', content)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
