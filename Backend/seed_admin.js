const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// We need the ACTUAL User schema from the backend so it handles things properly
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const adminExists = await User.findOne({ email: 'admin@careersync.com' });
        
        if (adminExists) {
            console.log('Admin already exists!');
            adminExists.password = 'admin123';
            await adminExists.save(); // hooks will hash it
            console.log('Admin password reset to: admin123');
        } else {
            await User.create({
                name: 'System Admin',
                email: 'admin@careersync.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Admin created successfully! (admin@careersync.com / admin123)');
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
