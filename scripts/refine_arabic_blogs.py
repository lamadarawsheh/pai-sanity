import json

input_file = "/Users/lamadarawsheh/PAI_sanity/data/existing-blog-posts.ndjson"
output_file = "/Users/lamadarawsheh/PAI_sanity/data/arabic-blog-posts.ndjson"

# New high-quality translations provided by the user
summarizer_content = [
    {"style": "h2", "text": "المقدمة"},
    {"style": "normal", "text": "تخيل أنك تبحث في موضوع ما وتصادف مقالًا طويلًا، لكن لديك فقط بضع دقائق لفهم أهم الأفكار. هنا يأتي دور ملخص النصوص المعتمد على الذكاء الاصطناعي، والذي يتيح لك الحصول على خلاصة واضحة دون الحاجة لقراءة النص كاملًا."},
    {"style": "normal", "text": "تساعد أدوات تلخيص النصوص الباحثين والطلاب وصناع المحتوى على معالجة كميات كبيرة من النصوص بسرعة وكفاءة، مما يوفر الوقت ويزيد الإنتاجية."},
    {"style": "h2", "text": "كيف تعمل أداة التلخيص"},
    {"style": "normal", "text": "تعتمد عملية التلخيص على التلخيص التجريدي، حيث يقوم الذكاء الاصطناعي بفهم المعنى العام للنص ثم إنشاء ملخص جديد يعكس أهم الأفكار."},
    {"style": "normal", "text": "تمر العملية بثلاث مراحل أساسية:"},
    {"style": "normal", "text": "فهم النص وتحليل محتواه", "listItem": "number", "level": 1},
    {"style": "normal", "text": "تحديد الأفكار والمعلومات الأهم", "listItem": "number", "level": 1},
    {"style": "normal", "text": "توليد ملخص مختصر بجمل جديدة", "listItem": "number", "level": 1},
    {"style": "h2", "text": "النموذج المستخدم"},
    {"style": "normal", "text": "يتم الاعتماد على نموذج جاهز ومتطور قادر على تلخيص النصوص بدقة، بعد أن تم تدريبه على عدد ضخم من البيانات النصية."},
    {"style": "h2", "text": "استخدامات الأداة"},
    {"style": "normal", "text": "تلخيص المقالات الإخبارية", "listItem": "bullet", "level": 1},
    {"style": "normal", "text": "استخلاص نتائج الأبحاث العلمية", "listItem": "bullet", "level": 1},
    {"style": "normal", "text": "فهم منشورات التواصل الاجتماعي الطويلة", "listItem": "bullet", "level": 1},
    {"style": "normal", "text": "تلخيص تقييمات المنتجات", "listItem": "bullet", "level": 1},
    {"style": "h2", "text": "أفكار للتطوير"},
    {"style": "normal", "text": "تشمل تطوير واجهة استخدام، دعم لغات متعددة، التحكم بطول الملخص، ومعالجة عدة مستندات دفعة واحدة."},
    {"style": "h2", "text": "أهمية الأداة"},
    {"style": "normal", "text": "توفر الوقت، تحسن الفهم، وتزيد الإنتاجية، كما أنها سهلة الاستخدام ولا تتطلب خبرة متقدمة بالذكاء الاصطناعي."},
]

