import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Faculty Button (Button 2)
fac_pattern = r'<button\s*type="submit"\s*className="w-full flex items-center justify-center bg-\[#2563eb\] hover:bg-\[#1d4ed8\] text-white font-semibold py-2\.5 rounded-lg transition-colors mt-4 text-xs shadow-md shadow-blue-500/30"\s*>\s*\{otpSent \? \(timeLeft > 0 \? \'Login\' : \'Resend OTP\'\) : \'Send OTP\'\} as Faculty/Mentor\s*<ArrowRight className="w-4 h-4 ml-2" />\s*</button>'

fac_new = """<button
                                                type="submit"
                                                disabled={isVerifying || loginSuccess}
                                                className={`w-full flex items-center justify-center font-semibold py-2.5 rounded-lg transition-all duration-300 mt-4 text-xs shadow-md ${
                                                    loginSuccess 
                                                    ? 'bg-green-500 text-white shadow-green-500/40 cursor-default' 
                                                    : isVerifying
                                                    ? 'bg-[#1d4ed8] text-white cursor-wait opacity-90'
                                                    : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-blue-500/30'
                                                }`}
                                            >
                                                {loginSuccess ? (
                                                    <><CheckCircle2 className="w-4 h-4 mr-2" /> Login Successful!</>
                                                ) : isVerifying ? (
                                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
                                                ) : otpSent ? (
                                                    timeLeft > 0 ? 'Verify & Login' : 'Resend OTP'
                                                ) : (
                                                    <>Send OTP as Faculty/Mentor <ArrowRight className="w-4 h-4 ml-2" /></>
                                                )}
                                            </button>"""

content = re.sub(fac_pattern, fac_new, content)

# Replace Recruiter Button (Button 3)
rec_pattern = r'<button\s*type="submit"\s*className="w-full flex items-center justify-center bg-\[#2563eb\] hover:bg-\[#1d4ed8\] text-white font-semibold py-2\.5 rounded-lg transition-colors mt-4 text-xs shadow-md shadow-blue-500/30"\s*>\s*\{otpSent \? \(timeLeft > 0 \? \'Login\' : \'Resend OTP\'\) : \'Send OTP\'\} as Recruiter <ArrowRight className="w-3\.5 h-3\.5 ml-1\.5" />\s*</button>'

rec_new = """<button
                                            type="submit"
                                            disabled={isVerifying || loginSuccess}
                                            className={`w-full flex items-center justify-center font-semibold py-2.5 rounded-lg transition-all duration-300 mt-4 text-xs shadow-md ${
                                                loginSuccess 
                                                ? 'bg-green-500 text-white shadow-green-500/40 cursor-default' 
                                                : isVerifying
                                                ? 'bg-[#1d4ed8] text-white cursor-wait opacity-90'
                                                : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-blue-500/30'
                                            }`}
                                        >
                                            {loginSuccess ? (
                                                <><CheckCircle2 className="w-4 h-4 mr-2" /> Login Successful!</>
                                            ) : isVerifying ? (
                                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
                                            ) : otpSent ? (
                                                timeLeft > 0 ? 'Verify & Login' : 'Resend OTP'
                                            ) : (
                                                <>Send OTP as Recruiter <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></>
                                            )}
                                        </button>"""

content = re.sub(rec_pattern, rec_new, content)


# Replace TPO Button (Button 4)
tpo_pattern = r'<button\s*type="submit"\s*className="w-full flex items-center justify-center bg-\[#2563eb\] hover:bg-\[#1d4ed8\] text-white font-semibold py-2\.5 rounded-lg transition-colors mt-4 text-xs shadow-md shadow-blue-500/30"\s*>\s*\{otpSent \? \(timeLeft > 0 \? \'Login\' : \'Resend OTP\'\) : \'Send OTP\'\} as \{portal\} <ArrowRight className="w-4 h-4 ml-2" />\s*</button>'

tpo_new = """<button
                                            type="submit"
                                            disabled={isVerifying || loginSuccess}
                                            className={`w-full flex items-center justify-center font-semibold py-2.5 rounded-lg transition-all duration-300 mt-4 text-xs shadow-md ${
                                                loginSuccess 
                                                ? 'bg-green-500 text-white shadow-green-500/40 cursor-default' 
                                                : isVerifying
                                                ? 'bg-[#1d4ed8] text-white cursor-wait opacity-90'
                                                : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-blue-500/30'
                                            }`}
                                        >
                                            {loginSuccess ? (
                                                <><CheckCircle2 className="w-4 h-4 mr-2" /> Login Successful!</>
                                            ) : isVerifying ? (
                                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
                                            ) : otpSent ? (
                                                timeLeft > 0 ? 'Verify & Login' : 'Resend OTP'
                                            ) : (
                                                <>Send OTP as {portal} <ArrowRight className="w-4 h-4 ml-2" /></>
                                            )}
                                        </button>"""

content = re.sub(tpo_pattern, tpo_new, content)


# Replace Admin Button (Button 5)
admin_pattern = r'<button\s*type="submit"\s*className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2\.5 rounded-lg transition-colors mt-6 text-xs shadow-\[0_0_15px_rgba\(220,38,38,0\.2\)\]"\s*>\s*Authenticate <ArrowRight className="w-3\.5 h-3\.5 ml-1\.5" />\s*</button>'

admin_new = """<button
                                                  type="submit"
                                                  disabled={isVerifying || loginSuccess}
                                                  className={`w-full flex items-center justify-center font-semibold py-2.5 rounded-lg transition-all duration-300 mt-6 text-xs shadow-[0_0_15px_rgba(220,38,38,0.2)] ${
                                                      loginSuccess 
                                                      ? 'bg-green-500 text-white cursor-default' 
                                                      : isVerifying
                                                      ? 'bg-red-800 text-white cursor-wait opacity-90'
                                                      : 'bg-red-600 hover:bg-red-700 text-white'
                                                  }`}
                                              >
                                                  {loginSuccess ? (
                                                      <><CheckCircle2 className="w-3.5 h-3.5 mr-2" /> Login Successful!</>
                                                  ) : isVerifying ? (
                                                      <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Verifying...</>
                                                  ) : otpSent ? (
                                                      timeLeft > 0 ? 'Verify & Login' : 'Resend OTP'
                                                  ) : (
                                                      <>Authenticate <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></>
                                                  )}
                                              </button>"""

content = re.sub(admin_pattern, admin_new, content)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
