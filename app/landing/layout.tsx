"use client";

import type React from "react";
// import { ThemeProvider } from "@/components/theme-provider";

import "@/app/globals.css";

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
