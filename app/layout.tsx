import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paid Display Monthly Performance",
  description: "Monthly Paid Display report generator for Wise teams.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
