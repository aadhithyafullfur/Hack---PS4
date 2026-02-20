const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Lead = require('../models/Lead');

// @route   POST /api/subscriptions/create
// @desc    Create a new subscription
// @access  Public (In production, should be protected)
router.post('/create', async (req, res) => {
    try {
        const { userId, email, planName, price, billing, paymentMethod, company } = req.body;

        if (!email || !planName || !price) {
            return res.status(400).json({
                success: false,
                message: 'Email, plan name, and price are required'
            });
        }

        // Create subscription record
        const subscription = await Subscription.create({
            userId,
            email: email.toLowerCase().trim(),
            planName,
            price,
            billing: billing || 'monthly',
            status: 'active',
            paymentMethod,
            company
        });

        // Update user's subscription info if userId is provided
        if (userId) {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    'subscription.plan': planName,
                    'subscription.status': 'active',
                    'subscription.billing': billing || 'monthly',
                    company: company || undefined
                }
            });
        }

        // Update lead if exists
        try {
            await Lead.findOneAndUpdate(
                { email: email.toLowerCase().trim() },
                {
                    $set: {
                        status: 'Converted',
                        notes: `Subscribed to ${planName} plan (${billing || 'monthly'})`
                    },
                    $addToSet: {
                        leadSourceType: 'Subscription'
                    }
                }
            );
        } catch (leadError) {
            console.error('Error updating lead:', leadError);
        }

        res.status(201).json({
            success: true,
            data: subscription,
            message: 'Subscription created successfully'
        });

    } catch (error) {
        console.error('Create subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating subscription'
        });
    }
});

// @route   GET /api/subscriptions
// @desc    Get all subscriptions (Admin only)
// @access  Protected/Admin
router.get('/', async (req, res) => {
    try {
        const { status, planName, limit = 100 } = req.query;

        const filter = {};
        if (status) filter.status = status;
        if (planName) filter.planName = planName;

        const subscriptions = await Subscription.find(filter)
            .populate('userId', 'fullName email')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        // Calculate stats
        const stats = {
            total: await Subscription.countDocuments(filter),
            active: await Subscription.countDocuments({ ...filter, status: 'active' }),
            cancelled: await Subscription.countDocuments({ ...filter, status: 'cancelled' }),
            trial: await Subscription.countDocuments({ ...filter, status: 'trial' }),
            revenue: {
                monthly: 0,
                annual: 0,
                total: 0
            }
        };

        // Calculate revenue
        const activeSubscriptions = await Subscription.find({ status: 'active' });
        activeSubscriptions.forEach(sub => {
            if (sub.billing === 'monthly') {
                stats.revenue.monthly += sub.price;
            } else {
                stats.revenue.annual += sub.price * 12;
            }
        });
        stats.revenue.total = stats.revenue.monthly + stats.revenue.annual;

        res.status(200).json({
            success: true,
            data: subscriptions,
            stats
        });

    } catch (error) {
        console.error('Get subscriptions error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching subscriptions'
        });
    }
});

// @route   GET /api/subscriptions/user/:userId
// @desc    Get subscriptions for a specific user
// @access  Protected
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const subscriptions = await Subscription.find({ userId })
            .sort({ createdAt: -1 });

        if (!subscriptions || subscriptions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No subscriptions found for this user'
            });
        }

        res.status(200).json({
            success: true,
            data: subscriptions
        });

    } catch (error) {
        console.error('Get user subscriptions error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user subscriptions'
        });
    }
});

// @route   PATCH /api/subscriptions/:id/cancel
// @desc    Cancel a subscription
// @access  Protected
router.patch('/:id/cancel', async (req, res) => {
    try {
        const { id } = req.params;

        const subscription = await Subscription.findByIdAndUpdate(
            id,
            {
                $set: {
                    status: 'cancelled',
                    notes: 'Cancelled by user'
                }
            },
            { new: true }
        );

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        // Update user's subscription status
        if (subscription.userId) {
            await User.findByIdAndUpdate(subscription.userId, {
                $set: {
                    'subscription.status': 'cancelled'
                }
            });
        }

        res.status(200).json({
            success: true,
            data: subscription,
            message: 'Subscription cancelled successfully'
        });

    } catch (error) {
        console.error('Cancel subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while cancelling subscription'
        });
    }
});

// @route   DELETE /api/subscriptions/:id
// @desc    Delete a subscription (Admin only)
// @access  Protected/Admin
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const subscription = await Subscription.findByIdAndDelete(id);

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully'
        });

    } catch (error) {
        console.error('Delete subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting subscription'
        });
    }
});

module.exports = router;
