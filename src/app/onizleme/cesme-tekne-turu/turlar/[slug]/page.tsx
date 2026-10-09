import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, Check, ChevronRight, Clock, ExternalLink, Info, Languages, MapPin, Smartphone, Truck, X, Zap } from "lucide-react";
import { BASE, classes, coves, tourMeta, tours, tlp } from "@/content/poseidon";
import { fromPrice } from "@/content/vitrin";
import { PageTransition } from "@/components/ui/PageTransition";
import { SailBullet } from "@/components/ui/Glyphs";
import { BookingWidget } from "@/components/vitrin/BookingWidget";
import { Carousel } from "@/components/vitrin/Carousel";
import { HeartButton } from "@/components/vitrin/Favorites";
import { ProductCard } from "@/components/vitrin/ProductCard";
import { ProductGallery } from "@/components/vitrin/ProductGallery";
import { ProductTopBar, ShareButton } from "@/components/vitrin/ProductTopBar";
import { ReadMore } from "@/components/vitrin/ReadMore";
import { StickyTabs } from "@/components/vitrin/StickyTabs";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/onizleme/cesme-tekne-turu/turlar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = tours.find((x) => x.slug === slug);
  return t ? { title: t.title, description: t.summary } : {};
}

const H2 = ({ children }: { children: string }) => <h2 className="text-[1.6rem] font-extrabold tracking-tight sm:text-3xl">{children}</h2>;

