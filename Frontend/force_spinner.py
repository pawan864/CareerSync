import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will use a robust regex to replace the else block for OTP submission
old_block_pattern = r'(\} else \{\s*const otpString = otp\.join\(\'\'\);\s*console\.log\("Submitting OTP:".*?\} catch \(err\) \{)'
new_block = """} else {
                const otpString = otp.join('');
                setIsVerifying(true);
                
                // Artificially delay for 4 seconds FIRST, regardless of success or failure
                await new Promise(resolve => setTimeout(resolve, 4000));
                
                const res = await api.post('/auth/verify-otp', { userId, otp: otpString });
                
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    setIsVerifying(false);
                    setLoginSuccess(true);
                    
                    // Wait 1.5s to show the green success state before redirecting
                    setTimeout(() => {
                        window.location.href = portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : portal === 'Admin' ? '/admin-dashboard' : portal === 'Faculty' ? '/faculty-dashboard' : '/';
                    }, 1500);
                } else {
                    setIsVerifying(false);
                }
            }
        } catch (err) {"""

content = re.sub(old_block_pattern, new_block, content, flags=re.DOTALL)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
