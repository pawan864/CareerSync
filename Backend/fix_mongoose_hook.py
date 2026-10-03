import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\models\User.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_hook = """// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});"""
new_hook = """// Encrypt password using bcrypt
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});"""
content = content.replace(old_hook, new_hook)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\models\User.js', 'w', encoding='utf-8') as f:
    f.write(content)
