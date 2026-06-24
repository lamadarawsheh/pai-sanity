// Test script to verify Sanity connection
import { sanityClient } from './client/src/lib/sanity';

async function testSanityConnection() {
  try {
    console.log('Testing Sanity connection...');
    
    // Test query to fetch blog posts count
    const query = 'count(*[_type == "blogPost"])';
    const count = await sanityClient.fetch(query);
    
    console.log(`✅ Successfully connected to Sanity!`);
    console.log(`📊 Found ${count} blog posts in your dataset.`);
    
    // Fetch first 3 blog post titles
    if (count > 0) {
      const posts = await sanityClient.fetch('*[_type == "blogPost"] | order(publishedDate desc)[0...3] { title, "slug": slug.current }');
      console.log('\nLatest blog posts:');
      posts.forEach((post: any, index: number) => {
        console.log(`${index + 1}. ${post.title} (/${post.slug})`);
      });
    }
  } catch (error: any) {
    console.error('❌ Error connecting to Sanity:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure your .env file is in the project root');
    console.log('2. Verify your Sanity project ID and dataset name');
    console.log('3. Check your internet connection');
    console.log('4. Ensure your Sanity project has the correct CORS origins');
  }
}

testSanityConnection();
