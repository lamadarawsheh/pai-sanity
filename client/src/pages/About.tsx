import BlogLayout from "@/components/BlogLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <BlogLayout>
      {/* Header */}
      <section className="bg-gradient-to-br from-background via-background to-secondary/20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Practical AI</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Learn about our mission to make artificial intelligence accessible to everyone through practical, hands-on projects.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-sm md:prose-base max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Practical AI is an educational platform dedicated to making artificial intelligence accessible to everyone. We believe that learning AI shouldn't require advanced degrees or years of experience. Instead, we focus on teaching practical, hands-on projects that solve real problems.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">What We Offer</h2>
            <p className="text-muted-foreground mb-4">
              Our blog features step-by-step tutorials on building AI-powered tools. Each post includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-8">
              <li>Clear explanations of how the tool works</li>
              <li>Visual diagrams showing the architecture</li>
              <li>Ready-to-use code examples and snippets</li>
              <li>Step-by-step implementation guides</li>
              <li>Real-world examples and use cases</li>
              <li>Ideas for expanding and improving the projects</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">Why Practical AI?</h2>
            <p className="text-muted-foreground mb-4">
              We believe in learning by doing. Rather than drowning you in theory, we show you how to build actual AI tools that you can use and modify. Our tutorials are designed for beginners but include advanced concepts for those who want to dive deeper.
            </p>
            <p className="text-muted-foreground mb-8">
              Whether you're a student, a developer looking to expand your skills, or someone curious about AI, you'll find practical projects that you can start working on today.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">Our Topics</h2>
            <p className="text-muted-foreground mb-4">
              We cover a wide range of AI and machine learning topics, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-8">
              <li><strong>Natural Language Processing (NLP):</strong> Text summarizers, sentiment analyzers, chatbots, and more</li>
              <li><strong>Computer Vision:</strong> Image classification, object detection, and image processing</li>
              <li><strong>Machine Learning:</strong> Recommendation systems, prediction models, and data analysis</li>
              <li><strong>Tools & Resources:</strong> Libraries, frameworks, and best practices for AI development</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-6 mt-12">Getting Started</h2>
            <p className="text-muted-foreground mb-8">
              Ready to build your first AI tool? Head over to our blog and start with any tutorial that interests you. Each post is self-contained and includes everything you need to get started. No prior AI experience required!
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Learning?</h3>
            <p className="text-muted-foreground mb-6">
              Explore our collection of practical AI tutorials and start building your first AI-powered tool today.
            </p>
            <Link href="/blog">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explore Tutorials
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </BlogLayout>
  );
}
