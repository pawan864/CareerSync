const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    
    // Force reset Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.updateOne({ email: 'admin@careersync.com' }, { $set: { password: adminPassword, role: 'admin' } });
    console.log("Admin password forcefully reset to admin123");

    // Force reset Faculty
    const facultyPassword = await bcrypt.hash('faculty123', 10);
    await User.updateOne({ email: 'faculty@careersync.com' }, { $set: { password: facultyPassword, role: 'faculty' } });
    console.log("Faculty password forcefully reset to faculty123");

    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
