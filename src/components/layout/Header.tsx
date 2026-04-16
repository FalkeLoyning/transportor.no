"use client";

import Link from "next/link";
import { Cog, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <Cog className="h-7 w-7 text-accent group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-lg font-bold text-foreground">
            Transportør<span className="text-accent">.no</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Hovedmeny">
          <Link href="/belt-conveyor" className="text-sm text-foreground/70 hover:text-accent transition-colors">
            Båndtransportør
          </Link>
          <Link href="/screw-conveyor" className="text-sm text-foreground/70 hover:text-accent transition-colors">
            Skruetransportør
          </Link>
        </nav>

        <button
          className="md:hidden text-foreground/70"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <nav
        className={cn(
          "md:hidden border-t border-white/10 bg-surface",
          menuOpen ? "block" : "hidden"
        )}
        aria-label="Mobilmeny"
      >
        <div className="px-4 py-4 space-y-3">
          <Link href="/belt-conveyor" className="block text-sm text-foreground/70 hover:text-accent" onClick={() => setMenuOpen(false)}>
            Båndtransportør
          </Link>
          <Link href="/screw-conveyor" className="block text-sm text-foreground/70 hover:text-accent" onClick={() => setMenuOpen(false)}>
            Skruetransportør
          </Link>
        </div>
      </nav>
    </header>
  );
}
