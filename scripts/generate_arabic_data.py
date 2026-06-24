import json
import os

input_file = "/Users/lamadarawsheh/PAI_sanity/data/all-sample-data.ndjson"
output_file = "/Users/lamadarawsheh/PAI_sanity/data/arabic-full-data.ndjson"

translations = {
    "Two Sum": "جمع رقمين",
    "Reverse Linked List": "عكس القائمة المرتبطة",
    "Valid Parentheses": "الأقواس الصحيحة",
    "Maximum Subarray": "أكبر مصفوفة فرعية",
    "Binary Tree Level Order Traversal": "تتبع شجرة ثنائية بترتيب المستوى",
    "LRU Cache": "ذاكرة تخزين مؤقت LRU",
    "Trapping Rain Water": "احتجاز مياه الأمطار",
    "Merge Intervals": "دمج الفواصل الزمنية",
    "Arrays": "المصفوفات",
    "Strings": "السلاسل النصية",
    "Linked Lists": "القوائم المرتبطة",
    "Stack": "المكدس",
    "Trees": "الأشجار",
    "Dynamic Programming": "البرمجة الديناميكية",
    "Two Pointers": "المؤشران",
    "Hash Table": "جدول الهاش",
    "Introduction to Arrays": "مقدمة في المصفوفات",
    "Array Operations": "عمليات المصفوفات",
    "Two Sum Practice": "تمرين جمع رقمين",
    "Arrays Quiz": "اختبار المصفوفات",
    "Introduction to Linked Lists": "مقدمة في القوائم المرتبطة",
    "Linked List Operations": "عمليات القوائم المرتبطة",
    "Reverse Linked List Challenge": "تحدي عكس القائمة المرتبطة",
    "Introduction to Stacks": "مقدمة في المكدسات",
    "Stack Operations & Use Cases": "عمليات المكدس وحالات الاستخدام",
    "Valid Parentheses Practice": "تمرين الأقواس الصحيحة",
    "Introduction to Trees": "مقدمة في الأشجار",
    "Tree Traversals": "تتبع الأشجار",
    "Level Order Traversal Challenge": "تحدي تتبع ترتيب المستوى",
    "Arrays Fundamentals": "أساسيات المصفوفات",
    "Stacks & Queues": "المكدسات والطوابير",
    "Trees & Graphs": "الأشجار والرسوم البيانية",
    "Data Structures Mastery": "إتقان هياكل البيانات",
    "Algorithm Fundamentals": "أساسيات الخوارزميات",
    "Recursion": "العودية",
}

def translate_field(text):
    if not isinstance(text, str):
        return text
    return translations.get(text, text)

arabic_docs = []
metadata_docs = []

# Keep track of all IDs being translated
all_original_ids = set()
with open(input_file, 'r') as f:
    for line in f:
        if line.strip():
            doc = json.loads(line)
            all_original_ids.add(doc['_id'])

def translate_refs(data):
    if isinstance(data, dict):
        if '_type' in data and data['_type'] == 'reference' and '_ref' in data:
            if data['_ref'] in all_original_ids:
                data['_ref'] = f"{data['_ref']}-ar"
        return {k: translate_refs(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [translate_refs(v) for v in data]
    return data

with open(input_file, 'r') as f:
    for line in f:
        if not line.strip():
            continue
        doc = json.loads(line)
        original_id = doc['_id']
        ar_id = f"{original_id}-ar"
        
        # Create Arabic Version
        ar_doc = doc.copy()
        ar_doc['_id'] = ar_id
        ar_doc['language'] = 'ar'
        
        if 'title' in ar_doc:
            ar_doc['title'] = translate_field(ar_doc['title'])
        
        if 'slug' in ar_doc:
            ar_doc['slug']['current'] = f"{ar_doc['slug']['current']}-ar"
            
        if 'category' in ar_doc:
            ar_doc['category'] = translate_field(ar_doc['category'])
            
        if 'description' in ar_doc:
            ar_doc['description'] = f"ترجمة: {ar_doc['description']}"
            
        if 'hints' in ar_doc:
            ar_doc['hints'] = [f"تلميح: {h}" for h in ar_doc['hints']]

        # Recursively update references to point to Arabic equivalents
        ar_doc = translate_refs(ar_doc)
        
        arabic_docs.append(ar_doc)
        
        # Create Metadata Doc to link them
        metadata_doc = {
            "_id": f"translation.metadata.{original_id}",
            "_type": "translation.metadata",
            "translations": [
                {"_key": "en", "value": {"_type": "reference", "_ref": original_id}},
                {"_key": "ar", "value": {"_type": "reference", "_ref": ar_id}}
            ]
        }
        metadata_docs.append(metadata_doc)


with open(output_file, 'w') as f:
    for doc in arabic_docs:
        f.write(json.dumps(doc, ensure_ascii=False) + '\n')
    for doc in metadata_docs:
        f.write(json.dumps(doc, ensure_ascii=False) + '\n')

print(f"Generated {len(arabic_docs)} Arabic documents and {len(metadata_docs)} metadata documents.")
