import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

// Display face: the TEP Design System standardises on Noto Serif TC for
// all headings, taglines, quotes and the wordmark (covers CJK + Latin),
// replacing the previous Cormorant Garamond Latin face.
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "TEP | Talent. Elite. Professional.",
  description:
    "於時代轉折處，重塑金融精英的職涯路徑。TEP — 香港金融行業職業規劃求職領導品牌。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-HK"
      className={`${notoSansTC.variable} ${notoSerifTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
