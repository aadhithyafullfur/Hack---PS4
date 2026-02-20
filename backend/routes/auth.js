const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Lead = require("../models/Lead");
const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret_key_123", {
    expiresIn: "30d",
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    // Normalize email for consistency
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user (default role: 'user')
    const user = await User.create({
      fullName,
      email: normalizedEmail,
      password,
    });

    // Automatically store the signed up user as a lead (or update existing lead if they interacted before)
    let leadId = null;
    try {
      if (user.role !== "admin") {
        // Check if lead already exists (from previous contact/demo forms)
        let lead = await Lead.findOne({ email: normalizedEmail });

        if (lead) {
          // Update existing lead - user signed up after filling forms
          lead.name = fullName;
          if (!lead.leadSourceType.includes("Signup")) {
            lead.leadSourceType.push("Signup");
          }
          lead.source = "Signup"; // Update to most recent source

          // Add signup message to messages array
          lead.messages.push({
            content: "User registered via Signup page.",
            source: "Signup",
            timestamp: new Date(),
            metadata: { action: "account_creation" },
          });

          if (!lead.notes) {
            lead.notes = "User registered via Signup page.";
          } else {
            lead.notes += `\n\n[${new Date().toISOString()}] User registered via Signup page.`;
          }

          // Increment email engagement for signup
          lead.engagement.email_open_count =
            (lead.engagement.email_open_count || 0) + 1;

          await lead.save();
        } else {
          // Create new lead
          lead = await Lead.create({
            name: fullName,
            email: normalizedEmail,
            source: "Signup",
            leadSourceType: ["Signup"],
            status: "New",
            message: "User registered via Signup page.",
            messages: [
              {
                content: "User registered via Signup page.",
                source: "Signup",
                timestamp: new Date(),
                metadata: { action: "account_creation" },
              },
            ],
            engagement: {
              first_visit: new Date(),
              email_open_count: 1,
            },
          });
        }
        leadId = lead._id;
      }
    } catch (leadError) {
      console.error("Error creating/updating lead off user signup:", leadError);
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
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    // Normalize email for consistent lookup
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await user.isValidPassword(password))) {
      // Find associated lead by normalized email
      const lead = await Lead.findOne({ email: normalizedEmail });
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
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
