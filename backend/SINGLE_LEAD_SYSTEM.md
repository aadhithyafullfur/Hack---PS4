# Single Lead Per User System

## Overview

This system ensures that **each unique user (identified by email) has EXACTLY ONE lead record** in the database. All user activities across different channels are consolidated under their single lead record.

## Key Features

### 1. Email Normalization

- All emails are automatically converted to **lowercase**
- Whitespace is **trimmed** from both ends
- Ensures `john@example.com` and `JOHN@example.com` are treated as the same user

### 2. Database Constraints

- Email field has `unique: true` constraint
- Database-level unique index prevents duplicate creation
- Automatic error handling if duplicate insertion is attempted

### 3. Multi-Channel Tracking

- `leadSourceType` array tracks ALL interaction channels
- Possible sources: `['Demo Request', 'Contact Form', 'Signup', 'Website', 'Other']`
- Each interaction adds to the array (no duplicates)

### 4. Data Consolidation

When an existing lead interacts again:

- ✅ Name, company, phone are updated if new data is provided
- ✅ Messages are appended to notes with timestamps
- ✅ Engagement metrics accumulate (visits, clicks, demo requests)
- ✅ Activity log records each interaction with timestamp
- ✅ Session data is preserved and merged

## User Journey Example

```
Day 1: User visits website
└─> Lead created with source "Website"
    email: john@example.com
    leadSourceType: ["Website"]
    engagement.website_visits: 3

Day 3: User requests demo
└─> Same lead updated
    leadSourceType: ["Website", "Demo Request"]
    engagement.demo_requested: 1
    notes: "I'm interested in the Premium plan"

Day 5: User fills contact form
└─> Same lead updated again
    leadSourceType: ["Website", "Demo Request", "Contact Form"]
    notes: "Previous message...\n\n[2026-02-20] Need pricing info"

Day 7: User signs up
└─> Same lead updated
    leadSourceType: ["Website", "Demo Request", "Contact Form", "Signup"]
    User account created and linked to lead

Result: ONE lead record with complete interaction history
```

## Implementation Details

### Backend (Node.js/Express)

#### Lead Creation/Update Flow

```javascript
// 1. Normalize email
const normalizedEmail = email.toLowerCase().trim();

// 2. Check if lead exists
let lead = await Lead.findOne({ email: normalizedEmail });

if (lead) {
  // 3a. Update existing lead
  lead.name = fullname || lead.name;
  lead.company = company || lead.company;

  // Add new source if not present
  if (!lead.leadSourceType.includes(source)) {
    lead.leadSourceType.push(source);
  }

  // Append message to notes with timestamp
  if (message) {
    lead.notes += `\n\n[${new Date().toISOString()}] ${message}`;
  }

  await lead.save();
} else {
  // 3b. Create new lead
  lead = await Lead.create({
    email: normalizedEmail,
    name: fullname,
    leadSourceType: [source],
    // ... other fields
  });
}
```

### Database Model

```javascript
const LeadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Enforces uniqueness
    lowercase: true, // Auto-normalize
    trim: true, // Auto-trim
    index: true, // Fast lookups
  },
  leadSourceType: {
    type: [String], // Array of sources
    default: [],
    enum: ["Contact Form", "Demo Request", "Signup", "Website", "Other"],
  },
  // ... other fields
});

// Database-level unique index
LeadSchema.index({ email: 1 }, { unique: true });
```

### Frontend (React)

#### Lead ID Persistence

```javascript
// Store leadId in localStorage for cross-session tracking
localStorage.setItem("leadId", response.data.data._id);

// Subsequent interactions use the same leadId
const leadId = localStorage.getItem("leadId");
```

#### Session Tracking

```javascript
// Generate unique session ID per browser session
const sessionId =
  sessionStorage.getItem("sessionId") ||
  `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

sessionStorage.setItem("sessionId", sessionId);
```

## Utilities

### Verify Lead Uniqueness

Check if database has any duplicate leads:

```bash
npm run verify-leads
```

Output:

```
✓ MongoDB Connected
📊 Total Leads: 150
👥 Unique Users (by email): 150
✅ SUCCESS: Each user has exactly ONE lead record!

📈 Multi-Channel Leads: 45 (30.0%)
🎯 Top Multi-Channel Leads:
   • John Doe (john@example.com)
     Channels: Demo Request, Contact Form, Signup
     Visits: 12 | Demo Requests: 2
```

### Merge Duplicate Leads

If duplicates exist (from legacy data), merge them:

```bash
npm run merge-duplicates
```

This will:

1. Find all duplicate emails
2. Merge engagement metrics
3. Combine leadSourceType arrays
4. Preserve all activity logs
5. Delete duplicate records
6. Keep the oldest lead as primary

## ML Model Benefits

Having a single lead per user provides:

- ✅ **Accurate feature calculation** (no split metrics)
- ✅ **Complete user journey** in one record
- ✅ **Reliable conversion tracking**
- ✅ **Consistent training data**

ML features are calculated from consolidated data:

- `email_open_count` - Total across all interactions
- `website_visits` - Cumulative visits
- `pricing_page_click` - All pricing page views
- `demo_requested` - Total demo requests

## Testing the System

### Test Case 1: Multiple Form Submissions

```javascript
// 1. Submit demo request
POST /api/leads
{
  email: "test@example.com",
  fullname: "Test User",
  source: "Demo Request"
}
// Response: { _id: "abc123", leadSourceType: ["Demo Request"] }

// 2. Submit contact form (same email)
POST /api/leads
{
  email: "test@example.com",
  fullname: "Test User",
  source: "Contact Form"
}
// Response: { _id: "abc123", leadSourceType: ["Demo Request", "Contact Form"] }
// Same ID returned, sources merged!
```

### Test Case 2: Case-Insensitive Email

```javascript
// Submission 1
email: "User@Example.com";

// Submission 2
email: "user@example.com";

// Result: Both map to same lead (normalized to "user@example.com")
```

## Database Indexes

The system uses these indexes for performance:

```javascript
{ email: 1 }  // Unique constraint + fast lookup
{ 'mlPrediction.conversionProbability': -1 }  // Sort by prediction
{ 'engagement.last_visit': -1 }  // Recent activity queries
```

## API Response Format

When creating/updating a lead:

```json
{
  "success": true,
  "data": {
    "_id": "65f8a9b7c123456789abcdef",
    "email": "user@example.com",
    "name": "John Doe",
    "leadSourceType": ["Demo Request", "Contact Form"],
    "engagement": {
      "website_visits": 5,
      "demo_requested": 2,
      "pricing_page_click": 3
    }
  },
  "message": "Lead updated and engagement tracked"
}
```

## Troubleshooting

### Issue: Duplicate leads in database

**Solution**: Run the merge utility

```bash
npm run merge-duplicates
```

### Issue: Email not matching between forms

**Solution**: Check email normalization is working

```bash
npm run verify-leads
```

### Issue: Lead not updating on second form submission

**Solution**: Verify leadId is stored in localStorage

```javascript
console.log(localStorage.getItem("leadId"));
```

## Monitoring

Check lead consolidation health regularly:

```bash
npm run verify-leads
```

Look for:

- ✅ Unique users = Total leads (no duplicates)
- ✅ Multi-channel leads > 0 (users engaging multiple times)
- ✅ No warning messages about duplicates
