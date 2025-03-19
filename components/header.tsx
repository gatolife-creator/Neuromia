import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">My App</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <Button variant="default" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
