# 🚀 Lead Deduplication Migration Guide

## 📋 What Changed?

### ✅ **BEFORE** (The Problem)
- Every form submission created a NEW lead document
- Same email could have 10+ duplicate leads
- Messy analytics and CRM data
- No proper upsert logic

### ✅ **AFTER** (The Solution)
- **ONE lead per email** (enforced by unique index)
- Upsert logic: Update if exists, Create if new
- Proper engagement tracking (no duplicates)
- Clean, CRM-ready data structure

---

## 🔧 Changes Made

### 1. **Lead Schema** (`models/Lead.js`)
```javascript
// ✅ Enhanced email field
email: { 
    type: String, 
    required: true, 
    unique: true,      // ← Prevents duplicates
    index: true,       // ← Fast lookups
    lowercase: true,   // ← Normalize emails
    trim: true         // ← Remove whitespace
}

// ✅ New field: Track form sources
leadSourceType: { 
    type: [String],    // ← Array (can track multiple sources)
    default: [],
    enum: ['Contact Form', 'Demo Request', 'Signup', 'Website', 'Other']
}

// ✅ Compound index for email uniqueness
LeadSchema.index({ email: 1 }, { unique: true });
```

### 2. **Lead Controller** (`controllers/leadController.js`)

#### **BEFORE:**
```javascript
// ❌ OLD WAY (Always creates new docs)
const lead = new Lead(req.body);
await lead.save();
```

#### **AFTER:**
```javascript
// ✅ NEW WAY (Upsert logic)
const lead = await Lead.findOneAndUpdate(
    { email: normalizedEmail },  // Find by email
    {
        $set: updateFields,       // Update basic fields
        $setOnInsert: {...},      // Only on creation
        $addToSet: { leadSourceType }, // Add to array (no duplicates)
        $inc: { 'engagement.demo_requested': 1 } // Increment engagement
    },
    {
        new: true,         // Return updated doc
        upsert: true,      // Create if doesn't exist
        runValidators: true
    }
);
```

### 3. **Enhanced Engagement Tracking**

Now supports **both ID and email-based tracking**:

```javascript
// Option 1: By ID (fast, recommended)
POST /api/leads/:id/engagement
{ "field": "pricing_page_click" }

// Option 2: By Email (fallback, convenient)
POST /api/leads/:id/engagement
{ "field": "pricing_page_click", "email": "user@example.com" }
```

### 4. **Error Handling**
```javascript
// ✅ Handles duplicate key errors (MongoDB code 11000)
if (error.code === 11000) {
    return res.status(409).json({
        success: false,
        message: 'A lead with this email already exists',
        error: 'DUPLICATE_EMAIL'
    });
}
```

---

## 🔄 Migration Steps (IMPORTANT!)

### **Step 1: Backup Your Database**
```bash
# Create a backup before running migration
mongodump --db your_database_name --out ./backup
```

### **Step 2: Update Environment**
```bash
cd backend

# Ensure MONGODB_URI is set in .env
# MONGODB_URI=mongodb://localhost:27017/your-database
```

### **Step 3: Run Deduplication Script**
```bash
# This will:
# - Find all duplicate emails
# - Merge them into single documents
# - Preserve engagement data (sums counts)
# - Rebuild unique indexes

node migrations/deduplicateLeads.js
```

### **Step 4: Restart Server**
```bash
# Start the server with new schema
npm start
```

---

## 📊 What the Migration Does

### **Consolidation Logic:**
1. **Groups** all leads by email (case-insensitive)
2. **Keeps** the oldest lead document (by `createdAt`)
3. **Merges** data from duplicates:
   - ✅ **Engagement counts** → Summed
   - ✅ **Messages** → Combined with separators
   - ✅ **Notes** → Merged
   - ✅ **leadSourceType** → Unique array
4. **Deletes** duplicate documents
5. **Rebuilds** unique index on email

