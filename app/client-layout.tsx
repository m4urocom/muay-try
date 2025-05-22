'use client'

import { Navbar } from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import GodLight from "./components/ui/GodLight";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/login" && pathname !== "/signup" && <GodLight />}
      {pathname !== "/login" && pathname !== "/signup" && pathname !== "/" && <Navbar />}
      {children}
      {pathname === "/" && (
        <div className="fixed bottom-0 left-0 w-full flex flex-col items-center justify-center pb-4 z-50 pointer-events-none">
          <div className="flex gap-6 rounded-xl px-6 py-3 pointer-events-auto">
            <Button variant="ghost" size="icon" asChild className="bg-sky-900 hover:bg-primary/10" aria-label="Instagram">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram color="var(--primary)" size={28} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="bg-sky-900 hover:bg-primary/10" aria-label="Facebook">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook color="var(--primary)" size={28} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="bg-sky-900 hover:bg-primary/10" aria-label="YouTube">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube color="var(--primary)" size={28} />
              </a>
            </Button>
          </div>
          <div className="pointer-events-auto mt-2 text-gray-400 text-sm">MuayTry 2025</div>
        </div>
      )}
    </>
  );
} 