export default async function TourPage({ params }: PageProps<"/onizleme/cesme-tekne-turu/turlar/[slug]">) {
  const { slug } = await params;
  const p = tours.find((x) => x.slug === slug);
  if (!p) notFound();
  const meta = tourMeta[p.slug];
  const stops = coves.filter((c) => meta.coves.includes(c.name));
  const others = tours.filter((t) => t.slug !== p.slug);

  const tabs = [
    { id: "hizli-bilgi", label: "Hızlı bilgi" },
    ...(p.itinerary ? [{ id: "program", label: "Program" }] : []),
    { id: "ne-beklemeli", label: "Ne beklemeli" },
    { id: "siniflar", label: "Bilet sınıfları" },
    { id: "bulusma", label: "Buluşma noktası" },
    { id: "iptal", label: "İptal koşulları" },
  ];
  const quick = [
    { Icon: Clock, label: "Süre", value: p.duration },
    { Icon: MapPin, label: "Kalkış", value: meta.departure },
    { Icon: Languages, label: "Diller", value: p.languages.join(", ") },
    p.pickup ? { Icon: Truck, label: "Ulaşım", value: "Transfer dahil" } : { Icon: Smartphone, label: "Bilet", value: "Mobil bilet" },
  ];

  return (
    <PageTransition>
      <ProductTopBar title={p.title} image={p.image} price={tlp(fromPrice(p))} watchId="tur-baslik" />
      <div className="pb-20 lg:pb-0">
        <section className="mx-auto max-w-[1240px] px-5 pt-5">
          <div className="relative h-[300px] overflow-hidden rounded-[24px] sm:h-[420px] lg:h-[480px]">
            <ProductGallery images={p.gallery} title={p.title} />
            <HeartButton id={p.slug} title={p.title} className="absolute top-5 right-5 size-12" />
          </div>
        </section>

        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 pt-8 lg:grid-cols-[1fr_390px] lg:gap-14">
          <article className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <nav aria-label="Konum" className="flex items-center gap-1 text-sm text-ink-3">
                <Link href={BASE} className="underline underline-offset-2 hover:text-ink">Ana sayfa</Link>
                <ChevronRight className="size-3.5" />
                <Link href={`${BASE}/turlar`} className="underline underline-offset-2 hover:text-ink">Turlar</Link>
              </nav>
              <ShareButton title={p.title} />
            </div>
            <h1 id="tur-baslik" className="mt-5 text-[2rem] leading-[1.12] font-extrabold tracking-tight sm:text-[2.7rem]">{p.title}</h1>
            <p className="mt-3 text-lg text-ink-2">{p.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 rounded-xl bg-mist px-3.5 py-2 text-[15px] font-semibold"><Zap className="size-4" /> Anında onay</span>
              <span className="flex items-center gap-1.5 rounded-xl bg-pop-soft px-3.5 py-2 text-[15px] font-semibold text-pop-deep"><CalendarCheck className="size-4" /> 24 saate kadar ücretsiz iptal</span>
              {p.chips.map((c) => <span key={c} className="rounded-xl bg-mist px-3.5 py-2 text-[15px] font-medium">{c}</span>)}
            </div>

            <div className="mt-10"><StickyTabs tabs={tabs} topClass="top-16" /></div>

            <section id="hizli-bilgi" className="scroll-mt-36 pt-10">
              <H2>Hızlı bilgi</H2>
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                {quick.map(({ Icon, label, value }) => (
                  <div key={label} className="bg-white p-4"><Icon className="size-5" /><dt className="mt-3 text-sm text-ink-3">{label}</dt><dd className="font-semibold">{value}</dd></div>
                ))}
              </dl>
              <h3 className="mt-10 text-xl font-bold">Neden seveceksiniz?</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {p.highlights.map((h) => <li key={h} className="flex gap-3 text-[17px]"><span className="mt-2 size-2.5 shrink-0 rotate-45 bg-pop-deep" /> {h}</li>)}
              </ul>
            </section>

            {p.itinerary && (
              <section id="program" className="scroll-mt-36 pt-14">
                <H2>Program</H2>
                <ol className="relative mt-8 ml-3 border-l-2 border-dashed border-ink/20">
                  {p.itinerary.map((s, i) => (
                    <li key={s.time} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className="relative pb-8 pl-8 last:pb-0">
                      <span className={`absolute top-0 -left-[13px] size-6 rounded-full border-[3px] border-white ${i === 0 || i === p.itinerary!.length - 1 ? "bg-ink" : "bg-pop"}`} />
                      <span className="inline-block rounded-md bg-mist px-2 py-0.5 text-sm font-bold tabular-nums">{s.time}</span>
                      <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                      {s.body && <p className="mt-1 text-ink-2">{s.body}</p>}
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-sm text-ink-3">Saatler yaklaşıktır; rota hava ve rüzgâra göre kaptanın kararıyla değişebilir.</p>
              </section>
            )}

            <section id="ne-beklemeli" className="scroll-mt-36 pt-14">
              <H2>Ne beklemeli</H2>
              <div className="mt-5 text-[17px] leading-[1.75] text-ink-2"><ReadMore><p>{p.description}</p></ReadMore></div>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div><h3 className="text-xl font-bold">Neler dahil</h3><ul className="mt-4 flex flex-col gap-3">{p.included.map((x) => <li key={x} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-pop-deep" strokeWidth={3} /> {x}</li>)}</ul></div>
                <div><h3 className="text-xl font-bold">Neler dahil değil</h3><ul className="mt-4 flex flex-col gap-3">{p.excluded.map((x) => <li key={x} className="flex gap-3"><X className="mt-0.5 size-5 shrink-0 text-amber" strokeWidth={3} /> {x}</li>)}</ul></div>
              </div>
              {stops.length > 0 && (
                <>
                  <h3 className="mt-10 text-xl font-bold">Uğranan koylar</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {stops.map((c) => (
                      <li key={c.slug}>
                        <Link href={`${BASE}/koylar#${c.slug}`} className="group flex items-center gap-4 rounded-2xl bg-mist p-3 transition-colors hover:bg-pop-soft">
                          <span className="relative size-16 shrink-0 overflow-hidden rounded-xl"><Image src={c.image} alt="" fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" /></span>
                          <span className="min-w-0 flex-1"><b className="block">{c.name}</b><span className="line-clamp-1 text-sm text-ink-2">{c.body}</span></span>
                          <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            <section id="siniflar" className="scroll-mt-36 pt-14">
              <H2>Bilet sınıfları</H2>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {classes.map((c, i) => (
                  <div key={c.key} className={`rounded-2xl p-5 ${i === 0 ? "bg-pop-soft ring-2 ring-ink" : "bg-mist"}`}>
                    <p className="flex items-center justify-between"><span className="font-display text-3xl">{c.name}</span>{i === 0 && <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-bold text-pop">Fiyata dahil</span>}</p>
                    <ul className="mt-3 flex flex-col gap-1.5 text-sm">{c.features.map((f) => <li key={f} className="flex items-center gap-2"><SailBullet className="size-3.5 shrink-0" /> {f}</li>)}</ul>
                    {c.draft && <p className="mt-3 text-xs text-ink-3">Taslak metin · fiyat farkı rezervasyonda</p>}
                  </div>
                ))}
              </div>
            </section>

            <section id="bulusma" className="scroll-mt-36 pt-14">
              <H2>Buluşma noktası</H2>
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-line p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0" /> {p.meeting}</p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Çeşme Yat Limanı")}`} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-1.5 font-semibold underline underline-offset-4">Haritada aç <ExternalLink className="size-4" /></a>
              </div>
              <h3 className="mt-10 text-xl font-bold">Bilmeniz gerekenler</h3>
              <ul className="mt-4 flex flex-col gap-3">{p.remember.map((r) => <li key={r} className="flex gap-3 text-[17px] text-ink-2"><span className="mt-2.5 size-2 shrink-0 rounded-full bg-ink" /> {r}</li>)}</ul>
            </section>

            <section id="iptal" className="scroll-mt-36 pt-14">
              <H2>İptal koşulları</H2>
              <div className="mt-5 flex gap-4 rounded-2xl bg-pop-soft p-5"><CalendarCheck className="size-6 shrink-0 text-pop-deep" /><p className="text-[17px]">{p.cancellation}</p></div>
            </section>

            <p className="mt-12 flex gap-2 rounded-xl bg-mist p-4 text-sm text-ink-3">
              <Info className="mt-0.5 size-4 shrink-0" /> Önizleme: tur adı, süre, kalkış, fiyat ve dahil olanlar cesmetekneturu.net&apos;ten alınmıştır. Açıklama ve program metinleri taslaktır.
            </p>
          </article>

          <aside className="scroll-mt-28">
            <div className="lg:sticky lg:top-24"><BookingWidget p={p} /></div>
          </aside>
        </div>

        <section className="mx-auto max-w-[1240px] px-5 pt-20">
          <h2 className="mb-6 text-[1.6rem] font-extrabold tracking-tight sm:text-[2.2rem]">Diğer turlarımız</h2>
          <Carousel label="Diğer turlar">{others.map((t) => <ProductCard key={t.slug} p={t} hrefBase={`${BASE}/turlar`} />)}</Carousel>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-line bg-white px-5 py-3 shadow-[0_-10px_30px_-20px_rgb(13_15_14/0.4)] lg:hidden">
        <span><span className="block text-xs text-ink-3">kişi başı</span><b className="text-xl font-extrabold tabular-nums">{tlp(fromPrice(p))}</b></span>
        <a href="#rezervasyon" className="rounded-xl bg-ink px-6 py-3 font-semibold text-white">Tarih seçin</a>
      </div>
    </PageTransition>
  );
}