### **Example:**
```javascript
// BEFORE migration:
Lead 1: { email: "john@example.com", engagement: { visits: 5 } }
Lead 2: { email: "john@example.com", engagement: { visits: 3 } }
Lead 3: { email: "JOHN@example.com", engagement: { visits: 2 } }

// AFTER migration:
Lead 1: { 
    email: "john@example.com", 
    engagement: { visits: 10 },  // ← Summed!
    leadSourceType: ["Contact Form", "Demo Request", "Signup"]
}
// Lead 2 and 3 deleted
```

---

## 🎯 Expected Behavior

### **Scenario: User Journey**
1. User signs up → **Lead created** ✅
2. Same user requests demo → **Same document updated** ✅
3. Same user clicks pricing → **Engagement incremented** ✅
4. Same user opens email → **Email count incremented** ✅

### **Result:**
- **1 lead document** per email
- **Accurate engagement** tracking
- **Clean analytics**
- **CRM-ready** data

---

## 🧪 Testing the Changes

### **Test 1: Create Lead**
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "fullname": "Test User",
    "source": "Demo Request"
  }'
```

### **Test 2: Submit Again (Should Update, Not Create)**
```bash
# Same email, different form
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "fullname": "Test User",
    "source": "Contact Form",
    "message": "I need help"
  }'
```

### **Test 3: Check Database**
```bash
# Should have only 1 document with:
# - leadSourceType: ["Demo Request", "Contact Form"]
# - engagement.demo_requested: 2
```

---

## 🛡️ Production Considerations

### **1. Index Creation Time**
- Large databases: Index creation can take time
- Consider running migration during low-traffic periods

### **2. Duplicate Email Handling**
- Migration script handles existing duplicates
- New unique index prevents future duplicates

### **3. API Compatibility**
- ✅ Backward compatible (existing API calls still work)
- ✅ Added email-based engagement tracking (optional)
- ✅ Response now includes `isNew` field

### **4. Monitoring**
```javascript
// Check for duplicate key errors in logs
if (error.code === 11000) {
    // Log to monitoring service
}
```

---

## 📝 API Changes Summary

### **Create Lead** (`POST /api/leads`)
**Response now includes:**
```json
{
  "success": true,
  "data": { ... },
  "isNew": false  // ← NEW: Indicates if document was created or updated
}
```

### **Update Engagement** (`POST /api/leads/:id/engagement`)
**Now accepts email:**
```json
{
  "field": "pricing_page_click",
  "email": "user@example.com"  // ← NEW: Optional email-based lookup
}
```

### **Track Email Open** (`GET /api/leads/:id/track-email`)
**Now supports query parameter:**
```
GET /api/leads/:id/track-email?email=user@example.com
```

---

## 🚨 Troubleshooting

### **Error: "E11000 duplicate key error"**
```bash
# Run migration script to deduplicate
node migrations/deduplicateLeads.js
```

### **Error: "Index already exists"**
```javascript
// Drop and rebuild indexes
await Lead.collection.dropIndexes();
await Lead.collection.createIndex({ email: 1 }, { unique: true });
```

### **Check for Duplicates**
```javascript
db.leads.aggregate([
    { $group: { _id: "$email", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
])
```

---

## ✅ Verification Checklist

- [ ] Backup created
- [ ] Migration script executed successfully
- [ ] No duplicate emails in database
- [ ] Unique index created on email field
- [ ] Server starts without errors
- [ ] Test form submissions (should update, not create)
- [ ] Engagement tracking still works
- [ ] API responses include `isNew` field

---

## 🎉 Benefits

✅ **No more duplicates** → Clean database  
✅ **Accurate analytics** → Real engagement metrics  
✅ **CRM-ready** → One record per customer  
✅ **Better performance** → Indexed email lookups  
✅ **Production-safe** → Proper error handling  

---

## 📞 Support

If you encounter issues:
1. Check console logs for errors
2. Verify MongoDB connection
3. Ensure migration ran successfully
4. Check for duplicate key errors (11000)

**Happy deduplicating! 🚀**
