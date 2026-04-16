export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted">
            © {new Date().getFullYear()} Transportør.no — Falke Løyning AS
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <span>ISO 12100</span>
            <span>EN 619 / EN 620</span>
            <span>CEMA 300/350</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
