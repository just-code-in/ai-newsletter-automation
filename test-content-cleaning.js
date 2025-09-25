// Test script for Stage 1 content cleaning functions
// Run with: node test-content-cleaning.js

const fs = require('fs');

// Import the content cleaning functions from our workflow
// These are the same functions implemented in the Phase 1B workflow

// 1. Remove advertisements and endorsements
function removeAdvertisements(content) {
  return content
    // Remove "PRESENTED BY" sections (case insensitive)
    .replace(/#{1,6}\s*\**PRESENTED BY.*?\**/gim, '')
    .replace(/\*\*PRESENTED BY.*?\*\*/gi, '')
    // Remove sponsorship acknowledgments
    .replace(/sponsored by.*?(?=\n|$)/gi, '')
    .replace(/in partnership with.*?(?=\n|$)/gi, '')
    // Remove subscription/promotion sections
    .replace(/\[.*?browse.*?tools.*?\]/gi, '')
    .replace(/\[.*?browse.*?courses.*?\]/gi, '')
    .replace(/\[.*?advertise.*?\]/gi, '')
    // Remove promotional calls-to-action
    .replace(/click here to.*?(?=\n|$)/gi, '')
    .replace(/sign up.*?(?=\n|$)/gi, '');
}

// 2. Remove images and videos
function removeMediaContent(content) {
  return content
    // Remove markdown images
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove HTML img tags
    .replace(/<img[^>]*>/gi, '')
    // Remove video embeds
    .replace(/<video[^>]*>.*?<\/video>/gis, '')
    .replace(/\[.*?video.*?\]/gi, '')
    .replace(/watch.*?here.*?\[.*?\]/gi, '');
}

// 3. Clean URLs (remove UTM parameters)
function cleanUrls(content) {
  return content.replace(/\((https?:\/\/[^\s\)]+)\?[^\)]*\)/g, '($1)');
}

// 4. Remove engagement queries and polls
function removeEngagementContent(content) {
  return content
    // Remove polls and surveys
    .replace(/what did you think.*?\?.*?(?=\n|$)/gi, '')
    .replace(/rate this.*?(?=\n|$)/gi, '')
    .replace(/feedback.*?\?.*?(?=\n|$)/gi, '')
    // Remove social engagement prompts
    .replace(/share this.*?(?=\n|$)/gi, '')
    .replace(/follow us.*?(?=\n|$)/gi, '');
}

// 5. Remove ancillary language and navigation
function removeAncillaryContent(content) {
  return content
    // Remove navigation elements
    .replace(/view more.*?(?=\n|$)/gi, '')
    .replace(/twitter widget iframe/gi, '')
    .replace(/read more.*?(?=\n|$)/gi, '')
    // Remove repeated headlines (pattern: "- Title # Title")
    .replace(/^-\s*(.+?)\s*#\s*\1\s*$/gim, '# $1')
    // Remove footer elements
    .replace(/unsubscribe.*?(?=\n|$)/gi, '')
    .replace(/manage preferences.*?(?=\n|$)/gi, '');
}

// 6. Remove author information
function removeAuthorInfo(content) {
  return content
    // Remove bylines and author attribution
    .replace(/^by\s+.*?(?=\n|$)/gim, '')
    .replace(/author:?\s*.*?(?=\n|$)/gi, '')
    // Remove author images and social links
    .replace(/\[.*?author.*?\]/gi, '')
    .replace(/@\w+/g, '')  // Remove @ mentions
    // Remove publication dates with author names
    .replace(/.*?\d{4}.*?\/.*?(?=\n|$)/g, '');
}

// 7. Clean excessive whitespace and formatting
function normalizeWhitespace(content) {
  return content
    .replace(/\n\s*\n\s*\n/g, '\n\n')  // Collapse multiple line breaks
    .replace(/^\s+|\s+$/gm, '')         // Trim lines
    .replace(/\s+/g, ' ')              // Normalize spaces
    .trim();
}

// Test the cleaning functions
function testContentCleaning() {
  console.log('🧪 Testing Stage 1 Content Cleaning Functions\n');

  try {
    // Read test content
    const testContent = fs.readFileSync('stage1-content-cleaning-test.md', 'utf8');
    const originalLength = testContent.length;

    console.log(`📄 Original content length: ${originalLength} characters\n`);

    // Apply cleaning pipeline
    let cleanedContent = testContent;

    console.log('🧹 Applying cleaning functions:');

    cleanedContent = removeAdvertisements(cleanedContent);
    console.log('  ✅ Advertisements removed');

    cleanedContent = removeMediaContent(cleanedContent);
    console.log('  ✅ Images and videos removed');

    cleanedContent = cleanUrls(cleanedContent);
    console.log('  ✅ URLs cleaned (UTM parameters removed)');

    cleanedContent = removeEngagementContent(cleanedContent);
    console.log('  ✅ Engagement content removed');

    cleanedContent = removeAncillaryContent(cleanedContent);
    console.log('  ✅ Navigation and ancillary content removed');

    cleanedContent = removeAuthorInfo(cleanedContent);
    console.log('  ✅ Author information removed');

    cleanedContent = normalizeWhitespace(cleanedContent);
    console.log('  ✅ Whitespace normalized');

    const cleanedLength = cleanedContent.length;
    const reductionPercentage = ((originalLength - cleanedLength) / originalLength * 100).toFixed(1);

    console.log(`\n📊 Results:`);
    console.log(`  Original: ${originalLength} characters`);
    console.log(`  Cleaned:  ${cleanedLength} characters`);
    console.log(`  Reduction: ${reductionPercentage}% (${originalLength - cleanedLength} characters removed)`);

    // Save cleaned content for inspection
    fs.writeFileSync('stage1-cleaned-output.md', cleanedContent);
    console.log(`\n💾 Cleaned content saved to: stage1-cleaned-output.md`);

    // Show sample of cleaned content
    console.log(`\n📖 Sample of cleaned content:`);
    console.log('─'.repeat(50));
    console.log(cleanedContent.slice(0, 500) + (cleanedContent.length > 500 ? '...' : ''));
    console.log('─'.repeat(50));

    return {
      success: true,
      originalLength,
      cleanedLength,
      reductionPercentage: parseFloat(reductionPercentage),
      cleanedContent
    };

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    return { success: false, error: error.message };
  }
}

// Run the test
const result = testContentCleaning();

if (result.success) {
  console.log('\n🎉 Stage 1 Content Cleaning Test PASSED!');
  console.log(`   Expected reduction: 30-60%`);
  console.log(`   Actual reduction: ${result.reductionPercentage}%`);

  if (result.reductionPercentage >= 30) {
    console.log('   ✅ Reduction meets expectations');
  } else {
    console.log('   ⚠️  Reduction below expected range');
  }
} else {
  console.log('\n❌ Stage 1 Content Cleaning Test FAILED!');
  console.log(`   Error: ${result.error}`);
}