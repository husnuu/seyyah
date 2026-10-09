import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { ApplicationProvider } from "@/components/application/ApplicationProvider";
import { RevealObserver } from "@/components/ui/RevealObserver";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT", "WONK"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Seyyah — B2B Turizm Satış ve Dağıtım Platformu",
    template: "%s · Seyyah",
  },
  description:
    "Seyahat acenteleri ve turizm tedarikçileri için B2B pazaryeri, rezervasyon yönetimi ve dağıtım altyapısı. Turizm ürünlerini keşfedin, ürünlerinizi acentelerin satışına açın.",
  keywords: ["B2B turizm", "acente platformu", "turizm pazaryeri", "tur operatörü yazılımı", "rezervasyon yönetimi", "tedarikçi"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Seyyah",
    title: "Seyyah — Turizmin Tüm Bağlantıları. Tek Platformda.",
    description: "Seyahat acenteleri ve turizm tedarikçileri için B2B satış, rezervasyon ve dağıtım platformu.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#48ebc3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${jakarta.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        {/* Scroll-reveal yalnızca JS varken içerik gizler */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#icerik"
          className="sr-only z-50 rounded-lg bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          İçeriğe geç
        </a>
        <ApplicationProvider>
          {children}
        </ApplicationProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
