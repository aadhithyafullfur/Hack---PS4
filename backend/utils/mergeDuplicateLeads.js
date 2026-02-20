const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Lead = require("../models/Lead");

dotenv.config();

/**
 * Utility script to find and merge duplicate leads based on email
 * Run this once to clean up any existing duplicates in the database
 * Usage: node utils/mergeDuplicateLeads.js
 */
const mergeDuplicateLeads = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/auth-demo",
    );
    console.log("✓ MongoDB Connected");

    // Find duplicate emails
    const duplicates = await Lead.aggregate([
      {
        $group: {
          _id: { email: { $toLower: { $trim: { input: "$email" } } } },
          count: { $sum: 1 },
          ids: { $push: "$_id" },
          docs: { $push: "$$ROOT" },
        },
      },
      {
        $match: { count: { $gt: 1 } },
      },
    ]);

    if (duplicates.length === 0) {
      console.log("✓ No duplicate leads found!");
      process.exit(0);
    }

    console.log(`\n⚠️  Found ${duplicates.length} email(s) with duplicates:`);

    for (const dup of duplicates) {
      const email = dup._id.email;
      const leads = dup.docs;

      console.log(`\n📧 Processing: ${email} (${leads.length} duplicates)`);

      // Sort by createdAt to keep the oldest lead (first interaction)
      leads.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const primaryLead = leads[0];
      const duplicateLeads = leads.slice(1);

      console.log(`   → Primary Lead ID: ${primaryLead._id}`);

      // Merge data from duplicates into primary lead
      const mergedData = {
        name: primaryLead.name,
        company: primaryLead.company,
        phone: primaryLead.phone,
        service: primaryLead.service,
        notes: primaryLead.notes || "",
        leadSourceType: [
          ...new Set([...(primaryLead.leadSourceType || []), "Website"]),
        ],
        engagement: {
          email_open_count: primaryLead.engagement?.email_open_count || 0,
          website_visits: primaryLead.engagement?.website_visits || 0,
          pricing_page_click: primaryLead.engagement?.pricing_page_click || 0,
          demo_requested: primaryLead.engagement?.demo_requested || 0,
          unique_sessions: primaryLead.engagement?.unique_sessions || 0,
          total_time_on_site: primaryLead.engagement?.total_time_on_site || 0,
          first_visit:
            primaryLead.engagement?.first_visit || primaryLead.createdAt,
          last_visit:
            primaryLead.engagement?.last_visit || primaryLead.createdAt,
          pages_visited: [
            ...new Set(primaryLead.engagement?.pages_visited || []),
          ],
          activity_log: [...(primaryLead.engagement?.activity_log || [])],
        },
        sessions: [...(primaryLead.sessions || [])],
      };

      // Merge data from each duplicate
      for (const dupLead of duplicateLeads) {
        console.log(`   → Merging Lead ID: ${dupLead._id}`);

        // Merge name (use longer/more complete name)
        if (dupLead.name && dupLead.name.length > mergedData.name.length) {
          mergedData.name = dupLead.name;
        }

        // Merge company, phone, service if not present
        if (dupLead.company && !mergedData.company)
          mergedData.company = dupLead.company;
        if (dupLead.phone && !mergedData.phone)
          mergedData.phone = dupLead.phone;
        if (dupLead.service && !mergedData.service)
          mergedData.service = dupLead.service;

        // Append notes
        if (dupLead.notes && dupLead.notes !== mergedData.notes) {
          mergedData.notes += `\n\n[Merged from duplicate] ${dupLead.notes}`;
        }

        // Merge leadSourceType
        if (dupLead.leadSourceType && dupLead.leadSourceType.length > 0) {
          mergedData.leadSourceType = [
            ...new Set([
              ...mergedData.leadSourceType,
              ...dupLead.leadSourceType,
            ]),
          ];
        }

        // Merge engagement metrics
        const dupEng = dupLead.engagement || {};
        mergedData.engagement.email_open_count += dupEng.email_open_count || 0;
        mergedData.engagement.website_visits += dupEng.website_visits || 0;
        mergedData.engagement.pricing_page_click +=
          dupEng.pricing_page_click || 0;
        mergedData.engagement.demo_requested += dupEng.demo_requested || 0;
        mergedData.engagement.unique_sessions += dupEng.unique_sessions || 0;
        mergedData.engagement.total_time_on_site +=
          dupEng.total_time_on_site || 0;

        // Update first/last visit
        if (
          dupEng.first_visit &&
          new Date(dupEng.first_visit) <
            new Date(mergedData.engagement.first_visit)
        ) {
          mergedData.engagement.first_visit = dupEng.first_visit;
        }
        if (
          dupEng.last_visit &&
          new Date(dupEng.last_visit) >
            new Date(mergedData.engagement.last_visit)
        ) {
          mergedData.engagement.last_visit = dupEng.last_visit;
        }

        // Merge pages visited
        if (dupEng.pages_visited) {
          mergedData.engagement.pages_visited = [
            ...new Set([
              ...mergedData.engagement.pages_visited,
              ...dupEng.pages_visited,
            ]),
          ];
        }

        // Merge activity log
        if (dupEng.activity_log) {
          mergedData.engagement.activity_log = [
            ...mergedData.engagement.activity_log,
            ...dupEng.activity_log,
          ];
        }

        // Merge sessions
        if (dupLead.sessions) {
          mergedData.sessions = [...mergedData.sessions, ...dupLead.sessions];
        }
      }

      // Sort activity log by timestamp
      mergedData.engagement.activity_log.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      );

      // Update primary lead with merged data
      await Lead.findByIdAndUpdate(primaryLead._id, mergedData);
      console.log(`   ✓ Updated primary lead with merged data`);

      // Delete duplicate leads
      const duplicateIds = duplicateLeads.map((l) => l._id);
      await Lead.deleteMany({ _id: { $in: duplicateIds } });
      console.log(`   ✓ Deleted ${duplicateIds.length} duplicate(s)`);
    }

    console.log("\n✓ All duplicates merged successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

mergeDuplicateLeads();
