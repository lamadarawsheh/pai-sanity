import BlogLayout from "@/components/BlogLayout";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend to send email
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <BlogLayout>
      {/* Header */}
      <section className="bg-gradient-to-br from-background via-background to-secondary/20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have questions, suggestions, or want to collaborate? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">Send us an email and we'll get back to you as soon as possible.</p>
              <a href="mailto:contact@practicalai.com" className="text-primary hover:text-primary/80 transition-colors font-medium">
                contact@practicalai.com
              </a>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Social Media</h3>
              <p className="text-muted-foreground mb-4">Follow us on social media for updates and community discussions.</p>
              <div className="flex gap-3">
                <a href="https://twitter.com" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Twitter
                </a>
                <span className="text-border">•</span>
                <a href="https://github.com" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  GitHub
                </a>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Response Time</h3>
              <p className="text-muted-foreground mb-4">We typically respond to all inquiries within 24-48 hours.</p>
              <p className="text-sm text-muted-foreground">Available Monday to Friday, 9 AM - 5 PM EST</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-8">Send us a Message</h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-800 font-semibold mb-2">Thank you for your message!</p>
                <p className="text-green-700">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="What is this about?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us what you think..."
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Can I use the code from your tutorials commercially?</h3>
              <p className="text-muted-foreground">
                Yes! All code examples are provided as-is for educational and commercial use. Please refer to the specific license mentioned in each tutorial.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Do I need prior AI experience?</h3>
              <p className="text-muted-foreground">
                No! Our tutorials are designed for beginners. We explain concepts clearly and provide step-by-step guides. Basic Python knowledge is helpful but not required.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Can I suggest a tutorial topic?</h3>
              <p className="text-muted-foreground">
                Absolutely! We'd love to hear your suggestions. Please use the contact form above to share your ideas, and we'll consider them for future tutorials.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">How often do you publish new tutorials?</h3>
              <p className="text-muted-foreground">
                We aim to publish new tutorials regularly. Follow us on social media or subscribe to our newsletter to stay updated on the latest content.
              </p>
            </div>
          </div>
        </div>
      </section>
    </BlogLayout>
  );
}
