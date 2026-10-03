import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the TPO specific check with a generic portal check
old_check = """        if (portal === 'TPO' && user.role !== 'tpo') {
            return res.status(401).json({ success: false, error: 'User is not registered as TPO' });
        }"""
        
new_check = """        // Validate strict role access per portal
        const roleMap = {
            'Student': 'student',
            'Faculty': 'faculty',
            'TPO': 'tpo',
            'Recruiter': 'industry'
        };
        
        if (portal && roleMap[portal]) {
            if (user.role !== roleMap[portal]) {
                return res.status(401).json({ success: false, error: `You are registered as a ${user.role}, please use the correct portal to log in.` });
            }
        }"""
        
content = content.replace(old_check, new_check)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js', 'w', encoding='utf-8') as f:
    f.write(content)
