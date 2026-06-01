import "./globals.css";
import type { Metadata } from "next";
import { ShopProvider } from "@/lib/context/ShopContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/ui/SearchModal";
import CookieBanner from "@/components/ui/CookieBanner";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: {
    default: "Terra & Holz — Premium Garten & Möbel",
    template: "%s | Terra & Holz",
  },
  description:
    "Handgefertigte Premium Garten- und Wohnmöbel aus nachhaltigen, FSC-zertifizierten Materialien. Zeitloses Design für dein Zuhause.",
  metadataBase: new URL("https://terra-holz.de"),
  openGraph: {
    siteName: "Terra & Holz",
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <ShopProvider>
          <ScrollProgress />
          <GrainOverlay opacity={0.02} />
          <Header />
          <main className="pt-24 min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <CookieBanner />
        </ShopProvider>
      </body>
    </html>
  );
}
