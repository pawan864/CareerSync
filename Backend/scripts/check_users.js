const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const admin = await User.findOne({ email: 'admin@careersync.com' }).select('+password');
    console.log("Admin exists?", !!admin);
    if(admin) {
        const isMatch = await bcrypt.compare('admin123', admin.password);
        console.log("Admin password matches 'admin123'?", isMatch);
        console.log("Admin role:", admin.role);
    }
    
    const faculty = await User.findOne({ email: 'faculty@careersync.com' }).select('+password');
    console.log("Faculty exists?", !!faculty);
    if(faculty) {
        const isMatch = await bcrypt.compare('faculty123', faculty.password);
        console.log("Faculty password matches 'faculty123'?", isMatch);
        console.log("Faculty role:", faculty.role);
    }
    process.exit(0);
});
