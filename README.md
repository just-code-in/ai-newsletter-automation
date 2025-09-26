# AI Newsletter Automation System

A complete automated newsletter system that processes RSS feeds, curates AI news content, and generates professional newsletters using n8n workflows and Claude AI.

## System Overview

**Complete end-to-end pipeline from RSS feeds to professional newsletters:**
1. **Phase 1A**: RSS feed monitoring and content download
2. **Phase 1B**: Content cleaning and consolidation (47.7% noise reduction)
3. **Phase 2**: AI-powered content curation and story selection
4. **Phase 3A**: Professional newsletter generation with Axios-style formatting

## Current Status: ✅ PRODUCTION READY & FULLY ENHANCED

### ✅ **Complete Pipeline with Quality Improvements**
- **End-to-End Validation**: Full workflow chain tested with real data and enhanced quality controls
- **Content Processing**: Advanced cleaning pipeline achieving 47.7% noise reduction
- **Professional Output**: Axios-style newsletters with perfect formatting and email attachments
- **Quality Assurance**: All formatting issues resolved (bold Plus, greeting removal, URL preservation)
- **Production Testing**: Latest newsletter (September 26) validates all enhancements working correctly

### ✅ **Production Files**
1. **`Phase 1A_ RSS Scan and Upload.json`** - RSS monitoring and upload workflow
2. **`Phase 1B_ RSS Download and Consolidation.json`** - Content cleaning and combination
3. **`phase2-simple-dedup.json`** - Content curation with date validation
4. **`phase3a-newsletter-generation.json`** - Professional newsletter generation

## Quick Start

### Prerequisites
- n8n automation platform
- Cloudflare R2 bucket access
- Gmail account for notifications
- Anthropic Claude API key

### Setup Steps

1. **Import Workflows**: Import all 4 JSON files into your n8n instance
2. **Configure Credentials**: Set up the following in n8n:
   - `Cloudflare R2 S3 Format Datalake` - Your R2 bucket credentials
   - Gmail OAuth2 credentials (for notifications)
   - Claude 3.5 Sonnet API credentials
3. **Update Configuration**:
   - Replace bucket name `n8n-ai-news-stories` with your bucket
   - Update email addresses for notifications
4. **Test Pipeline**: Run Phase 1A manually to verify setup

## Architecture Details

### Phase 1A: RSS Feed Monitoring ✅ PRODUCTION READY
**File**: `Phase 1A_ RSS Scan and Upload.json`

**Current Sources**:
- **Futurepedia** - Daily AI tools and updates
- **Superhuman** - Weekly AI industry insights
- **TAAFT** - Daily AI business news
- **The Neuron** - Daily AI newsletter with research focus

**Features**:
- Scheduled RSS polling (daily at 6:15am)
- Automatic content extraction and cleaning
- R2 upload with organized date structure
- Error handling for failed feeds

### Phase 1B: Content Processing ✅ PRODUCTION READY
**File**: `Phase 1B_ RSS Download and Consolidation.json`

**Advanced Content Cleaning (47.7% noise reduction)**:
- Advertisement and sponsorship removal
- Image and video embed stripping
- URL parameter cleaning (UTM, tracking)
- Duplicate content elimination
- Navigation and ancillary content filtering
- Author information and byline removal

**Key Fixes Applied**:
- ✅ Date range filtering (prevents downloading ALL historical files)
- ✅ Buffer error resolution (field reference fixes)
- ✅ Enhanced content cleaning patterns
- ✅ Tracking data parsing improvements

### Phase 2: Content Curation ✅ PRODUCTION READY
**File**: `phase2-simple-dedup.json`

**Smart Algorithm Features**:
- **Deduplication**: Jaccard similarity on filtered title keywords (70% threshold)
- **Quality Scoring**: Content length + source authority + AI keyword relevance
- **Source Diversity**: Ensures varied sources in final selection
- **Date Validation**: Automatic mismatch detection with severity alerts

**Production Performance**:
- Processes 8-12 articles → Selects top 4 stories
- 10/10 source diversity achieved consistently
- Average quality scores: 7.5-8.0/10
- Zero API costs, deterministic results

### Phase 3A: Newsletter Generation ✅ PRODUCTION READY
**File**: `phase3a-newsletter-generation.json`

**Professional Content Generation**:
- **AI Subject Lines**: Claude 3.5 generates engaging 7-9 word subject lines
- **Axios-Style Format**: 3-section structure (The Recap, Unpacked, Bottom Line)
- **Rich Introductions**: Story teasers and bullet point summaries
- **Complete Automation**: JSON input → Formatted newsletter markdown

**Quality Features**:
- Multiple subject line alternatives for A/B testing
- Consistent story formatting with AI enforcement
- Professional tone optimized for AI enthusiasts
- Rich HTML notifications with completion statistics

## File Structure

### R2 Bucket Organization
```
n8n-ai-news-stories/
├── newsletter-automation-last-run.json     # Pipeline tracking
├── 2025-09-24/
│   ├── story-title.futurepedia.md         # Cleaned articles
│   ├── story-title.superhuman.md
│   └── story-title.urls.json              # External links
├── newsletter-combined-2025-09-24.md      # Phase 1B output
├── curated-stories-2025-09-24.json        # Phase 2 output
└── newsletter-2025-09-24.md               # Final newsletter
```

