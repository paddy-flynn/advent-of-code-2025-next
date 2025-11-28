import "@/styles/globals.css";
import { Providers } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "rPX65SlZwkK_ky9whIIG1Fvn1MzLukZ1wc5Cqyu2TmY",
  },
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
