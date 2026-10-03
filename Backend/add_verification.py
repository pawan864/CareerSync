import re

model_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\models\User.js'
with open(model_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add verificationStatus field to User schema
field = """    verificationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    resetPasswordToken: String,"""

content = content.replace("    resetPasswordToken: String,", field)

with open(model_path, 'w', encoding='utf-8') as f:
    f.write(content)
