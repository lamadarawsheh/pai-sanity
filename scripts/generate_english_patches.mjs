import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'ka9py84m',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN, // Need token for write operations
    useCdn: false,
})

// Hardcoding token if not in env, but ideally we should rely on env or ask user. 
// However, previous scripts used process.env without explicit setting in command line, 
// relying on user environment? 
// Actually, earlier scripts like importData.mjs checked for specific env vars.
// The user ran `fix-sanity-data.js` previously which used `process.env.NEXT_PUBLIC_SANITY_TOKEN`.
// I will try to read from .env.local if available or just ask the user to provide it if missing.
// But wait, the previous `fix-sanity-data.js` example from the user output implied they might have a token.
// Let's look at `check_tags.mjs` I wrote earlier. It didn't need a token because it was just reading (public dataset?).
// Writing requires a token.
// I'll try to use the token from the environment if the user has exported it, 
// or I might need to tell the user to run it with the token.

// Let's check if we can source .env.local in the script.
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// The .env.local the user showed earlier only had VITE_... variables which are public.
// VITE_SANITY_PROJECT_ID=ka9py84m
// VITE_SANITY_DATASET=production
// It did NOT seem to have a write token (NEXT_PUBLIC_SANITY_TOKEN or SANITY_TOKEN).
// Writing to Sanity usually requires a token with write permissions.
// The `sanity dataset import` command works because it uses the user's login session from the CLI (`sanity login`).
// running a node script uses the API directly.

// If I cannot find a token, I might need to use `sanity documents create` or `sanity documents patch` via the CLI 
// but `sanity documents query` failed for the user earlier because `sanity` command wasn't found or had issues.
// But they accepted `npx sanity@latest dataset import`.

// Alternative: Generate an NDJSON file with the patches and import it using `sanity dataset import`.
// That uses the CLI session which should be authenticated.
// Yes, that's safer.

async function generatePatches() {
    try {
        const types = ['lesson', 'learningPath', 'chapter', 'codingChallenge', 'author', 'category']
        const query = `*[_type in $types && !defined(language)]{_id, _type}`
        const docs = await client.fetch(query, { types })

        console.log(`Found ${docs.length} documents missing language tag. Generating patches...`)

        // We want to set language to 'en'
        // Format for ndjson import/mutation?
        // Actually `sanity dataset import` imports documents. To patch existing ones, we can just re-import them with the new field?
        // If we re-import with the same ID, it replaces the document. 
        // But we need to keep existing fields.
        // So we need to fetch the full document, add language='en', and save to ndjson.

        const fullQuery = `*[_type in $types && !defined(language)]`
        const detailedDocs = await client.fetch(fullQuery, { types })

        const patchedDocs = detailedDocs.map(doc => ({
            ...doc,
            language: 'en'
        }))

        const fs = await import('fs')
        fs.writeFileSync('data/english-patches.ndjson', patchedDocs.map(d => JSON.stringify(d)).join('\n'))

        console.log(`Saved patches for ${patchedDocs.length} documents to data/english-patches.ndjson`)
        console.log('You can apply these by running: npx sanity@latest dataset import data/english-patches.ndjson production --replace')

    } catch (error) {
        console.error('Error:', error.message)
    }
}

generatePatches()
