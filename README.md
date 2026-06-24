# Practical AI Blog

A modern, educational blog platform built with React, TypeScript, Tailwind CSS, DaisyUI, and Zustand. Learn how to build practical AI tools step by step with clear explanations, code examples, and interactive demos.

## 🎯 Project Overview

**Practical AI** is an educational blog that focuses on showing how artificial intelligence can be used to build small, useful, hands-on projects. Each post explains step-by-step how to create a simple AI-powered tool in a practical and beginner-friendly way.

### Key Features

- **📚 Educational Content:** Step-by-step tutorials on building AI tools
- **🎨 Modern UI:** Clean, responsive design with DaisyUI and Tailwind CSS
- **🔍 Search & Filter:** Find posts by category, tags, or search query
- **📱 Mobile Responsive:** Works perfectly on all devices
- **⚡ Fast Performance:** Optimized for speed and user experience
- **🎯 CMS Integration:** Powered by Sanity.io for easy content management
- **🌙 Dark Mode Ready:** Theme support built-in
- **📊 State Management:** Zustand for global state management

## 🚀 Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS 4 + DaisyUI
- **Build Tool:** Vite
- **State Management:** Zustand
- **CMS:** Sanity.io (Headless CMS)
- **Backend:** Express.js with tRPC
- **Database:** MySQL/TiDB with Drizzle ORM
- **Testing:** Vitest

## 📁 Project Structure

```
practical-ai-blog/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── BlogCard.tsx         # Blog post card component
│   │   │   ├── BlogHeader.tsx       # Navigation header
│   │   │   ├── BlogFooter.tsx       # Footer component
│   │   │   └── BlogLayout.tsx       # Main layout wrapper
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.tsx             # Landing page
│   │   │   ├── BlogList.tsx         # Blog listing page
│   │   │   ├── BlogPost.tsx         # Individual post page
│   │   │   ├── About.tsx            # About page
│   │   │   └── Contact.tsx          # Contact page
│   │   ├── store/                   # Zustand stores
│   │   │   └── blogStore.ts         # Blog state management
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useBlog.ts           # Blog store hook
│   │   ├── lib/                     # Utility functions
│   │   │   └── sanity.ts            # Sanity.io client
│   │   ├── App.tsx                  # Main app component
│   │   ├── index.css                # Global styles
│   │   └── main.tsx                 # Entry point
│   └── public/                      # Static assets
├── server/                          # Backend application
│   ├── routers.ts                   # tRPC procedures
│   ├── db.ts                        # Database helpers
│   └── _core/                       # Core framework code
├── drizzle/                         # Database schema
│   └── schema.ts                    # Table definitions
├── shared/                          # Shared types and constants
├── CONTENT_STRUCTURE.md             # Blog content guidelines
├── CMS_SETUP.md                     # Sanity.io setup guide
├── tailwind.config.ts               # Tailwind configuration
├── vite.config.ts                   # Vite configuration
└── package.json                     # Project dependencies
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- A Sanity.io account (free tier available)

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```bash
   # Sanity.io CMS
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_VERSION=2024-11-24
   
   # Database (if using backend features)
   DATABASE_URL=mysql://user:password@host/database
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📝 Content Structure

Each blog post follows a consistent structure:

1. **Introduction** - Hook readers and explain what they'll learn
2. **How the Tool Works** - Visual explanation with diagrams
3. **Step-by-Step Guide** - Detailed implementation steps
4. **Sample Code Snippet** - Ready-to-use code examples
5. **Demo/Example Output** - Real-world examples
6. **Ideas for Further Development** - Expansion suggestions
7. **Why This Tool Is Useful** - Real-world applications

See [CONTENT_STRUCTURE.md](./CONTENT_STRUCTURE.md) for detailed guidelines.

## 🎨 Customization

### Colors & Theme

The blog uses a custom color scheme (deep blue and purple). Modify colors in `client/src/index.css`:

