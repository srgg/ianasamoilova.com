# Google Tag Manager Setup Guide for Portfolio Site

## 🏷️ Container: GTM-WP4B9N6J
## 📊 GA4 Property: G-GDEDW7R44C

This guide sets up **pure GTM tracking** with **zero custom JavaScript** - everything is configured through GTM's built-in features.

---

## Step 1: Create GTM Variables
Go to [Google Tag Manager](https://tagmanager.google.com)

### Built-in Variables (Enable in GTM)
Go to **Variables → Built-In Variables** and enable:
- ✅ Page Path
- ✅ Page URL
- ✅ Click URL
- ✅ Click Element (required for social media links)
- ❓ Click Classes (debugging only - disable in production)
- ❓ Click ID (debugging only - disable in production)
- ✅ Scroll Depth Threshold
- ✅ Event

**Performance Note**: Click Classes and Click ID add ~10-20% overhead per click event. Only enable during setup/troubleshooting, then disable for production to optimize performance.

**Note**: Page Title is NOT available as a built-in variable in GTM 2025. It must be created as a custom JavaScript variable (see User-Defined Variables section below).

### User-Defined Variables
Go to **Variables → User-Defined Variables → New**:

#### 1. Page Category Variable
- **Variable Type**: RegEx Table
- **Variable Name**: `page-category`
- **Input Variable**: `{{Page Path}}`
- **Patterns & Outputs**:
  - `^/$` → `homepage`
  - `/projects/` → `project`
  - `/experience` → `experience`
  - `/authors/` → `profile`
  - `/assignments/` → `assignment`
- **Default Value**: `other`

#### 2. Content Level Variable  
- **Variable Type**: RegEx Table
- **Variable Name**: `content-level`
- **Input Variable**: `{{Page Path}}`
- **Patterns & Outputs**:
  - `/assignments/` → `graduate`
  - `/experience` → `professional`
- **Default Value**: `general`

#### 3. Project Type Variable
- **Variable Type**: RegEx Table
- **Variable Name**: `project-type`
- **Input Variable**: `{{Page Path}}`
- **Patterns & Outputs**:
  - `/uccss/` → `education`
  - `/assignments/` → `coursework`
- **Default Value**: `general`

#### 4. Page Title Variable (Required for 404 Detection)
- **Variable Type**: Custom JavaScript
- **Variable Name**: `page-title`
- **Custom JavaScript**:
  ```javascript
  function() {
    return document.title;
  }
  ```

**Performance Note**: This variable has negligible performance impact (~0.001ms) as it only accesses an already-cached browser property. Page Title is not available as a built-in GTM variable and must be created manually.

#### 5. Referrer Type Variable (For 404 Source Analysis)
- **Variable Type**: RegEx Table
- **Variable Name**: `referrer-type`
- **Input Variable**: `{{Referrer}}`
- **Patterns & Outputs**:
  - `^$` → `direct`
  - `(^|\.|\/)ianasamoilova\.com` → `internal`
  - `google|bing|yahoo|duckduckgo` → `search_engine`
  - `facebook|twitter|linkedin|x\.com` → `social_media`
  - `.+` → `external`
- **Default Value**: `unknown`

**Performance Note**: RegEx Table is ~4x faster than custom JavaScript (~0.0005ms) and easier to maintain. This helps differentiate internal broken links (high priority fixes) from external/user-created 404s (lower priority).


---

## Step 2: Create GTM Triggers

### Professional Engagement Triggers

#### Resume Download Trigger
- **Trigger Type**: Just Links (recommended for PDF downloads)
- **Trigger Name**: `Resume Download Click`
- **Wait for Tags**: No (PDF downloads don't require wait time)
- **Check Validation**: No (unchecked if showing)
- **Fire On**: Some Link Clicks
- **Conditions**: `Click URL` contains `resume.pdf`

**Alternative condition**: `Click URL` ends with `.pdf` (catches any PDF download)

#### Email Contact Trigger
- **Trigger Type**: Just Links (recommended for mailto links)
- **Trigger Name**: `Email Contact Click`
- **Wait for Tags**: No (mailto opens external app, no navigation delay needed)
- **Check Validation**: No (unchecked if showing)
- **Fire On**: Some Link Clicks
- **Conditions**: `Click URL` starts with `mailto:`

#### LinkedIn Click Trigger
- **Trigger Type**: Just Links (recommended for social media icons)
- **Trigger Name**: `LinkedIn Profile Click`
- **Wait for Tags**: No (a link opens in a new tab)
- **Check Validation**: No (unchecked if showing)
- **Fire On**: Some Link Clicks
- **Conditions**: `Click URL` contains `linkedin.com`

**Note**: Use the Link Click trigger type for social media icons since users click on SVG/icon elements nested inside the actual link. This automatically detects the parent `<a>` element.

### Content Engagement Triggers

#### Scroll Depth Trigger
- **Trigger Type**: Scroll Depth
- **Trigger Name**: `Scroll Depth Tracking`
- **Vertical Scroll Depths**: 25, 50, 75, 100
- **Fire On**: All Pages

### Error Tracking Triggers

#### 404 Error Page Trigger
- **Trigger Type**: Page View
- **Trigger Name**: `404 Error Page`
- **Fire On**: Some Page Views
- **Conditions** (create separate condition rows for OR logic):
  1. `{{page-title}}` contains `404` (case insensitive)
  2. `{{page-title}}` contains `Not Found` (case insensitive)  
  3. `{{page-title}}` contains `Page Not Found` (case insensitive)

**GTM Interface**: Click the "+" button to add each condition as a separate row. Multiple condition rows = OR logic in GTM.

**Purpose**: Track when users hit broken links or missing pages to identify navigation issues.

---

## Step 3: Create GA4 Tags

### Base Tracking Tag
- **Tag Type**: Google Tag
- **Tag Name**: `GA4 - Base Tracking`
- **Tag ID**: `G-GDEDW7R44C`
- **Triggering**: Initialization - All Pages

### Event Tags

#### Resume Download Event
- **Tag Type**: Google Analytics: GA4 Event
- **Tag Name**: `GA4 - Resume Download`
- **Configuration Tag**: `G-GDEDW7R44C`
- **Event Name**: `resume_download`
- **Event Parameters**:
  - `event_category` = `Professional Engagement`
  - `event_label` = `Resume Download`
  - `file_name` = `resume.pdf`
  - `value` = `10`
- **Triggering**: CV Download Click

#### Email Contact Event
- **Tag Type**: Google Analytics: GA4 Event  
- **Tag Name**: `GA4 - Email Contact`
- **Configuration Tag**: `G-GDEDW7R44C`
- **Event Name**: `contact_email`
- **Event Parameters**:
  - `event_category` = `Professional Engagement`
  - `event_label` = `Email Contact`
  - `contact_method` = `email`
  - `value` = `25`
- **Triggering**: Email Contact Click

#### LinkedIn Click Event
- **Tag Type**: Google Analytics: GA4 Event
- **Tag Name**: `GA4 - LinkedIn Click`  
- **Configuration Tag**: `G-GDEDW7R44C`
- **Event Name**: `linkedin_click`
- **Event Parameters**:
  - `event_category` = `Social Engagement`
  - `event_label` = `LinkedIn Profile`
  - `outbound` = `true`
  - `value` = `15`
- **Triggering**: LinkedIn Click

#### Scroll Depth Event
- **Tag Type**: Google Analytics: GA4 Event
- **Tag Name**: `GA4 - Scroll Depth`
- **Configuration Tag**: `G-GDEDW7R44C`  
- **Event Name**: `scroll`
- **Event Parameters**:
  - `event_category` = `Content Engagement`
  - `event_label` = `{{Scroll Depth Threshold}}`
  - `page_category` = `{{page-category}}`
- **Triggering**: Scroll Depth

#### 404 Error Event
- **Tag Type**: Google Analytics: GA4 Event
- **Tag Name**: `GA4 - 404 Error`
- **Configuration Tag**: `G-GDEDW7R44C`  
- **Event Name**: `page_not_found`
- **Event Parameters**:
  - `event_category` = `Site Error`
  - `event_label` = `404 Error`
  - `page_location` = `{{Page URL}}`
  - `page_title` = `{{page-title}}`
  - `referrer` = `{{Referrer}}`
  - `referrer_type` = `{{referrer-type}}`
- **Triggering**: 404 Error Page

---

## Step 4: GA4 Goals & Conversions
Go to [Google Analytics](http://analytics.google.com)

### Primary Conversions (Set in GA4)

**How to Create Key Events (2025 GA4 Interface):**
1. Go to **Google Analytics** → Your Property (G-GDEDW7R44C)
2. Click **Admin** (gear icon, bottom left)
3. Under **Data Display** → **Events**
4. After your events receive data, find these events and toggle **"Mark as key event"** to ON:
   - **Resume Download** (`resume_download` event) - Value: $10
   - **Email Contact** (`contact_email` event) - Value: $25  
   - **LinkedIn Click** (`linkedin_click` event) - Value: $15

**Alternative Method:**
- **Admin** → **Data Display** → **Key Events**
- Click **"New Key Event"** and add event names: `resume_download`, `contact_email`, `linkedin_click`

**⚠️ Important:** Events must receive data first before appearing in the Events list. Publish your GTM container, test clicks on your site, then return to GA4 to mark events as key events.

> **📝 Note about Event Values:** These dollar amounts ($10, $25, $15) are **virtual analytics scores**, not real money. They help GA4 rank event importance in reports and calculate conversion values. You never pay anything - Google Analytics is completely free. **No additional configuration needed** - these values are automatically sent from your GTM tags to GA4.

### Secondary Engagement
1. **Scroll Engagement** - Content quality indicator
2. **Page Category Analysis** - Traffic flow insights

---

## Step 5: GA4 Custom Dimensions

**What are Custom Dimensions?**
Custom dimensions are user-defined attributes that extend GA4's default tracking capabilities. They allow you to collect and analyze specific data points that are unique to your business or website. For example, while GA4 automatically tracks page views and clicks, custom dimensions let you categorize those interactions by page type (homepage vs. project page), content level (professional vs. academic), or user engagement patterns. This enables more granular analysis and better insights into user behavior patterns that matter most to your goals.

**Official Documentation**: [GA4 Custom Dimensions & Metrics Guide](https://support.google.com/analytics/answer/14240153)

Go to **GA4 → Admin → Data Display → Custom Definitions**:

### Step-by-Step Custom Dimensions Setup:

1. **Navigate**: Click **Admin** → **Data Display** → **Custom Definitions**
2. **Create**: Click "Create Custom Dimension" for each dimension below
3. **Configure**: Use Event scope for all dimensions

#### Create These 7 Event-Scoped Dimensions:

**Dimension 1: Page Category**
- **Dimension name**: `page_category`
- **Scope**: Event
- **Description**: `Page type classification (homepage, project, experience, etc.)`
- **Event parameter**: `page_category`

**Dimension 2: Content Level**
- **Dimension name**: `content_level`
- **Scope**: Event  
- **Description**: `Academic level classification (graduate, professional, general)`
- **Event parameter**: `content_level`

**Dimension 3: Project Type**
- **Dimension name**: `project_type`
- **Scope**: Event
- **Description**: `Type of project or assignment (education, coursework, general)`
- **Event parameter**: `project_type`

**Dimension 4: Contact Method**
- **Dimension name**: `contact_method`
- **Scope**: Event
- **Description**: `How user contacted (email, phone, etc.)`
- **Event parameter**: `contact_method`

**Dimension 5: Scroll Depth Percentage**
- **Dimension name**: `scroll_depth_percentage`
- **Scope**: Event
- **Description**: `Percentage of page scrolled (25, 50, 75, 100) for engagement analysis`
- **Event parameter**: `event_label` (from scroll events only)

**Dimension 6: Error Page Title**
- **Dimension name**: `error_page_title`
- **Scope**: Event
- **Description**: `Title of error pages (404, etc.) for debugging broken links and navigation issues`
- **Event parameter**: `page_title` (from error events only)

**Dimension 7: Referrer Type**
- **Dimension name**: `error_referrer_type`
- **Scope**: Event
- **Description**: `Referer category for 404 errors (internal/external/search/social/direct) for priority-based fixes`
- **Event parameter**: `referrer_type` (from 404 error events only)

**Important**: Click **Save** after creating each dimension. These seven custom dimensions will help analyze which page types, content levels, scroll engagement patterns, error sources, and error pages generate the most insights for your portfolio optimization.

---

## Step 6: Audiences for Remarketing

**What are GA4 Audiences?**
Audiences are groups of users who share common characteristics or behaviors on your website. They allow you to segment visitors based on specific actions, engagement patterns, or demographics. For a portfolio site, audiences help identify different types of visitors (potential employers, academic peers, casual browsers) so you can understand who's most interested in your work. You can use these audiences for targeted analysis, content optimization, and if you run ads later, for remarketing campaigns to re-engage high-value visitors.

**Official Documentation**: [GA4 Audiences Guide](https://support.google.com/analytics/answer/9267572)

Create in **GA4 → Admin → Data Display → Audiences**:

### Step-by-Step Audience Creation:

1. **Navigate**: Click **Admin** → **Data Display** → **Audiences**
2. **Create**: Click the "New Audience" button
3. **Choose**: Select "Create a custom audience"
4. **Configure**: Set conditions for each audience below

#### Create These 4 High-Value Prospect Audiences:

**Audience 1: Potential Employers**
- **Audience name**: `Potential Employers`
- **Description**: `Users who downloaded a resume and spent quality time on the site`
- **Conditions**: 
  - Event name = `resume_download` (include)
  - AND Session duration > 30 seconds
- **Membership duration**: 30 days

**Audience 2: Academic Peers**
- **Audience name**: `Academic Peers`
- **Description**: `Users interested in academic projects and assignments`
- **Conditions**:
  - Page location contains `/assignments/` (include)
  - OR Page location contains `/projects/` (include)
- **Membership duration**: 30 days

**Audience 3: Professional Network**
- **Audience name**: `Professional Network`
- **Description**: `Users who initiated contact or viewed LinkedIn profile`
- **Conditions**:
  - Event name = `contact_email` (include)
  - OR Event name = `linkedin_click` (include)
- **Membership duration**: 90 days

**Audience 4: Quality Visitors**
- **Audience name**: `Quality Visitors`
- **Description**: `Engaged users with deep scroll (75%+) and quality time on site`
- **Conditions**:
  - Custom dimension `scroll_depth_percentage` ≥ 75 (include)
  - AND Session duration ≥ 120 seconds (2 minutes)
- **Membership duration**: 30 days

**How to set this in GA4:**
1. Choose a "Custom" condition type
2. Select dimension `scroll_depth_percentage` 
3. Set condition "greater than or equal to" 75
4. Add a second condition: Demographics and tech → Session duration ≥ 120 seconds

**Important**: Click **Save** after creating each audience. These audiences will help identify your most valuable visitor segments for future analysis and remarketing campaigns.

---

## Step 7: Testing & Publishing

### Preview Mode Testing
1. Click **Preview** in GTM
2. Visit your site and test:
   - ✅ Page loads (Base Tracking fires)
   - ✅ Click PDF links (CV Download fires) - Should have 2000ms delay
   - ✅ Click mailto links (Email Contact fires) - May need 2000ms delay
   - ✅ Click LinkedIn links (LinkedIn Click fires) - Should fire immediately (no delay)
   - ✅ Scroll down (Scroll Depth fires at 25%, 50%, 75%, 100%)
   - ✅ Visit non-existent page (404 Error fires) - Try `/fake-page` to test

### Troubleshooting Social Media Links
**If social media clicks don't trigger:**
1. Enable additional built-in variables: `Click Element`, `Click Classes`, `Click ID`
2. Create a debug trigger with "Click - All Elements" firing on all clicks
3. Check what GTM captures when clicking social icons (often clicking SVG, not link)
4. Solution: Use **Link Click** trigger type instead of "Click - All Elements"
5. Link Click automatically finds the parent `<a>` element when clicking nested icons/SVG

### Publish Container
1. Verify all tags fire correctly in Preview
2. Click **Submit** in GTM
3. Add publish notes: "Pure GTM tracking implementation"

---

## Step 8: Monitoring & Analytics

### Key GA4 Reports
- **Real-time**: Monitor live events
- **Engagement → Events**: Track conversion events
- **Acquisition → Traffic acquisition**: Traffic source analysis
- **Engagement → Pages and screens**: Page performance

### 404 Error Monitoring
After publishing your GTM container, monitor 404 errors in GA4:

**Real-time Monitoring:**
- **Real-time → Events**: Look for `page_not_found` events
- **Reports → Engagement → Events**: Track 404 frequency and patterns

**Priority-Based Analysis:**
Create a custom report filtered by the `referrer_type` parameter:
- **`internal` referrer_type**: **HIGH PRIORITY** - Broken internal links, fix immediately
- **`search_engine` referrer_type**: **MEDIUM PRIORITY** - Users expect these pages to exist
- **`external`/`social_media` referrer_type**: **LOW PRIORITY** - Monitor for patterns only  
- **`direct` referrer_type**: **LOWEST PRIORITY** - Usually user typos

**Monthly Review Process:**
1. Filter 404 events by `referrer_type` = `internal`
2. Use `error_page_title` dimension to identify broken pages
3. Cross-reference with `page_location` to find broken links
4. Fix internal broken links first, then evaluate search engine 404s

### Professional Interest Score Formula
```
(CV Downloads × 10) + (Email Contacts × 25) + (LinkedIn Clicks × 15) 
÷ Total Sessions = Professional Interest Score
```

### Academic Engagement Rate
```
Assignment Page Views + Project Views with 75%+ scroll
÷ Total Academic Content Views = Engagement Rate
```

---

## Step 9: Monthly Review Checklist

- [ ] Professional interaction conversion rates
- [ ] Top performing project/assignment pages  
- [ ] Mobile vs desktop engagement patterns
- [ ] Geographic distribution of quality visitors
- [ ] Scroll depth analysis by page type
- [ ] Contact form completion funnel

---

## Technical Architecture

### Data Flow
```
User Action → GTM Trigger → GA4 Event Tag → GA4 Property → Reports
```

### No Custom JavaScript Required
- ✅ Pure GTM configuration
- ✅ Built-in click/scroll detection  
- ✅ URL-based page categorization
- ✅ Zero maintenance overhead

### Hugo Blox Integration
- GTM container: `GTM-WP4B9N6J` (set in `config/_default/params.yaml`)
- Privacy pack: Enabled for GDPR compliance
- No custom template files required

---

## 🎯 Success Metrics

### Primary KPIs
- **CV Downloads**: Professional interest indicator
- **Email Contacts**: High-value conversion
- **Quality Time**: Scroll depth + session duration

### Secondary KPIs  
- **Assignment Engagement**: Academic network building
- **Project Interest**: Portfolio effectiveness
- **Return Visits**: Brand building success

### Long-term Goals
- Professional opportunities generated
- Academic network growth
- Portfolio-to-career pipeline optimization