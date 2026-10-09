import type { Metadata } from "next";
import { rentalModes } from "@/content/poseidon";
import { Container, delay } from "@/components/ui/primitives";
import { PageTransition } from "@/components/ui/PageTransition";
import { PageBanner } from "@/components/poseidon/PageBanner";
import { YachtList } from "@/components/poseidon/YachtList";

export const metadata: Metadata = { title: "Özel tekne kiralama" };

export default function YachtsPage() {
  return (
    <PageTransition>
      <PageBanner
        crumb="Yatlar"
        title="Tekne sizin, rota sizin."
        lead="20'den fazla teknemizle saatlik, günlük ya da konaklamalı özel kiralama. Günlük fiyatlar ₺28.000'den başlar."
        image="/images/p/yelkenli.jpg"
      />
      <Container>
        <ul className="grid gap-3 py-10 sm:grid-cols-3">
          {rentalModes.map((m, i) => (
            <li key={m.key} data-reveal style={delay(i * 90)} className={`rounded-2xl p-5 ${i === 1 ? "bg-ink text-white" : "bg-mist"}`}>
              <b className="font-display text-2xl">{m.label}</b>
              <p className={`mt-1 ${i === 1 ? "text-white/70" : "text-ink-2"}`}>{m.body}</p>
            </li>
          ))}
        </ul>
        <YachtList />
        <p className="mt-10 rounded-xl bg-mist p-4 text-sm text-ink-3">
          Önizleme: listedeki tekneler temsilidir. Gerçek filo, tekne adları ve fotoğrafları işletme tarafından eklenecek.
        </p>
      </Container>
    </PageTransition>
  );
}
