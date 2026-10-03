import re

server_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\server.js'
with open(server_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the admin route import
content = content.replace(
    "const skillRoutes = require('./routes/skillRoutes');",
    "const skillRoutes = require('./routes/skillRoutes');\nconst adminRoutes = require('./routes/adminRoutes');"
)

# Mount the route
content = content.replace(
    "app.use('/api/skills', skillRoutes);",
    "app.use('/api/skills', skillRoutes);\napp.use('/api/admin', adminRoutes);"
)

with open(server_path, 'w', encoding='utf-8') as f:
    f.write(content)
