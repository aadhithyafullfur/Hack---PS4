const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { 
            type: String, 
            required: true, 
            unique: true,
            index: true,
            lowercase: true,
            trim: true
        },
        company: { type: String },
        phone: { type: String },
        service: { type: String },
        source: { type: String, default: 'Website' },
        leadSourceType: { 
            type: [String], 
            default: [],
            enum: ['Contact Form', 'Demo Request', 'Signup', 'Website', 'Other']
        },
        status: { type: String, default: 'New', enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'] },
        message: { type: String },
        notes: { type: String, default: '' },
        engagement: {
            email_open_count: { type: Number, default: 0 },
            website_visits: { type: Number, default: 0 },
            pricing_page_click: { type: Number, default: 0 },
            demo_requested: { type: Number, default: 0 }
        }
    },
    { timestamps: true }
);

// Compound index for email uniqueness and query performance
LeadSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Lead', LeadSchema);
