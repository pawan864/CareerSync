import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to insert the OTP block after the Master Password block inside the Admin UI
# Let's find the Master Password block in the Admin section:

password_block = """                                            <div>
                                                <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">Master Password</label>
                                                <div className="flex items-center px-3 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-lg focus-within:border-red-500/50 transition-colors">
                                                    <div className="flex items-center flex-1">
                                                        <Lock className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0" />
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            required
                                                            placeholder="Enter master password"
                                                            className="w-full bg-transparent text-white focus:outline-none text-xs placeholder-gray-700 autofill-admin"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-600 hover:text-gray-400 focus:outline-none ml-2">
                                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>"""

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

content = content.replace(password_block, password_block + otp_block)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
