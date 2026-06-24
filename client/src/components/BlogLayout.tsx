import BlogFooter from "./BlogFooter";
import BlogHeader from "./BlogHeader";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <BlogHeader />
      <main className="flex-grow">{children}</main>
      <BlogFooter />
    </div>
  );
}
