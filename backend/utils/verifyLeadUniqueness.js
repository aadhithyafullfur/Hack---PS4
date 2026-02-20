const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Lead = require("../models/Lead");

dotenv.config();

/**
 * Utility to verify that each user (email) has exactly one lead record
 * and display lead consolidation statistics
 * Usage: node utils/verifyLeadUniqueness.js
 */
const verifyLeadUniqueness = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/auth-demo",
    );
    console.log("✓ MongoDB Connected\n");

    // Get all leads
    const allLeads = await Lead.find({}).select(
      "email name leadSourceType engagement createdAt",
    );
    console.log(`📊 Total Leads: ${allLeads.length}\n`);

    // Group by normalized email
    const emailMap = new Map();

    for (const lead of allLeads) {
      const normalizedEmail = lead.email.toLowerCase().trim();
      if (!emailMap.has(normalizedEmail)) {
        emailMap.set(normalizedEmail, []);
      }
      emailMap.get(normalizedEmail).push(lead);
    }

    console.log(`👥 Unique Users (by email): ${emailMap.size}\n`);

    // Find duplicates
    const duplicates = [];
    for (const [email, leads] of emailMap.entries()) {
      if (leads.length > 1) {
        duplicates.push({ email, count: leads.length, leads });
      }
    }

    if (duplicates.length > 0) {
      console.log(
        `⚠️  WARNING: Found ${duplicates.length} email(s) with duplicate leads:\n`,
      );
      duplicates.forEach((dup) => {
        console.log(`   📧 ${dup.email}: ${dup.count} duplicate records`);
        dup.leads.forEach((lead, idx) => {
          console.log(
            `      ${idx + 1}. ID: ${lead._id} | Sources: ${lead.leadSourceType.join(", ")}`,
          );
        });
        console.log("");
      });
      console.log(
        "❌ Database needs cleanup! Run: node utils/mergeDuplicateLeads.js\n",
      );
    } else {
      console.log("✅ SUCCESS: Each user has exactly ONE lead record!\n");
    }

    // Multi-channel engagement statistics
    const multiChannelLeads = allLeads.filter(
      (l) => l.leadSourceType && l.leadSourceType.length > 1,
    );
    console.log(
      `📈 Multi-Channel Leads: ${multiChannelLeads.length} (${((multiChannelLeads.length / allLeads.length) * 100).toFixed(1)}%)`,
    );

    if (multiChannelLeads.length > 0) {
      console.log("\n🎯 Top Multi-Channel Leads:");
      multiChannelLeads
        .sort((a, b) => b.leadSourceType.length - a.leadSourceType.length)
        .slice(0, 5)
        .forEach((lead) => {
          console.log(`   • ${lead.name} (${lead.email})`);
          console.log(`     Channels: ${lead.leadSourceType.join(", ")}`);
          console.log(
            `     Visits: ${lead.engagement?.website_visits || 0} | Demo Requests: ${lead.engagement?.demo_requested || 0}`,
          );
        });
    }

    // Source distribution
    console.log("\n📊 Lead Source Distribution:");
    const sourceCount = {};
    allLeads.forEach((lead) => {
      lead.leadSourceType.forEach((source) => {
        sourceCount[source] = (sourceCount[source] || 0) + 1;
      });
    });
    Object.entries(sourceCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([source, count]) => {
        console.log(`   ${source}: ${count} leads`);
      });

    console.log("\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

verifyLeadUniqueness();
