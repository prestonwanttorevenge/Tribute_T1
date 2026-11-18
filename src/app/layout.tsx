import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Be_Vietnam_Pro,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "T1 // Lịch Sử Vương Triều Đỏ (2003 – 2026)",
  description:
    "Scrollytelling điện ảnh kể về lịch sử vương triều đỏ T1 từ căn phòng nhỏ Seoul 2003 đến khúc vĩ thanh New York 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${beVietnam.variable} ${jakarta.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#070709] text-[#F2EFE9] antialiased selection:bg-[#E4002B] selection:text-white overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
