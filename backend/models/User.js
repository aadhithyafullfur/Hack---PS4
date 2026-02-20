const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    subscription: {
        plan: {
            type: String,
            enum: ['Professional', 'Growth', 'Premium', null],
            default: null
        },
        status: {
            type: String,
            enum: ['active', 'cancelled', 'expired', 'trial', null],
            default: null
        },
        billing: {
            type: String,
            enum: ['monthly', 'annual', null],
            default: null
        }
    },
    company: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving - Async version without 'next'
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err;
    }
});

// Method to check password validity
userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw err;
    }
};

module.exports = mongoose.model('User', userSchema);
