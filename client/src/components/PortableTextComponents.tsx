import React from 'react';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import { themes } from 'prism-react-renderer';

export const components = {
  // Custom components for different types of blocks
  types: {
    // Code blocks with syntax highlighting
    code: ({ value }: { value: { code: string; language?: string } }) => {
      const { code, language } = value;
      return (
        <div className="my-4 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language={language || 'javascript'}
            style={themes.vsDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.9rem',
              lineHeight: '1.5',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },
    // Image component
    image: ({ value }: { value: { asset: { url: string }; alt?: string } }) => (
      <div className="my-6">
        <img 
          src={value.asset.url} 
          alt={value.alt || ''} 
          className="mx-auto rounded-lg max-w-full h-auto"
        />
        {value.alt && (
          <p className="text-center text-sm text-gray-500 mt-2">{value.alt}</p>
        )}
      </div>
    ),
  },
  
  // Custom styles for marks (bold, italic, etc.)
  marks: {
    // Links
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel}
          className="text-blue-500 hover:underline"
          target={rel ? '_blank' : undefined}
        >
          {children}
        </a>
      );
    },
    // Bold
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    // Italic
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    // Code
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  
  // Block styles
  block: {
    // Headings
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-bold my-5">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-bold my-4">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-bold my-3">{children}</h4>
    ),
    // Blockquote
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    // Normal text
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="my-4">{children}</p>
    ),
  },
  
  // List styles
  list: {
    // Bulleted lists
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc pl-5 my-2 space-y-1">{children}</ul>
    ),
    // Numbered lists
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal pl-5 my-2 space-y-1">{children}</ol>
    ),
  },
  
  // List item styles
  listItem: {
    // Apply to both bullet and number list items
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="my-1">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="my-1">{children}</li>
    ),
  },
};
