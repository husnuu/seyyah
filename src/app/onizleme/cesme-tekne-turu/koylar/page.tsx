import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BASE, coves, tourMeta, tours } from "@/content/poseidon";
import { Container, delay } from "@/components/ui/primitives";
import { PageTransition } from "@/components/ui/PageTransition";
import { PageBanner } from "@/components/poseidon/PageBanner";

export const metadata: Metadata = { title: "Koylar" };

export default function CovesPage() {
  return (
    <PageTransition>
      <PageBanner crumb="Koylar" title="Turkuazın beş tonu." lead="Rota her gün hava ve rüzgâra göre kaptanın kararıyla belirlenir. En sık uğradığımız koyları tanıyın." image="/images/p/koy-kus.jpg" />
      <Container className="flex flex-col gap-24 pt-20">
        {coves.map((c, i) => {
          const visiting = tours.filter((t) => tourMeta[t.slug].coves.includes(c.name));
          const flip = i % 2 === 1;
          return (
            <section key={c.slug} id={c.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div data-reveal className={`relative ${flip ? "lg:order-2" : ""}`}>
                <div className="reveal-img relative aspect-[5/4] overflow-hidden rounded-[26px]">
                  <Image src={c.image} alt={`${c.name} (temsili fotoğraf)`} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                </div>
                <span className="font-display absolute -top-6 -left-2 text-[6rem] leading-none text-pop sm:text-[8rem]" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div data-reveal style={delay(120)}>
                <h2 className="font-display text-[2.4rem] leading-[1.05] sm:text-5xl">{c.name}</h2>
                <p className="mt-4 max-w-md text-lg text-ink-2">{c.long}</p>
                <ul className="mt-6 flex flex-wrap gap-2">{c.goodFor.map((g) => <li key={g} className="rounded-full bg-pop-soft px-3.5 py-1.5 text-sm font-semibold">{g}</li>)}</ul>
                {visiting.length > 0 && (
                  <>
                    <p className="mt-8 text-sm font-bold tracking-wide uppercase">Bu koya uğrayan turlar</p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {visiting.map((t) => (
                        <li key={t.slug}>
                          <Link href={`${BASE}/turlar/${t.slug}`} className="group flex items-center justify-between rounded-xl border-[1.5px] border-ink/10 px-4 py-3 font-semibold transition-colors hover:border-ink">
                            {t.title.split(",")[0]} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>
          );
        })}
        <p className="text-sm text-ink-3">Fotoğraflar temsilidir. Koy açıklamaları taslaktır.</p>
      </Container>
    </PageTransition>
  );
}