ml_content = [
    {"style": "h2", "text": "مقدمة"},
    {"style": "normal", "text": "تعلم الآلة هو أحد أهم فروع الذكاء الاصطناعي، ويهدف إلى تمكين الحواسيب من التعلم من البيانات وتحسين أدائها دون تدخل بشري مباشر."},
    {"style": "h2", "text": "آلية عمل تعلم الآلة"},
    {"style": "normal", "text": "يتم تدريب نماذج تعلم الآلة باستخدام البيانات، حيث تتعلم الأنماط والعلاقات، ثم تستخدم هذه المعرفة لاتخاذ قرارات أو تنبؤات عند التعامل مع بيانات جديدة."},
    {"style": "h2", "text": "أنواع تعلم الآلة"},
    {"style": "normal", "text": "التعلم الخاضع للإشراف", "listItem": "bullet", "level": 1},
    {"style": "normal", "text": "التعلم غير الخاضع للإشراف", "listItem": "bullet", "level": 1},
    {"style": "normal", "text": "التعلم المعزز", "listItem": "bullet", "level": 1},
    {"style": "h2", "text": "تعلم الآلة في حياتنا اليومية"},
    {"style": "normal", "text": "يُستخدم في أنظمة التوصية، المساعدات الصوتية، كشف الاحتيال، التعرف على الصور، ومحركات البحث الذكية."},
    {"style": "h2", "text": "أهمية تعلم الآلة"},
    {"style": "normal", "text": "يساعد المؤسسات على أتمتة العمليات، تحسين اتخاذ القرار، واكتشاف رؤى جديدة من البيانات."},
    {"style": "h2", "text": "الخلاصة"},
    {"style": "normal", "text": "تعلم الآلة هو تقنية محورية تشكل مستقبل البرمجيات، وفهمها يعد خطوة أساسية لبناء تطبيقات ذكية."},
]

js_content = [
    {"style": "h2", "text": "مقدمة"},
    {"style": "normal", "text": "تُعد الدوال من الركائز الأساسية في لغة JavaScript، حيث تساعد على تنظيم الكود وكتابته بشكل قابل لإعادة الاستخدام."},
    {"style": "h2", "text": "ما هي الدالة؟"},
    {"style": "normal", "text": "الدالة هي مجموعة من التعليمات تنفذ مهمة محددة، ويتم تشغيلها فقط عند استدعائها."},
    {"style": "h2", "text": "معاملات الدوال"},
    {"style": "normal", "text": "تسمح بتمرير قيم متغيرة للدالة لمعالجتها."},
    {"style": "h2", "text": "إرجاع القيم"},
    {"style": "normal", "text": "يمكن للدوال إرجاع نتائج لاستخدامها في أجزاء أخرى من البرنامج."},
    {"style": "h2", "text": "أخطاء شائعة"},
    {"style": "normal", "text": "نسيان إرجاع قيمة", "listItem": "bullet", "level": 1},
    {"style": "normal", "text": "اختيار أسماء غير واضحة للدوال", "listItem": "bullet", "level": 1},
    {"style": "normal", "text": "كتابة دوال طويلة ومعقدة", "listItem": "bullet", "level": 1},
    {"style": "h2", "text": "الدوال السهمية"},
    {"style": "normal", "text": "توفر طريقة مختصرة لكتابة الدوال وتُستخدم بكثرة في JavaScript الحديثة."},
    {"style": "h2", "text": "مثال عملي"},
    {"style": "normal", "text": "تُستخدم الدوال للتحقق من صحة مدخلات المستخدم وتنظيم منطق التطبيق."},
    {"style": "h2", "text": "الخاتمة"},
    {"style": "normal", "text": "إتقان الدوال يساعد على كتابة كود أنظف وأسهل في الصيانة، ويصبح ضروريًا مع توسع المشاريع."},
]

quality_map = {
    "05248b57-42b9-4955-81a2-72a3d5e668e0": {
        "title": "قم ببناء أداتك الأولى للذكاء الاصطناعي: ملخص نصوص بسيط",
        "content": summarizer_content
    },
    "789fd9be-5c7c-413a-b4d0-e8e43d857c55": {
        "title": "ما هو تعلم الآلة؟",
        "content": ml_content
    },
    "7796ba3d-3fa0-48d9-bcd2-f651b65cf843": {
        "title": "فهم الدوال في JavaScript",
        "content": js_content
    }
}

def create_block(text, style="normal", listItem=None, level=None):
    block = {
        "_type": "block",
        "children": [{"_type": "span", "marks": [], "text": text}],
        "markDefs": [],
        "style": style
    }
    if listItem:
        block["listItem"] = listItem
    if level:
        block["level"] = level
    return block

with open(input_file, 'r') as f:
    posts = [json.loads(line) for line in f if line.strip()]

arabic_posts = []
metadata_docs = []

