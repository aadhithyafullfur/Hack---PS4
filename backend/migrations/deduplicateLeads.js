/**
 * Migration Script: Deduplicate Leads by Email
 * 
 * This script:
 * 1. Finds all duplicate leads by email
 * 2. Consolidates them into a single lead per email
 * 3. Preserves engagement data by summing counts
 * 4. Merges leadSourceType arrays
 * 5. Rebuilds unique indexes
 * 
 * Run this BEFORE starting the server with the new schema
 */

const mongoose = require('mongoose');
const Lead = require('../models/Lead');

// MongoDB connection string - update if needed
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database';

async function deduplicateLeads() {
    try {
        console.log('🚀 Starting lead deduplication process...\n');

        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Drop existing indexes to allow duplicates temporarily
        try {
            await Lead.collection.dropIndex('email_1');
            console.log('📋 Dropped existing email index\n');
        } catch (error) {
            console.log('ℹ️  No existing email index to drop\n');
        }

        // Find all duplicate emails
        const duplicates = await Lead.aggregate([
            {
                $group: {
                    _id: { $toLower: '$email' },
                    count: { $sum: 1 },
                    ids: { $push: '$_id' },
                    docs: { $push: '$$ROOT' }
                }
            },
            {
                $match: { count: { $gt: 1 } }
            }
        ]);

        console.log(`📊 Found ${duplicates.length} duplicate email groups\n`);

        if (duplicates.length === 0) {
            console.log('✅ No duplicates found! Rebuilding indexes...\n');
            await Lead.collection.createIndex({ email: 1 }, { unique: true });
            console.log('✅ Unique email index created successfully\n');
            await mongoose.disconnect();
            return;
        }

        // Process each duplicate group
        let mergedCount = 0;
        for (const duplicate of duplicates) {
            const docs = duplicate.docs;
            const email = duplicate._id;
            
            console.log(`\n📧 Processing: ${email} (${docs.length} duplicates)`);

            // Sort by createdAt to keep the oldest one
            docs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            
            const keepDoc = docs[0]; // Keep the oldest
            const removeIds = docs.slice(1).map(d => d._id);

            // Consolidate data
            const mergedData = {
                name: keepDoc.name,
                email: email.toLowerCase().trim(),
                company: keepDoc.company,
                phone: keepDoc.phone,
                service: keepDoc.service,
                source: keepDoc.source,
                status: keepDoc.status,
                message: keepDoc.message || '',
                notes: keepDoc.notes || '',
                leadSourceType: [...new Set(docs.flatMap(d => d.leadSourceType || []))],
                engagement: {
                    email_open_count: docs.reduce((sum, d) => sum + (d.engagement?.email_open_count || 0), 0),
                    website_visits: docs.reduce((sum, d) => sum + (d.engagement?.website_visits || 0), 0),
                    pricing_page_click: docs.reduce((sum, d) => sum + (d.engagement?.pricing_page_click || 0), 0),
                    demo_requested: docs.reduce((sum, d) => sum + (d.engagement?.demo_requested || 0), 0)
                }
            };

            // Merge messages from all duplicates
            const allMessages = docs
                .map(d => d.message)
                .filter(m => m && m.trim())
                .join('\n\n--- MERGED ---\n\n');
            
            if (allMessages) {
                mergedData.message = allMessages;
            }

            // Merge notes
            const allNotes = docs
                .map(d => d.notes)
                .filter(n => n && n.trim())
                .join('\n\n--- MERGED ---\n\n');
            
            if (allNotes) {
                mergedData.notes = allNotes;
            }

            // Update the kept document
            await Lead.findByIdAndUpdate(keepDoc._id, {
                $set: mergedData
            });

            // Delete the duplicate documents
            await Lead.deleteMany({ _id: { $in: removeIds } });

            mergedCount += removeIds.length;
            console.log(`   ✅ Merged ${removeIds.length} duplicate(s) into ${keepDoc._id}`);
            console.log(`   📊 Total engagement: ${JSON.stringify(mergedData.engagement)}`);
        }

        console.log(`\n✅ Successfully merged ${mergedCount} duplicate leads\n`);

        // Rebuild the unique index
        console.log('🔨 Rebuilding unique email index...');
        await Lead.collection.createIndex({ email: 1 }, { unique: true });
        console.log('✅ Unique email index created successfully\n');

        // Verify: Check for any remaining duplicates
        const remainingDuplicates = await Lead.aggregate([
            {
                $group: {
                    _id: { $toLower: '$email' },
                    count: { $sum: 1 }
                }
            },
            {
                $match: { count: { $gt: 1 } }
            }
        ]);

        if (remainingDuplicates.length > 0) {
            console.log('⚠️  WARNING: Some duplicates still exist:');
            console.log(remainingDuplicates);
        } else {
            console.log('✅ Verification complete: No duplicates remaining\n');
        }

        console.log('🎉 Migration completed successfully!\n');

    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');
    }
}

// Run the migration
if (require.main === module) {
    deduplicateLeads().then(() => {
        console.log('\n✅ Done!');
        process.exit(0);
    }).catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
}

module.exports = deduplicateLeads;
