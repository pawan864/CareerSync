import re

reg_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Register.jsx'
with open(reg_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_submit = """    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {"""

new_submit = """    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters long.');
        }
        
        if (!termsAccepted) {
            return setError('You must accept the Terms and Conditions.');
        }

        try {"""

content = content.replace(old_submit, new_submit)

with open(reg_path, 'w', encoding='utf-8') as f:
    f.write(content)
