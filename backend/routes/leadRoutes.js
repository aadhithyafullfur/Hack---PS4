const express = require("express");
const {
  updateEngagement,
  trackEmailOpen,
  createLead,
  getLeads,
  getLead,
  updateLeadPrediction,
  updateAllLeadsPredictions,
} = require("../controllers/leadController");
const router = express.Router();

// Create new lead
router.post("/", createLead);

// Get all leads
router.get("/", getLeads);

// Get single lead by ID
router.get("/:id", getLead);

// Update a specific engagement field
router.patch("/:id/engagement", updateEngagement);

// Track email open directly from an image tag
router.get("/:id/pixel.gif", trackEmailOpen);

// ML prediction endpoints
router.patch("/:id/predict", updateLeadPrediction);
router.patch("/predict-all", updateAllLeadsPredictions);

module.exports = router;
