require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const user = await User.findById('6ac3dd0f5e8d76f091b93cb4');
    console.log(user);
    process.exit(0);
});
