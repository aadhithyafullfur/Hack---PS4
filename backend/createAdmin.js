const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth-demo');
        console.log('MongoDB Connected');

        const adminExists = await User.findOne({ email: 'admin@leadpulse.ai' });
        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const admin = await User.create({
            fullName: 'System Administrator',
            email: 'admin@leadpulse.ai',
            password: 'adminpassword123', // In a real app, use environment variable or prompt
            role: 'admin',
        });

        console.log('Admin user created:', admin);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();
