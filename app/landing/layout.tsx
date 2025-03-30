"use client";

import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
// import { ThemeProvider } from "@/components/theme-provider";

import "@/app/globals.css";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { BottomNavigation } from "@/components/bottom-navigation";

import { ClerkProvider } from "@clerk/nextjs";
import { jaJP } from "@clerk/localizations";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <head>
          <title>Neuromia</title>
        </head>
        <body>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          {/* <Header /> */}
          {children}
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