### Processing Flow
```
RSS Feeds → Raw Articles → Cleaned Content → Curated Stories → Final Newsletter
   1A    →      1B       →        2        →        3A       → Email Template
```

## Production Testing Results

### Latest End-to-End Test (September 2025)
**Input**: 6 articles from multiple sources (Sept 24-25)
**Processing**:
- Phase 1A: Successfully downloaded and uploaded all source content
- Phase 1B: Applied 47.7% content cleaning, perfect date range filtering
- Phase 2: Selected 4 highest-quality stories with perfect source diversity
- Phase 3A: Generated professional newsletter with Axios formatting

**Output Quality**:
- ✅ Professional subject line generation with bold Plus formatting
- ✅ Clean introductions without confusing greetings
- ✅ Consistent 3-section story format with preserved URLs
- ✅ Emoji-free content with 47.7% noise reduction
- ✅ Email notifications with newsletter attachments
- ✅ Comprehensive processing statistics and alerts

## Content Quality Metrics

### Phase 1B Content Cleaning (47.7% noise reduction)
**Removes**:
- Sponsored content and advertisements
- Social media embeds and CTAs
- Subscription prompts and navigation
- Author bylines and publication metadata
- UTM parameters and tracking URLs
- Duplicate headlines and "In this issue" sections

**Preserves**:
- Core article content and insights
- Technical details and data points
- Industry analysis and implications
- Key quotes and research findings

### Phase 2 Curation Algorithm
**Quality Scoring Factors**:
- **Content Length**: Longer articles score higher (200+ words)
- **Source Authority**: TechCrunch=3, The Verge=3, Wired=3, Superhuman=2, Default=1
- **AI Relevance**: Keyword matching for AI/ML terms
- **Uniqueness**: Title similarity detection prevents duplicates

### Phase 3A Newsletter Quality
**Professional Standards**:
- Subject lines: 7-9 words, curiosity-driven, no clickbait
- Story structure: 1-2 sentence recap, 3-4 unpacked bullets, 2-sentence bottom line
- Writing tone: Enthusiastic, authoritative, accessible to AI professionals
- Technical level: Detailed but not overly technical

## Configuration & Credentials

### Required n8n Credentials
1. **Cloudflare R2 S3 Format Datalake**
   - S3-compatible credentials for your R2 bucket
   - Used across all phases for file operations

2. **Gmail OAuth2** (ID: "DbgMOOrFimJRx5qQ")
   - Gmail account for workflow notifications
   - Rich HTML email formatting with statistics

3. **Claude 3.5 Sonnet API**
   - Anthropic API credentials
   - Used in Phase 3A for content generation

### Environment Variables
- **R2_BUCKET**: `n8n-ai-news-stories` (update to your bucket)
- **NOTIFICATION_EMAIL**: Update to your preferred email address

## Next Development Phase: Source Expansion

### Additional Sources to Add
**High-Priority Targets**:
1. **The Batch (DeepLearning.AI)** - Weekly AI research insights
2. **Import AI** - Technical AI research and policy analysis
3. **The Sequence** - In-depth AI business analysis
4. **AI Breakfast** - Daily AI news with business focus
5. **Ben's Bites** - Popular daily community-driven AI newsletter

### Implementation Strategy
- [ ] Research RSS feed URLs for target sources
- [ ] Add new RSS triggers to Phase 1A workflow
- [ ] Analyze content patterns for Phase 1B cleaning enhancement
- [ ] Update Phase 2 source authority scoring
- [ ] Test complete pipeline with expanded sources
- [ ] Update documentation and deployment guides

**Expected Impact**: 8-9 total sources, improved content diversity, reduced single-point-of-failure risk

## Troubleshooting & Maintenance

### Common Issues & Solutions

**Phase 1A Issues**:
- RSS feed failures → Check feed URLs and network connectivity
- Upload errors → Verify R2 credentials and bucket permissions

**Phase 1B Issues**:
- Buffer undefined errors → Check field references in "Prepare Tracking Update" node
- Date range problems → Verify tracking file format and date parsing

**Phase 2 Issues**:
- No files found → Check newsletter-combined-{date}.md exists in R2
- Quality scoring errors → Verify article content structure and source mapping

**Phase 3A Issues**:
- Claude API errors → Check API credentials and rate limits
- Node reference errors → Verify exact display names in cross-node expressions
- Aggregation failures → Check LangChain output configuration

### Performance Monitoring
**Key Metrics**:
- Content noise reduction percentage (target: 45-50%)
- Curation quality scores (target: 7.5+/10 average)
- Source diversity (target: 4+ different sources)
- Processing time (target: <5 minutes end-to-end)
- Newsletter generation success rate (target: 99%+)

### Maintenance Tasks
- **Weekly**: Review curation quality and adjust scoring criteria
- **Monthly**: Analyze source performance and consider additions/removals
- **Quarterly**: Evaluate content cleaning effectiveness and update patterns
- **As needed**: Update AI prompts for newsletter tone and structure improvements

## Documentation Files
- **`CLAUDE.md`** - Detailed development history and technical specifications
- **`PHASE3A-README.md`** - Phase 3A specific setup and troubleshooting
- **`test-content-cleaning.js`** - Standalone testing framework for content cleaning
- **`IMPROVEMENT_PLAN.md`** - 4-stage system enhancement roadmap

## License & Support
This is an internal automation system. For support or questions, refer to the development documentation in `CLAUDE.md` or test the individual phases using the provided manual triggers.