for post in posts:
    orig_id = post['_id']
    if orig_id not in quality_map:
        continue
        
    translation_info = quality_map[orig_id]
    ar_id = f"{orig_id}-ar"
    
    ar_post = post.copy()
    ar_post['_id'] = ar_id
    ar_post['language'] = 'ar'
    ar_post['title'] = translation_info['title']
    ar_id_slug = ar_post['slug']['current'] + "-ar"
    ar_post['slug'] = {"_type": "slug", "current": ar_id_slug}
    
    # Merge existing code blocks with new text content
    original_code_blocks = [b for b in post['content'] if b.get('_type') == 'code']
    new_content = []
    
    # This is a bit simplified - we'll add text blocks and then code blocks at the end or intersperse
    # For better UX, let's intersperse if possible, but the user said "leave the code"
    # I will put headers/text as defined, and append original code blocks where they might fit or just at the end.
    # Actually, a better way is to keep the original content structure but replace text blocks
    # and keep code blocks as they are.
    
    ptr_code = 0
    for item in translation_info['content']:
        new_content.append(create_block(item['text'], item['style'], item.get('listItem'), item.get('level')))
        # If the original post had a code block around here, add it.
        # This is hard to automate perfectly, so I'll just append all code blocks at appropriate places
        # based on the original post's order if I could, but I'll fallback to appending them after logical sections.
    
    # For the JS post, we definitely need the code blocks near "ما هي الدالة" etc.
    # I'll manually intersperse for these 3 posts.
    
    refined_content = []
    if orig_id == "7796ba3d-3fa0-48d9-bcd2-f651b65cf843": # JS
        # Interspersing for JS functions
        refined_content.append(new_content[0]) # مقدمة
        refined_content.append(new_content[1])
        refined_content.append(new_content[2]) # ما هي الدالة
        refined_content.append(new_content[3])
        refined_content.append(original_code_blocks[0]) # greet function
        refined_content.append(new_content[4]) # معاملات الدوال
        refined_content.append(new_content[5])
        refined_content.append(original_code_blocks[1]) # greetUser
        refined_content.append(new_content[6]) # إرجاع القيم
        refined_content.append(new_content[7])
        refined_content.append(original_code_blocks[2]) # add function
        refined_content.append(new_content[8]) # أخطاء شائعة
        refined_content.append(new_content[9])
        refined_content.append(new_content[10])
        refined_content.append(new_content[11])
        refined_content.append(new_content[12]) # الدوال السهمية
        refined_content.append(new_content[13])
        refined_content.append(original_code_blocks[3]) # multiply arrow
        refined_content.append(original_code_blocks[4]) # multiply short
        refined_content.append(new_content[14]) # مثال عملي
        refined_content.append(new_content[15])
        refined_content.append(original_code_blocks[5]) # isEmailValid
        refined_content.append(new_content[16]) # الخاتمة
        refined_content.append(new_content[17])
    elif orig_id == "05248b57-42b9-4955-81a2-72a3d5e668e0": # Summarizer
        # Just appending the original code block for summarizer
        refined_content = new_content[:11] # Up to Step 2
        refined_content.append(original_code_blocks[0]) # pip install
        refined_content.append(new_content[11:]) # the rest
        # Add other code blocks at the end or where appropriate
        refined_content.insert(13, original_code_blocks[1]) # transformer import
        refined_content.insert(16, original_code_blocks[2]) # summary example
        refined_content.insert(18, original_code_blocks[3]) # complete script
    else: # ML (Doesn't usually have code in the sample but let's check)
        refined_content = new_content + original_code_blocks

    ar_post['content'] = refined_content
    arabic_posts.append(ar_post)
    
    metadata_doc = {
        "_id": f"translation.metadata.{orig_id}",
        "_type": "translation.metadata",
        "translations": [
            {"_key": "en", "value": {"_type": "reference", "_ref": orig_id}},
            {"_key": "ar", "value": {"_type": "reference", "_ref": ar_id}}
        ]
    }
    metadata_docs.append(metadata_doc)

with open(output_file, 'w') as f:
    for doc in arabic_posts:
        f.write(json.dumps(doc, ensure_ascii=False) + '\n')
    for doc in metadata_docs:
        f.write(json.dumps(doc, ensure_ascii=False) + '\n')

print(f"Generated {len(arabic_posts)} refined Arabic blog posts.")
