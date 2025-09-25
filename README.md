# AI Newsletter Automation System

A complete automated newsletter system that downloads, curates, and generates professional newsletters from AI news content stored in Cloudflare R2.

## Workflow Overview

The automation scans for new `.md` files since the last successful run, downloads their content, and combines them into a single structured newsletter markdown file.

## Key Features

- **Weekly Schedule**: Runs every Monday by default
- **Manual Override**: Manual trigger with optional date override for testing
- **Smart Tracking**: Maintains run history in `newsletter-automation-last-run.json` (visible on R2 dashboard)
- **Date Range Processing**: Processes files from last run date to current date
- **Structured Output**: Combines articles by date and source into clean markdown format

## Setup Instructions

1. **Import Workflow**: Import `newsletter-download-workflow.json` into your n8n instance

2. **Configure Credentials**: Ensure "Cloudflare R2 S3 Format Datalake" credentials are configured with:
   - Bucket: `n8n-ai-news-stories`
   - Proper S3-compatible API access to Cloudflare R2

3. **Test First Run**: Use manual trigger to test the workflow before scheduling

## File Structure

### Input Files (R2 Bucket)
```
n8n-ai-news-stories/
├── newsletter-automation-last-run.json  # Tracking file (dashboard visible)
├── 2025-09-19/
│   ├── article-title.source-name.md     # Main content
│   ├── article-title.source-name.html   # HTML backup
│   └── article-title.source-name.urls.json  # External links
└── 2025-09-20/
    └── ...
```

### Output Files
- `newsletter-combined-{date}.md` - Combined newsletter in R2 bucket
- Updated `newsletter-automation-last-run.json` tracking file

## Manual Testing

### Basic Test
Use manual trigger to process files from today only.

### Date Override Test
Pass `override_date` parameter to manual trigger:
```json
{
  "override_date": "2025-09-15"
}
```

### Reset Tracking
Delete `newsletter-automation-last-run.json` from R2 to reset processing history.

## Output Format

The combined newsletter follows this structure:

```markdown
# Newsletter - {start_date} to {end_date}

## 2025-09-19

### Article Title (Source Name)

[Article content from .md file]

---

### Another Article (Different Source)

[Article content]

---

## 2025-09-20

### Next Day Article (Source)

[Content]

---
```

## Tracking File Format

`newsletter-automation-last-run.json` structure:
```json
{
  "last_successful_run": "2025-09-21T10:00:00Z",
  "last_processed_date": "2025-09-20",
  "files_processed": 15,
  "workflow_version": "1.0",
  "last_run_statistics": {
    "total_articles": 15,
    "total_words": 12500,
    "date_range": { "start": "2025-09-19", "end": "2025-09-20" },
    "sources_processed": ["the-neuron", "superhuman", "bens-bites"],
    "processing_date": "2025-09-21T10:00:00Z"
  }
}
```

## Error Handling

- **Missing tracking file**: Creates default on first run
- **No new files**: Completes successfully with empty newsletter
- **S3 access errors**: Workflow stops with clear error message
- **Malformed file names**: Skips invalid files, processes valid ones

## Testing Results ✅ COMPLETED

The workflow has been successfully tested and debugged:

- ✅ **S3 Compatibility**: Fixed compatibility issues with Cloudflare R2 by using bucket search operation
- ✅ **Content Extraction**: Resolved Base64 decoding issue for proper markdown content extraction
- ✅ **Multi-file Processing**: Successfully processes all 4 files (verified with real data)
- ✅ **Content Combination**: Properly combines articles by date and source into structured format
- ✅ **Tracking System**: Creates and updates tracking file in R2 bucket root

### Test Data Processed
Last test run processed 4 files from multiple dates:
- `claude-finally-adds-true-memory.futurepedia.md` (16.8 kB)
- `sunday-special-a-safety-system-for-air-crashes.superhuman.md` (16 kB)
- `big-tech-return-to-us-immediately.taaft.md` (14.7 kB)
- `elon-thinks-grok-5-agi.the-neuron.md` (24.7 kB)

## Phase 2: AI-Powered Content Curation ✅ COMPLETED & PRODUCTION READY

### ✅ **Latest Updates - Date Validation & Gmail Integration**

#### **Date Mismatch Detection System**
- **Issue**: September 24 scrape resulted in September 23 newsletter processing
- **Solution**: Comprehensive date validation with severity categorization
- **Implementation**: Non-interrupting workflow with enhanced notifications

#### **Enhanced Notifications**
- **Previous**: Slack notifications with block formatting
- **Current**: Gmail notifications to justin@herenowai.com
- **Format**: Rich HTML with CSS styling and prominent date mismatch alerts
- **Credentials**: Gmail OAuth2 (id: "DbgMOOrFimJRx5qQ")

#### **S3 Configuration Fixes**
- **Corrected Operation**: "getAll" with Return All enabled
- **Parameters**: Credential, Resource (file), Operation (getAll), Bucket Name, Return All (True)
- **Working Config**: Removes previous "Get Many"/"getMany" operation issues

Advanced content curation system with two implementation approaches:

### ✅ **Dynamic File Detection Implemented**
- **Latest File Discovery**: Automatically finds newest `newsletter-combined-{date}.md` from R2
- **Production Workflow**: Removed hardcoded dates, now fully automated
- **Error Recovery**: Robust handling of missing files and date parsing

### ✅ **Dual Implementation Strategy**

