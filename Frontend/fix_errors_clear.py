import re

# Fix Login.jsx
with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'r', encoding='utf-8') as f:
    login_content = f.read()

old_login_effect = """    useEffect(() => {
        // Reset slide to 0 when portal changes
        setCurrentSlide(0);
    }, [portal]);"""
new_login_effect = """    useEffect(() => {
        // Reset slide to 0 when portal changes
        setCurrentSlide(0);
        setError('');
    }, [portal]);"""
login_content = login_content.replace(old_login_effect, new_login_effect)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Login.jsx', 'w', encoding='utf-8') as f:
    f.write(login_content)

# Fix Register.jsx
with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'r', encoding='utf-8') as f:
    register_content = f.read()

old_handle = """    const handleRoleChange = (role) => {
        setFormData({ ...formData, role });
    };"""
new_handle = """    const handleRoleChange = (role) => {
        setFormData({ ...formData, role });
        setError('');
    };"""
register_content = register_content.replace(old_handle, new_handle)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx', 'w', encoding='utf-8') as f:
    f.write(register_content)

