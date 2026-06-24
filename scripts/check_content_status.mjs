import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'ka9py84m',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function checkContentStatus() {
    try {
        const types = ['lesson', 'learningPath', 'chapter', 'codingChallenge']
        console.log('--- Content Status ---')

        for (const type of types) {
            const query = `*[_type == "${type}"]{language}`
            const docs = await client.fetch(query)

            const enCount = docs.filter(d => d.language === 'en' || !d.language).length
            const arCount = docs.filter(d => d.language === 'ar').length

            console.log(`${type}:`)
            console.log(`  Total: ${docs.length}`)
            console.log(`  English (or untagged): ${enCount}`)
            console.log(`  Arabic: ${arCount}`)

            if (docs.length > 0 && docs[0].language === undefined) {
                console.log(`  ⚠️  Warning: Some ${type} documents might be missing the 'language' field.`)
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error.message)
    }
}

checkContentStatus()
