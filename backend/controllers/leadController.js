const Lead = require('../models/Lead');

// Whitelist of allowed engagement fields to prevent injection
const ALLOWED_ENGAGEMENT_FIELDS = [
    'email_open_count',
    'website_visits',
    'pricing_page_click',
    'demo_requested'
];

exports.updateEngagement = async (req, res) => {
    try {
        const { id } = req.params;
        const { field } = req.body;

        // 1. Validate field name (Whitelist check)
        if (!ALLOWED_ENGAGEMENT_FIELDS.includes(field)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid engagement field specified',
                allowedFields: ALLOWED_ENGAGEMENT_FIELDS
            });
        }

        // 2. Perform the atomic update using $inc
        const updatedLead = await Lead.findByIdAndUpdate(
            id,
            { $inc: { [`engagement.${field}`]: 1 } },
            { new: true, runValidators: true }
        );

        // 3. Check if lead exists
        if (!updatedLead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        // 4. Return success response
        res.status(200).json({
            success: true,
            data: updatedLead
        });

    } catch (error) {
        console.error('Engagement Update Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating engagement'
        });
    }
};

exports.trackEmailOpen = async (req, res) => {
    try {
        const { id } = req.params;

        await Lead.findByIdAndUpdate(
            id,
            { $inc: { 'engagement.email_open_count': 1 } }
        );

        // Return a 1x1 transparent pixel
        const buffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/gif',
            'Content-Length': buffer.length,
            'Cache-Control': 'no-store, no-cache, must-revalidate, private'
        });
        res.end(buffer);
    } catch (error) {
        // Even on error, return the pixel so the email doesn't show a broken image
        const buffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/gif',
            'Content-Length': buffer.length
        });
        res.end(buffer);
    }
};

exports.createLead = async (req, res) => {
    try {
        const { fullname, email, company, industry, message, source } = req.body;

        let lead = await Lead.findOne({ email });

        if (lead) {
            // Update existing lead if they applied again
            lead.name = fullname || lead.name;
            lead.company = company || lead.company;
            lead.service = industry || lead.service;
            lead.message = message || lead.message;
            if (source) lead.source = source;
            await lead.save();
        } else {
            // Create new lead
            lead = await Lead.create({
                name: fullname || 'Unknown',
                email,
                company,
                service: industry,
                message,
                source: source || 'Demo Request',
                status: 'New'
            });
        }

        // Track demo requested immediately on creation/update via form
        lead = await Lead.findByIdAndUpdate(
            lead._id,
            { $inc: { 'engagement.demo_requested': 1 } },
            { new: true }
        );

        res.status(201).json({
            success: true,
            data: lead
        });
    } catch (error) {
        console.error('Create Lead Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating lead'
        });
    }
};

exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json({
            success: true,
            data: leads
        });
    } catch (error) {
        console.error('Get Leads Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching leads'
        });
    }
};
