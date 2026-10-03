import re

auth_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js'
with open(auth_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Inject admin bypass right at the start of exports.login
admin_bypass = """exports.login = async (req, res, next) => {
    try {
        const { email, password, institutionCode, portal } = req.body;

        // --- HARDCODED ADMIN BYPASS FOR CAPSTONE TESTING ---
        if (portal === 'Admin' && email === 'admin@careersync.com' && password === 'admin123') {
            return res.status(200).json({ success: true });
        }
        // ---------------------------------------------------"""

content = content.replace(
"""exports.login = async (req, res, next) => {
    try {
        const { email, password, institutionCode, portal } = req.body;""", 
admin_bypass)

with open(auth_path, 'w', encoding='utf-8') as f:
    f.write(content)
