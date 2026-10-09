import type { Metadata } from "next";
import { FavoritesProvider } from "@/components/vitrin/Favorites";
import { PoseidonHeader, PreviewBar } from "@/components/poseidon/Chrome";
import { PoseidonFooter } from "@/components/poseidon/Footer";

export const metadata: Metadata = {
  title: { default: "Çeşme Tekne Turu (önizleme)", template: "%s · Çeşme Poseidon (önizleme)" },
  description: "cesmetekneturu.net için Seyyah tasarım diliyle hazırlanmış önizleme.",
  robots: { index: false },
};

export default function PoseidonLayout({ children }: LayoutProps<"/onizleme/cesme-tekne-turu">) {
  return (
    <FavoritesProvider>
      <PreviewBar />
      <PoseidonHeader />
      <main id="icerik" className="flex-1">
        {children}
      </main>
      <PoseidonFooter />
    </FavoritesProvider>
  );
}
