import "@/styles/globals.css";
import { Providers } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advent of Code",
  description: "My Advent of Code solutions",
  openGraph: {
    title: "Advent of Code",
    description: "My Advent of Code solutions",
    images: ["/og-image.png"],
    url: "https://advent-of-code-2025-next.vercel.app",
    type: "website",
  },
  other: {
    "og:logo": "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advent of Code",
    description: "My Advent of Code solutions",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