```css
:root {
  --primary: oklch(0.55 0.2 260);
  --accent: oklch(0.65 0.2 280);
  /* ... more colors ... */
}
```

### Logo & Branding

Update the logo in `client/src/const.ts`:

```typescript
export const APP_LOGO = "/your-logo.svg";
export const APP_TITLE = "Practical AI";
```

## 🔌 CMS Integration (Sanity.io)

The blog is fully integrated with Sanity.io for content management. See [CMS_SETUP.md](./CMS_SETUP.md) for detailed setup instructions.

### Key Sanity Functions

```typescript
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getFeaturedBlogPosts,
  getBlogPostsByCategory,
  searchBlogPosts,
  urlFor
} from "@/lib/sanity";

// Fetch all posts
const posts = await getAllBlogPosts();

// Get a single post
const post = await getBlogPostBySlug("my-post-slug");

// Get featured posts
const featured = await getFeaturedBlogPosts();
```

## 🎯 State Management (Zustand)

The blog uses Zustand for global state management:

```typescript
import { useBlog } from "@/hooks/useBlog";

function MyComponent() {
  const {
    posts,
    selectedCategory,
    searchQuery,
    filteredPosts,
    setSelectedCategory,
    setSearchQuery,
    toggleBookmark,
    isPostBookmarked
  } = useBlog();

  // Use state and actions
}
```

## 🧪 Testing

Run tests with Vitest:

```bash
pnpm test
```

Write tests in `*.test.ts` files alongside your code.

## 📦 Building for Production

Build the project:

```bash
pnpm build
```

This creates optimized production builds in the `dist/` directory.

## 🚀 Deployment

The blog can be deployed to any Node.js hosting platform:

1. **Set environment variables** on your hosting platform
2. **Build the project:** `pnpm build`
3. **Start the server:** `pnpm start`

Recommended platforms:
- Vercel (serverless)
- Netlify (static + serverless)
- Railway (full-stack)
- Heroku (traditional)

## 📚 Blog Post Examples

The blog includes sample posts about:

- **Text Summarizer** - Build an AI tool to summarize long texts
- **Sentiment Analyzer** - Analyze emotions in text
- **Image Classifier** - Identify objects in images
- **Chatbot** - Create a conversational AI assistant
- **Recommendation System** - Suggest content to users

See [CONTENT_STRUCTURE.md](./CONTENT_STRUCTURE.md) for detailed examples.

## 🤝 Contributing

To add new blog posts:

1. Create a new document in Sanity.io
2. Fill in all required fields
3. Publish the post
4. It will automatically appear on the blog

## 📖 Documentation

- [Content Structure Guide](./CONTENT_STRUCTURE.md) - How to write blog posts
- [CMS Setup Guide](./CMS_SETUP.md) - How to set up Sanity.io
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [DaisyUI Docs](https://daisyui.com/docs/install/)
- [Sanity.io Docs](https://www.sanity.io/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)

## 🐛 Troubleshooting

### Posts not showing up?
- Check Sanity.io credentials in `.env.local`
- Ensure posts are published in Sanity
- Check browser console for API errors

### Images not loading?
- Verify image URLs in Sanity
- Check CORS settings in Sanity project
- Ensure images are published

### Styling issues?
- Clear browser cache
- Rebuild Tailwind CSS: `pnpm build`
- Check color values in `index.css`

## 📄 License

This project is open source and available under the MIT License.

## 🙋 Support

For help and questions:

1. Check the documentation files
2. Review the code comments
3. Visit [Sanity.io community](https://www.sanity.io/community)
4. Check [Tailwind CSS docs](https://tailwindcss.com/docs)

## 🎓 Learning Resources

- [AI for Beginners](https://microsoft.github.io/AI-For-Beginners/)
- [Hugging Face Transformers](https://huggingface.co/transformers/)
- [TensorFlow Tutorials](https://www.tensorflow.org/tutorials)
- [PyTorch Documentation](https://pytorch.org/docs/stable/index.html)

---

**Built with ❤️ for AI enthusiasts and learners**
