import json
import os

input_files = [
    "all-sample-data.ndjson",
    "sample-challenges.ndjson",
    "sample-chapters.ndjson",
    "sample-learning-paths.ndjson",
    "sample-lessons.ndjson"
]

output_file = "data/english-content-fixed.ndjson"
processed_ids = set()

with open(output_file, 'w') as out_f:
    for filename in input_files:
        filepath = os.path.join("data", filename)
        if not os.path.exists(filepath):
            continue
            
        print(f"Processing {filename}...")
        with open(filepath, 'r') as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    doc = json.loads(line)
                    
                    # Skip if we already processed this ID (to avoid duplicates if files overlap)
                    if doc['_id'] in processed_ids:
                        continue
                        
                    # Add language tag
                    doc['language'] = 'en'
                    
                    # Write to output
                    out_f.write(json.dumps(doc) + '\n')
                    processed_ids.add(doc['_id'])
                    
                except json.JSONDecodeError:
                    continue

print(f"✅ Created {output_file} with {len(processed_ids)} English documents.")
