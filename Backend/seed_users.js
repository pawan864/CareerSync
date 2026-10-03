const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("Connected to DB");
    
    // Seed Admin
    const adminExists = await User.findOne({ email: 'admin@careersync.com' });
    if (!adminExists) {
        const adminPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'System Admin',
            email: 'admin@careersync.com',
            password: adminPassword,
            role: 'admin',
            verificationStatus: 'approved'
        });
        console.log("Admin seeded");
    }

    // Seed Faculty
    const facultyExists = await User.findOne({ email: 'faculty@careersync.com' });
    if (!facultyExists) {
        const facultyPassword = await bcrypt.hash('faculty123', 10);
        await User.create({
            name: 'Dr. Smith',
            email: 'faculty@careersync.com',
            password: facultyPassword,
            role: 'faculty',
            verificationStatus: 'approved',
            department: 'Computer Science',
            institutionCode: 'CS101'
        });
        console.log("Faculty seeded");
    }

    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
