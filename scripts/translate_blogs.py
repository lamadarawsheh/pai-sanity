import json
import os

input_file = "/Users/lamadarawsheh/PAI_sanity/data/existing-blog-posts.ndjson"
output_file = "/Users/lamadarawsheh/PAI_sanity/data/arabic-blog-posts.ndjson"

translations = {
    "Build Your First AI Tool: A Simple Text Summarizer": "قم ببناء أداتك الأولى للذكاء الاصطناعي: ملخص نصوص بسيط",
    "Getting Started with JavaScript: Core Concepts Every Developer Should Know": "البدء مع جافا سكريبت: المفاهيم الأساسية التي يجب على كل مطور معرفتها",
    "What Is Machine Learning and Why It Matters Today": "ما هو تعلم الآلة ولماذا يهم اليوم",
    "Introduction": "مقدمة",
    "How the Tool Works": "كيف تعمل الأداة",
    "The Magic Behind Summarization": "السحر وراء التلخيص",
    "Understanding the Text": "فهم النص",
    "Extracting Key Information": "استخراج المعلومات الرئيسية",
    "Generating the Summary": "توليد الملخص",
    "The Model We'll Use: BART": "النموذج الذي سنستخدمه: BART",
    "Step-by-Step Guide": "دليل خطوة بخطوة",
    "Step 1: Set Up Your Environment": "خطوة 1: إعداد البيئة الخاصة بك",
    "Step 2: Import Required Libraries": "خطوة 2: استيراد المكتبات المطلوبة",
    "Step 3: Create Your First Summary": "خطوة 3: إنشاء أول ملخص لك",
    "Sample Code Snippet": "نموذج من الكود",
    "Demo Interaction": "تفاعل تجريبي",
    "News": "الأخبار",
    "Articles": "المقالات",
    "Research Papers": "الأوراق البحثية",
    "Social Media Posts": "منشورات التواصل الاجتماعي",
    "Product Reviews": "مراجعات المنتجات",
    "Ideas for Further Development": "أفكار لمزيد من التطوير",
    "Why This Tool Is Useful": "لماذا هذه الأداة مفيدة",
    "Ready to build your next AI tool?": "جاهز لبناء أداة الذكاء الاصطناعي القادمة؟",
    "What Is a Function?": "ما هي الدالة؟",
    "Function Parameters": "بارامترات الدالة",
    "Returning Values": "إرجاع القيم",
    "Arrow Functions": "الدوال السهمية (Arrow Functions)",
    "Real-World Example": "مثال من الواقع",
    "Conclusion": "الخاتمة",
    "What Is Machine Learning?": "ما هو تعلم الآلة؟",
    "How Machine Learning Works": "كيف يعمل تعلم الآلة",
    "Types of Machine Learning": "أنواع تعلم الآلة",
    "Supervised Learning": "التعلم الخاضع للإشراف (Supervised Learning)",
    "Unsupervised Learning": "التعلم غير الخاضع للإشراف (Unsupervised Learning)",
    "Reinforcement Learning": "التعلم المعزز (Reinforcement Learning)",
    "Machine Learning in Everyday Life": "تعلم الآلة في الحياة اليومية",
    "Why Machine Learning Is Important": "لماذا تعلم الآلة مهم",
    "Final Thoughts": "أفكار أخيرة",
    "AI": "الذكاء الاصطناعي",
    "NLP": "معالجة اللغات الطبيعية",
    "Coding": "البرمجة",
    "Tools": "الأدوات",
    "Machine Learning ": "تعلم الآلة",
    "javascript": "جافا سكريبت",
    "frontend": "واجهة أمامية",
    "web-development": "تطوير الويب",
    "beginners": "مبتدئين"
}

def translate_field(text):
    if not isinstance(text, str):
        return text
    # Check for partial matches or exact matches in a simple way
    for en, ar in translations.items():
        if en.strip() == text.strip():
            return ar
        if en in text and len(text) < len(en) + 10: # Simple heuristic
             return ar
    return f"ترجمة: {text}"

def translate_portable_text(blocks):
    if not blocks:
        return blocks
    new_blocks = []
    for block in blocks:
        if block.get('_type') == 'block':
            new_block = block.copy()
            new_children = []
            for child in block.get('children', []):
                new_child = child.copy()
                if child.get('_type') == 'span':
                    new_child['text'] = translate_field(child['text'])
                new_children.append(new_child)
            new_block['children'] = new_children
            new_blocks.append(new_block)
        else:
            new_blocks.append(block)
    return new_blocks

with open(input_file, 'r') as f:
    posts = [json.loads(line) for line in f if line.strip()]

arabic_posts = []
metadata_docs = []

for post in posts:
    original_id = post['_id']
    ar_id = f"{original_id}-ar"
    
    ar_post = post.copy()
    ar_post['_id'] = ar_id
    ar_post['language'] = 'ar'
    
    if 'title' in ar_post:
        ar_post['title'] = translate_field(ar_post['title'])
    
    if 'slug' in ar_post:
        ar_post['slug']['current'] = f"{ar_post['slug']['current']}-ar"
        
    if 'excerpt' in ar_post:
        ar_post['excerpt'] = translate_field(ar_post['excerpt'])
        
    if 'content' in ar_post:
        ar_post['content'] = translate_portable_text(ar_post['content'])
        
    if 'tags' in ar_post:
        ar_post['tags'] = [translate_field(t) for t in ar_post['tags']]

    arabic_posts.append(ar_post)
    
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
    for doc in arabic_posts:
        f.write(json.dumps(doc, ensure_ascii=False) + '\n')
    for doc in metadata_docs:
        f.write(json.dumps(doc, ensure_ascii=False) + '\n')

print(f"Generated {len(arabic_posts)} Arabic blog posts and {len(metadata_docs)} metadata documents.")