#### AI Agent System (`phase2-ai-agents-production.json`)
- **3 Specialized AI Agents**: Deduplication, Quality Evaluation, Content Curation
- **Sophisticated Analysis**: Semantic similarity, editorial judgment, portfolio optimization
- **LangChain Integration**: Advanced tool calling with JSON schema validation
- **Rich Context**: Deep content understanding and relationship analysis

#### Simple Algorithm System (`phase2-simple-dedup.json`) - **RECOMMENDED**
- **Proven Performance**: 11 articles → 4 selections, 10/10 diversity, 7.7/10 quality
- **Fast & Reliable**: No API dependencies, deterministic results
- **Cost Effective**: Zero LLM costs for processing
- **Transparent Logic**: Easy debugging and criteria modification

### ✅ **Production Results**
**Latest Run (2025-09-23):**
- ✅ Processed 11 articles from `newsletter-combined-2025-09-23.md`
- ✅ Removed 1 duplicate article
- ✅ Selected 4 top-quality articles with perfect source diversity
- ✅ Average quality score: 7.7/10 with strong AI relevance
- ✅ Automated Gmail notification and R2 storage
- ✅ **Enhanced with date validation system for future runs**

### ✅ **Algorithm Performance**
- **Deduplication**: Jaccard similarity on filtered title keywords (>70% threshold)
- **Quality Scoring**: Content length + source authority + AI keyword relevance
- **Diversity Optimization**: Ensures different sources in final selection
- **Configurable Thresholds**: Easy adjustment of scoring criteria
- **Date Validation**: Automatic mismatch detection with severity classification
- **Enhanced Notifications**: HTML email alerts with prominent date warnings

### ✅ **Files Created**
- `phase2-ai-agents-production.json` - AI agent system with dynamic file detection
- `phase2-simple-dedup.json` - **Production-ready system with date validation & Gmail** ⭐
- `phase2-simple-dedup-v2.1-with-date-validation.json` - Enhanced backup version with validation
- `fixed-simple-test.json` - Test workflow for validation
- Various debugging and iteration files

## Phase 3A: Newsletter Generation ✅ COMPLETED & PRODUCTION TESTED

### ✅ **Professional Newsletter Generation System**
Advanced AI-powered system that converts curated stories into professional newsletter content:

- **AI Subject Line Generation**: Claude 3.5 creates compelling 7-9 word subject lines with alternatives
- **Axios-Style Content**: Professional 3-section format ("The Recap", "Unpacked", "Bottom Line")
- **Engaging Introductions**: AI-generated intro sections with story teasers and bullet lists
- **Complete Automation**: End-to-end processing from curated JSON to formatted markdown

### ✅ **Production Features Implemented**
- **Standalone Architecture**: Independent from Phase 2, enabling clean separation of concerns
- **Dynamic File Detection**: Automatically finds and processes latest curated stories from R2
- **Date Validation**: Non-interrupting detection of date mismatches with severity classification
- **Quality Control**: Structured story format with strict AI-enforced consistency
- **Gmail Notifications**: Rich HTML completion alerts with alternative subject lines and statistics

### ✅ **Technical Implementation**
- **Claude 3.5 Sonnet Integration**: Advanced LangChain nodes with structured output parsing
- **Story Processing Pipeline**: Split stories → AI generation → content aggregation → newsletter assembly
- **Error Recovery**: Comprehensive validation and graceful failure handling
- **Multi-format Support**: Handles both `selectedStories` and `selected_articles` data formats

### ✅ **Production Testing Results**
**Latest Run (2025-09-24):**
- ✅ Successfully processed 4 curated stories into complete newsletter
- ✅ Generated compelling subject line: "OpenAI's GPT-4.1 family launches with million-token context"
- ✅ Created 5 alternative subject line options for A/B testing
- ✅ Professional 3-section formatting for each story segment
- ✅ Complete markdown newsletter uploaded to R2 as `newsletter-2025-09-24.md`
- ✅ Gmail notification with processing statistics and alternatives sent

### ✅ **Files Created**
- `phase3a-newsletter-generation.json` - **Production-ready & tested workflow** ⭐
- `sample-curated-stories-2025-09-24.json` - Test data matching Phase 2 output
- `test-curated-stories-2025-09-24.json` - Additional test data for production testing
- `PHASE3A-README.md` - Comprehensive setup and troubleshooting guide

### ✅ **Critical Debugging Notes**
During production testing, resolved multiple n8n workflow issues:
- **Node Reference Errors**: Fixed incorrect node name references in cross-node expressions
- **Aggregate Configuration**: Corrected LangChain output aggregation for `output.storyContent`
- **Connection Format**: Resolved n8n connection structure using display names as keys
- **Expression Evaluation**: Fixed prompt template references to use proper node syntax

## Next Steps - Ready for Phase 3B

### Phase 3B: HTML Email Template Generation
- Convert markdown newsletter to responsive email layout
- Implement email client compatibility and deliverability optimization
- Add branding, styling, and visual elements
- Create template system with A/B testing capabilities

### Phase 4: Distribution System
- Subscriber list management
- Email sending automation
- Delivery tracking and analytics
- Bounce and unsubscribe handling

### Phase 5: Management & Analytics
- Archive management system
- Performance analytics dashboard
- Content source management
- Subscription analytics

## Troubleshooting

1. **No files processed**: Check date range and verify files exist in R2
2. **Credential errors**: Verify R2 S3 credentials and bucket access
3. **Empty output**: Confirm `.md` files exist for the date range
4. **Tracking issues**: Check `newsletter-automation-last-run.json` format
5. **Content extraction issues**: Verify Base64 decoding in Parse Content node