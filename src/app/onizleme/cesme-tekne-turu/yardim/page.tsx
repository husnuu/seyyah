import type { Metadata } from "next";
import { Clock, MapPin, Plus } from "lucide-react";
import { brand, faqGroups } from "@/content/poseidon";
import { Container } from "@/components/ui/primitives";
import { PageTransition } from "@/components/ui/PageTransition";
import { PageBanner } from "@/components/poseidon/PageBanner";

export const metadata: Metadata = { title: "Yardım merkezi" };

const slug = (s: string) =>
  s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function HelpPage() {
  return (
    <PageTransition>
      <PageBanner crumb="Yardım merkezi" title="Size nasıl yardımcı olabiliriz?" lead="Turlar, iptal ve özel tekne kiralama hakkında sık sorulan sorular." image="/images/p/koy-sandal.jpg" />
      <Container className="grid gap-12 pt-14 lg:grid-cols-[260px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Konular" className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col">
            {faqGroups.map((g) => (
              <a key={g.title} href={`#${slug(g.title)}`} className="shrink-0 rounded-xl px-4 py-3 font-semibold transition-colors hover:bg-mist">{g.title}</a>
            ))}
          </nav>
          <div className="mt-6 hidden rounded-2xl bg-mist p-5 lg:block">
            <p className="font-bold">Hâlâ sorunuz mu var?</p>
            <p className="mt-3 flex gap-2 text-sm text-ink-2"><MapPin className="size-4 shrink-0" /> {brand.address}</p>
            <p className="mt-2 flex gap-2 text-sm text-ink-2"><Clock className="size-4 shrink-0" /> {brand.hours}</p>
          </div>
        </aside>
        <div className="flex flex-col gap-14">
          {faqGroups.map((g) => (
            <section key={g.title} id={slug(g.title)} className="scroll-mt-28">
              <h2 className="text-[1.6rem] font-extrabold tracking-tight sm:text-3xl">{g.title}</h2>
              <div className="mt-5 border-t-2 border-ink">
                {g.items.map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist transition-all duration-300 group-open:rotate-45 group-open:bg-pop"><Plus className="size-4" /></span>
                    </summary>
                    <p className="max-w-2xl pb-5 text-ink-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}
