import { APP_TITLE } from "@/const";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm">
      <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity duration-200">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-bold text-foreground leading-tight">{APP_TITLE}</h1>
            <p className="text-xs text-muted-foreground">Learn by Building</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 lg:px-4 py-2 text-foreground hover:bg-secondary/60 rounded-lg transition-colors duration-200 font-medium text-sm lg:text-base"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/blog"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm"
          >
            Explore
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-secondary/60 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md animate-in fade-in duration-200">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-foreground hover:bg-secondary/60 rounded-lg transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/blog"
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-600 text-white font-semibold text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
