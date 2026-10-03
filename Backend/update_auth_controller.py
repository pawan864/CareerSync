import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Register validation
old_create = """        // Create user
        const user = await User.create({"""
new_create = """        // Check for existing email or phone
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, error: 'Email is already registered' });
        }

        if (phone && phone.trim() !== '') {
            const existingPhone = await User.findOne({ phone });
            if (existingPhone) {
                return res.status(400).json({ success: false, error: 'Phone number is already registered' });
            }
        }

        // Create user
        const user = await User.create({"""
content = content.replace(old_create, new_create)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js', 'w', encoding='utf-8') as f:
    f.write(content)
