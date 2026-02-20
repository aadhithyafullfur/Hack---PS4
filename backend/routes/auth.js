const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Lead = require('../models/Lead');
const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_123', {
        expiresIn: '30d',
    });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user (default role: 'user')
        const user = await User.create({
            fullName,
            email,
            password,
        });

        // Automatically store the signed up user as a lead (or update existing)
        let leadId = null;
        try {
            if (user.role !== 'admin') {
                // Use upsert to create or update lead
                const lead = await Lead.findOneAndUpdate(
                    { email: email.toLowerCase().trim() },
                    {
                        $set: {
                            name: fullName
                        },
                        $setOnInsert: {
                            source: 'Signup',
                            status: 'New',
                            message: 'User registered via Signup page.',
                            engagement: {
                                email_open_count: 0,
                                website_visits: 0,
                                pricing_page_click: 0,
                                demo_requested: 0
                            }
                        },
                        $addToSet: { leadSourceType: 'Signup' }
                    },
                    {
                        new: true,
                        upsert: true,
                        runValidators: true,
                        setDefaultsOnInsert: true
                    }
                );
                leadId = lead._id;
            }
        } catch (leadError) {
            console.error('Error creating/updating lead off user signup:', leadError);
        }

        if (user) {
            const token = generateToken(user._id);

            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role, // Return role
                leadId, // Return tracking ID mapped to Lead
                token,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await user.isValidPassword(password))) {
            const lead = await Lead.findOne({ email });
            const leadId = lead ? lead._id : null;

            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role, // Return role
                leadId, // Return tracking ID mapped to Lead
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
