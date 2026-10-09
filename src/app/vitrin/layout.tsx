import type { Metadata } from "next";
import { FavoritesProvider } from "@/components/vitrin/Favorites";
import { DemoBar, VitrinHeader } from "@/components/vitrin/VitrinChrome";
import { VitrinFooter } from "@/components/vitrin/VitrinFooter";

export const metadata: Metadata = {
  title: { default: "Acente vitrini (önizleme)", template: "%s · Vitrin önizlemesi" },
  robots: { index: false },
};

/** Seyyah altyapısıyla çalışan örnek bir acente vitrini. Kendi başlığı ve altbilgisi var. */
export default function VitrinLayout({ children }: LayoutProps<"/vitrin">) {
  return (
    <FavoritesProvider>
      <DemoBar />
      <VitrinHeader />
      <main id="icerik" className="flex-1">
        {children}
      </main>
      <VitrinFooter />
    </FavoritesProvider>
  );
}
