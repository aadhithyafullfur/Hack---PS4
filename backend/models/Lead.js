const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    company: { type: String },
    phone: { type: String },
    service: { type: String },
    source: { type: String, default: "Website" },
    leadSourceType: {
      type: [String],
      default: [],
      enum: ["Contact Form", "Demo Request", "Signup", "Website", "Other"],
    },
    status: {
      type: String,
      default: "New",
      enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
    },
    message: { type: String },
    notes: { type: String, default: "" },

    // Store all messages from the user with timestamps
    messages: [
      {
        content: String,
        source: String, // 'Contact Form', 'Demo Request', etc.
        timestamp: { type: Date, default: Date.now },
        metadata: mongoose.Schema.Types.Mixed,
      },
    ],

    // Enhanced engagement tracking for ML model
    engagement: {
      email_open_count: { type: Number, default: 0 },
      website_visits: { type: Number, default: 0 },
      pricing_page_click: { type: Number, default: 0 },
      demo_requested: { type: Number, default: 0 },

      // Session-level tracking for accurate analytics
      unique_sessions: { type: Number, default: 0 },
      total_time_on_site: { type: Number, default: 0 }, // in seconds
      last_visit: { type: Date },
      first_visit: { type: Date },

      // Page-specific tracking
      pages_visited: [String], // Array of unique pages visited

      // Engagement timeline for detailed analysis
      activity_log: [
        {
          action: String, // 'visit', 'pricing_view', 'demo_request', 'email_open'
          timestamp: { type: Date, default: Date.now },
          sessionId: String,
          metadata: mongoose.Schema.Types.Mixed, // Additional data like page, duration, etc.
        },
      ],
    },

    // ML prediction fields
    mlPrediction: {
      conversionProbability: { type: Number, default: 0, min: 0, max: 1 },
      lastPredicted: Date,
      features: {
        emailEngagement: { type: Number, default: 0 },
        visitFrequency: { type: Number, default: 0 },
        pricingInterest: { type: Number, default: 0 },
        demoInterest: { type: Number, default: 0 },
      },
      predictedScore: { type: Number, default: 0 }, // Overall lead score
      qualityGrade: {
        type: String,
        enum: ["Hot", "Warm", "Cold", "Unknown"],
        default: "Unknown",
      },
    },

    // Session tracking
    sessions: [
      {
        sessionId: { type: String, required: true },
        startTime: { type: Date, default: Date.now },
        endTime: Date,
        duration: Number, // in seconds
        pagesVisited: [String],
        actions: [String],
      },
    ],
  },
  { timestamps: true },
);

// Compound index for email uniqueness and query performance
LeadSchema.index({ email: 1 }, { unique: true });
LeadSchema.index({ "mlPrediction.conversionProbability": -1 }); // For sorting by prediction
LeadSchema.index({ "engagement.last_visit": -1 }); // For recent activity queries

module.exports = mongoose.model("Lead", LeadSchema);
