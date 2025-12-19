"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--surface-border)] bg-surface backdrop-blur-lg">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="font-bold text-xl tracking-tight">
              Sahand<span className="text-primary">.dev</span>
            </span>
            <p className="text-muted text-sm mt-2">
              © {new Date().getFullYear()} Sahand Mohammed. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-muted hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted hover:text-foreground transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-muted hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
