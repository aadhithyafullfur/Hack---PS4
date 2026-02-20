const express = require("express");
const {
  updateEngagement,
  trackEmailOpen,
  createLead,
  getLeads,
  getLead,
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

module.exports = router;
