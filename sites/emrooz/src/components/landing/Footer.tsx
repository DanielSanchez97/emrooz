export default function Footer() {
  return (
    <footer className="relative py-12 text-center">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <p className="font-display text-lg text-gold/30 mb-1">emrooz</p>
      <p className="font-display text-cream-muted/20 mb-4" dir="rtl">امروز</p>
      <p className="text-cream-muted/20 text-sm">&copy; {new Date().getFullYear()}</p>
    </footer>
  );
}
