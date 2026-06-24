import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'ka9py84m',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function inspectLesson() {
    try {
        const slugBase = 'intro-to-arrays'
        // Check both potential slugs
        const slugs = [slugBase, `${slugBase}-ar`]

        console.log(`Checking lessons with slugs: ${slugs.join(', ')}...`)

        const query = `*[_type == "lesson" && slug.current in $slugs]{
      _id,
      title,
      "slug": slug.current,
      language
    }`

        const docs = await client.fetch(query, { slugs })

        if (docs.length === 0) {
            console.log('❌ No documents found with these slugs.')
        } else {
            console.log('✅ Found documents:')
            docs.forEach(d => {
                console.log(`- Title: "${d.title}"`)
                console.log(`  ID: ${d._id}`)
                console.log(`  Slug: ${d.slug}`)
                console.log(`  Language: ${d.language}`)
                console.log('---')
            })
        }
    } catch (error) {
        console.error('Error:', error.message)
    }
}

inspectLesson()
