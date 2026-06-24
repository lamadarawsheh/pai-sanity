// Direct test script for Sanity connection
import { createClient } from "@sanity/client";

// Configuration - update these with your values
const config = {
  projectId: "uyvd607s",  // Your Sanity project ID
  dataset: "production",   // Your dataset name
  apiVersion: "2024-01-01",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN  // Optional: only needed for private datasets
};

const client = createClient(config);

async function testSanityConnection() {
  try {
    console.log('🔍 Testing Sanity connection...');
    
    // Test query to fetch blog posts count
    const query = 'count(*[_type == "blogPost"])';
    const count = await client.fetch(query);
    
    console.log(`✅ Successfully connected to Sanity!`);
    console.log(`📊 Found ${count} blog posts in your dataset.`);
    
    // Fetch first 3 blog post titles
    if (count > 0) {
      const posts = await client.fetch('*[_type == "blogPost"] | order(publishedDate desc)[0...3] { title, "slug": slug.current }');
      console.log('\n📝 Latest blog posts:');
      posts.forEach((post: any, index: number) => {
        console.log(`   ${index + 1}. ${post.title} (/${post.slug})`);
      });
    }
  } catch (error: any) {
    console.error('\n❌ Error connecting to Sanity:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your internet connection');
    console.log('2. Verify the project ID and dataset name');
    console.log('3. If using a private dataset, ensure you have a valid API token');
    console.log('4. Check CORS settings in your Sanity project');
    console.log('\n💡 Try visiting: https://uyvd607s.api.sanity.io/v2021-10-21/data/query/production?query=*%5B%5D%7B%0A++_type%0A%7D');
  }
}

testSanityConnection();
