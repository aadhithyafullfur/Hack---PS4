const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        planName: {
            type: String,
            required: true,
            enum: ['Professional', 'Growth', 'Premium']
        },
        price: {
            type: Number,
            required: true
        },
        billing: {
            type: String,
            enum: ['monthly', 'annual'],
            default: 'monthly'
        },
        status: {
            type: String,
            enum: ['active', 'cancelled', 'expired', 'trial'],
            default: 'active'
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: function() {
                // Set default end date to 1 year from now
                const date = new Date();
                date.setFullYear(date.getFullYear() + 1);
                return date;
            }
        },
        renewalDate: {
            type: Date,
            default: function() {
                // Set default renewal date based on billing cycle
                const date = new Date();
                if (this.billing === 'annual') {
                    date.setFullYear(date.getFullYear() + 1);
                } else {
                    date.setMonth(date.getMonth() + 1);
                }
                return date;
            }
        },
        paymentMethod: {
            last4: String,
            cardType: String,
            expiryMonth: String,
            expiryYear: String
        },
        company: String,
        notes: String
    },
    { timestamps: true }
);

// Index for fast lookups
SubscriptionSchema.index({ userId: 1 });
SubscriptionSchema.index({ email: 1 });
SubscriptionSchema.index({ status: 1 });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
