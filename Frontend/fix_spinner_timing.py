import re

login_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx'
with open(login_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = """                setIsVerifying(true);
                console.log("Calling API...");
                const res = await api.post('/auth/verify-otp', { userId, otp: otpString });
                console.log("API Response:", res.data);
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    
                    // Artificially delay for 4 seconds to show spinner per user request
                    await new Promise(resolve => setTimeout(resolve, 4000));
                    
                    setIsVerifying(false);
                    setLoginSuccess(true);
                    
                    // Wait 1.5s to show the green success state before redirecting
                    setTimeout(() => {
                        window.location.href = portal === 'Recruiter' ? '/employer' : portal === 'Student' ? '/student-dashboard' : portal === 'Admin' ? '/admin-dashboard' : portal === 'Faculty' ? '/faculty-dashboard' : '/';
                    }, 1500);
                } else {
                    setIsVerifying(false);
                }"""

new_logic = """                setIsVerifying(true);
                
                // Artificially delay for 4 seconds to show spinner per user request FIRST
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
                }"""

content = content.replace(old_logic, new_logic)

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(content)
