import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uyvd607s",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true
});

async function checkPosts() {
  try {
    console.log('🔍 Checking blog posts...');
    
    // Get basic post info
    const basicQuery = '*[_type == "blogPost"]{ _id, title }';
    const basicResults = await client.fetch(basicQuery);
    console.log('\n📝 Found posts (basic query):');
    console.table(basicResults);
    
    // Get detailed post info
    const detailedQuery = `*[_type == "blogPost"]{
      _id,
      title,
      "hasSlug": defined(slug),
      "slugValue": slug.current,
      "hasContent": defined(content),
      "hasExcerpt": defined(excerpt),
      "isPublished": !(_id in path('drafts.**')),
      publishedAt,
      _createdAt,
      _updatedAt
    }`;
    
    const detailedResults = await client.fetch(detailedQuery);
    console.log('\n🔍 Detailed post information:');
    console.table(detailedResults);
    
    // Check for any validation issues
    const invalidPosts = detailedResults.filter(post => 
      !post.hasSlug || !post.slugValue || !post.publishedAt
    );
    
    if (invalidPosts.length > 0) {
      console.log('\n⚠️  Some posts have missing required fields:');
      invalidPosts.forEach(post => {
        console.log(`\nPost: ${post.title} (${post._id})`);
        if (!post.hasSlug) console.log('❌ Missing slug');
        if (!post.slugValue) console.log('❌ Empty slug value');
        if (!post.publishedAt) console.log('❌ Missing published date');
      });
    } else {
      console.log('\n✅ All posts have the required fields!');
    }
    
  } catch (error) {
    console.error('Error checking posts:', error);
  }
}

checkPosts();
