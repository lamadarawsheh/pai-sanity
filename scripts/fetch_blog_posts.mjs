import { createClient } from '@sanity/client'
import fs from 'fs'

const client = createClient({
    projectId: 'ka9py84m',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function fetchBlogPosts() {
    try {
        const posts = await client.fetch('*[_type == "blogPost"]')
        console.log(`Fetched ${posts.length} blog posts.`)
        fs.writeFileSync('data/existing-blog-posts.ndjson', posts.map(p => JSON.stringify(p)).join('\n'))
    } catch (error) {
        console.error('Error fetching blog posts:', error.message)
    }
}

fetchBlogPosts()
