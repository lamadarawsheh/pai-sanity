import json
import os

# Define the source file with content and the output file
input_file = "data/update-lessons-content.ndjson"
output_file = "data/english-lessons-with-content.ndjson"

processed_count = 0

with open(output_file, 'w') as out_f:
    # 1. Process the detailed content file first
    if os.path.exists(input_file):
        print(f"Propagating content from {input_file}...")
        with open(input_file, 'r') as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    doc = json.loads(line)
                    
                    # Ensure language is set to 'en'
                    doc['language'] = 'en'
                    
                    # Write to output
                    out_f.write(json.dumps(doc) + '\n')
                    processed_count += 1
                except json.JSONDecodeError:
                    continue
    else:
        print(f"Error: Could not find {input_file}")

print(f"✅ Prepared {output_file} with {processed_count} lessons containing body text.")
print("Run the import command to update these lessons in Sanity.")
