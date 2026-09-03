import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prism - AI research-paper claim-auditing tool",
  description: "The only tool that tells you what a paper doesn't prove.",
  metadataBase: new URL("https://prism-ai-reactui.nicesky-c6f0b846.centralindia.azurecontainerapps.io/"),
  openGraph: {
    title: "Prism",
    description: "The only tool that tells you what a paper doesn't prove.",
    url: "https://prism-ai-reactui.nicesky-c6f0b846.centralindia.azurecontainerapps.io/",
    siteName: "Prism",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism",
    description: "The only tool that tells you what a paper doesn't prove.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${jetBrainsMono.variable} font-sans antialiased bg-background text-foreground selection:bg-brand selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
