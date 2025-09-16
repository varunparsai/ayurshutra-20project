export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-20 md:flex-row">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AyurSutra · Panchakarma care,
          modernized.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            Home
          </a>
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
        </div>
      </div>
    </footer>
  );
}
