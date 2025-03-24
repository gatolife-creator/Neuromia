"use client";

import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
// import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { BottomNavigation } from "../components/bottom-navigation";

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
              <motion.main
                className="flex-1 mt-16"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
              >
                {children}
                <Toaster />
                {/* <div className="container mx-auto p-6">{children}</div> */}
              </motion.main>
            </div>
          </div>
          <BottomNavigation />
        </SidebarProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
