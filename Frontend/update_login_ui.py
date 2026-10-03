import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update login call
content = content.replace('const success = await login(email, password);', 'const success = await login({ email, password, institutionCode, portal });')

# Note: The backend error might be caught inside login or returned as boolean. Wait, AuthContext catches nothing. It throws.
# Actually AuthContext throws or returns false?
# If api.post fails, it throws an error. Login.jsx catches it.
# Let's check AuthContext error handling.

# In Login.jsx catch block:
old_catch = """        } catch (err) {
            setError('An error occurred during login');
        }"""
new_catch = """        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during login');
        }"""
content = content.replace(old_catch, new_catch)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
