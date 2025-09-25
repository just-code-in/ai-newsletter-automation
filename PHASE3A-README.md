# Phase 3A: Newsletter Generation

Complete n8n workflow that transforms curated story selections into professional newsletter content with AI-generated subject lines.

## Overview

This standalone workflow processes `curated-stories-{date}.json` files from R2 storage and generates publication-ready newsletter content with:

- **AI Subject Lines**: Compelling subject lines with alternatives and pre-header text
- **Professional Intro**: Engaging introduction that teases the main stories
- **3-Section Story Format**: Each story formatted with "The Recap", "Unpacked", "Bottom Line"
- **Markdown Output**: Clean newsletter files ready for email template conversion

## Workflow Architecture

```
R2 Bucket → Find Latest → Download → Parse → Subject Lines → Intro → Stories → Assemble → Upload → Notify
```

### Key Features

1. **Dynamic File Detection**: Automatically finds the latest `curated-stories-{date}.json`
2. **Date Validation**: Detects and reports date mismatches (non-interrupting)
3. **AI Content Generation**: Uses Claude 3.5 Sonnet for all text generation
4. **Professional Formatting**: Axios/Rundown style with consistent structure
5. **Gmail Notifications**: Completion alerts with subject line alternatives

## Input Format

The workflow expects `curated-stories-{date}.json` with this structure:

```json
{
  "processedDate": "2025-09-24T10:00:00Z",
  "selectedStories": [
    {
      "title": "Story headline",
      "source": "source-name",
      "content": "Full story content...",
      "summary": "Brief summary",
      "totalScore": 8.2,
      "wordCount": 850
    }
  ],
  "averageScore": 7.8,
  "diversityScore": 10.0,
  "totalArticles": 11
}
```

## Output Format

Generates `newsletter-{date}.md` with this structure:

```markdown
# Subject Line

Pre-header text

---

**Good morning, {{ first_name | AI enthusiast }}.**

Introduction paragraph about the lead story...

Second paragraph with implications or questions...

**In today's AI recap:**

- First story summary
- Second story summary
- Third story summary
- Fourth story summary

---

## First Story Title

**The Recap:** Brief 1-2 sentence summary of the story.

**Unpacked:**
- Key detail expanding on the story
- Important context or implications
- Technical details or data points
- Industry significance or impact

**Bottom line:** Two sentences on what this means for readers and the broader AI landscape.

---

[Additional stories follow same format]

---

*Generated from curated stories on 2025-09-24*
*Source: curated-stories-2025-09-24.json*
*Stories processed: 11 | Average score: 7.8*
```

## Setup Instructions

### 1. Import Workflow
- Import `phase3a-newsletter-generation.json` into your n8n instance

### 2. Configure Credentials
Ensure these credentials are configured:
- **Cloudflare R2 S3 Format Datalake**: S3-compatible access to R2 bucket
- **Gmail OAuth2**: For completion notifications (ID: DbgMOOrFimJRx5qQ)

### 3. Verify Claude Model
- Workflow uses Claude 3.5 Sonnet for text generation
- Ensure Anthropic credentials are configured

## Manual Testing

### Test with Sample Data
1. Upload `sample-curated-stories-2025-09-24.json` to R2 bucket
2. Run workflow manually to test processing
3. Check R2 for output `newsletter-2025-09-24.md`
4. Verify Gmail notification received

### Test Date Validation
- Run with older curated stories to test date mismatch detection
- Verify non-interrupting warning in email notification

## Content Quality Guidelines

### Subject Lines
- **Length**: 7-9 words maximum
- **Focus**: Lead story only
- **Style**: Clear, engaging, curiosity-driven
- **Avoid**: ALL CAPS, excessive punctuation, clickbait

### Story Content
- **The Recap**: 1-2 sentences maximum
- **Unpacked**: Exactly 3-4 bullet points using `-` format
- **Bottom Line**: Exactly 2 sentences on significance

### Writing Style
- **Tone**: Enthusiastic, authoritative, conversational
- **Audience**: AI enthusiasts, developers, entrepreneurs
- **Voice**: Use "we," "you" - make it personal
- **Technical Level**: Accessible but not oversimplified

## Error Handling

### Common Issues
1. **No curated files found**: Check R2 bucket and file naming
2. **Invalid JSON structure**: Verify curated-stories format
3. **Claude API errors**: Check Anthropic credentials and quotas
4. **Gmail failures**: Verify OAuth2 credentials

### Troubleshooting
- **Empty stories**: Ensure curated JSON has `selectedStories` array
- **Poor content quality**: Review and adjust AI prompts
- **Date mismatches**: Normal for delayed processing, non-interrupting

## Performance Expectations

### Processing Time
- **Complete workflow**: 3-5 minutes for 4 stories
- **Subject line generation**: 30-60 seconds
- **Story segment creation**: 45-90 seconds per story
- **File upload/notification**: 10-15 seconds

### Output Quality
- **Subject lines**: Optimized for engagement and open rates
- **Content consistency**: Professional Axios/Rundown style
- **Technical accuracy**: Based strictly on source material
- **Readability**: Accessible to AI enthusiasts at all levels

## Integration with Phase 2

### Input Source
- Processes output from `phase2-simple-dedup.json`
- Compatible with enhanced curation algorithms
- Supports multi-source expansion (Web, Reddit)

### Workflow Triggers
- **Manual**: For testing and one-off generation
- **Scheduled**: Can be triggered after Phase 2 completion
- **Webhook**: For automated pipeline integration

## Next Steps - Phase 3B

After Phase 3A success:
1. **HTML Email Templates**: Convert markdown to responsive email layout
2. **Email Client Testing**: Ensure compatibility across email clients
3. **Template Customization**: Branding, styling, and visual elements
4. **A/B Testing**: Subject line optimization and format testing

## Technical Notes

### File Naming Convention
- **Input**: `curated-stories-YYYY-MM-DD.json`
- **Output**: `newsletter-YYYY-MM-DD.md`
- **Location**: `n8n-ai-news-stories` R2 bucket

### Dependencies
- **n8n version**: Compatible with latest n8n versions
- **Claude 3.5 Sonnet**: For all AI text generation
- **R2 Storage**: Cloudflare R2 for file operations
- **Gmail API**: For notifications and alerts

### Monitoring
- Gmail notifications include:
  - Subject line and alternatives
  - Processing statistics
  - Date validation results
  - Source file information
  - Quality metrics

The workflow is production-ready and designed for reliable, autonomous operation as part of the larger newsletter automation pipeline.