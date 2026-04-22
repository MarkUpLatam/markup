"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation, siteConfig } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-obsidian/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl text-bone hover:text-gold transition-colors"
        >
          {siteConfig.name}
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-gray-400 hover:text-bone transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${siteConfig.email}`}
          className="hidden md:inline-flex items-center justify-center h-8 px-4 rounded-lg bg-gold text-obsidian text-sm font-medium hover:bg-gold-soft transition-colors"
        >
          Contactar
        </a>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden text-bone p-1 -mr-1"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-obsidian border-t border-white/10 px-6 py-5 flex flex-col gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-400 hover:text-bone transition-colors py-2"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 inline-flex items-center justify-center w-full h-10 rounded-lg bg-gold text-obsidian text-sm font-medium hover:bg-gold-soft transition-colors"
          >
            Contactar
          </a>
        </div>
      )}
    </header>
  );
}
