import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
// import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full">
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <SidebarProvider>
          <div className="flex min-h-screen flex-col w-full">
            <Header />
            <div className="flex flex-1">
              <AppSidebar />
              <main className="flex-1">
                <div className="container mx-auto p-6">{children}</div>
              </main>
            </div>
          </div>
        </SidebarProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
