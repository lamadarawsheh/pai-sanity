import { APP_TITLE } from "@/const";
import { Github, Linkedin, Mail, Twitter, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function BlogFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { id: "quick-home", label: "Home", href: "/" },
        { id: "quick-blog", label: "Blog", href: "/blog" },
        { id: "quick-about", label: "About", href: "/about" },
        { id: "quick-contact", label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Categories",
      links: [
        { id: "cat-nlp", label: "NLP", href: "/blog" },
        { id: "cat-cv", label: "Computer Vision", href: "/blog" },
        { id: "cat-ml", label: "Machine Learning", href: "/blog" },
        { id: "cat-tools", label: "Tools & Resources", href: "/blog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { id: "res-docs", label: "Documentation", href: "#" },
        { id: "res-code", label: "Code Examples", href: "#" },
        { id: "res-community", label: "Community", href: "#" },
        { id: "res-faq", label: "FAQ", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@practicalai.com", label: "Email" },
  ];

  return (
    <footer className="bg-background border-t border-border/40 mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-border/40 bg-gradient-to-r from-primary/5 via-blue-500/5 to-cyan-500/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">Get the latest AI tutorials and project ideas delivered to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-card border border-border/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{APP_TITLE}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Learn how to build practical AI tools. From text summarizers to image classifiers, we make AI accessible to everyone.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`}>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {currentYear} {APP_TITLE}. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-primary transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
