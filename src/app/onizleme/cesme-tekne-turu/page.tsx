import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Anchor, ArrowRight, BadgeCheck, Check, CloudSun, Plus, RotateCcw, Sailboat, Ship, Sunset, Waves } from "lucide-react";
import { BASE, brand, classes, coves, faqGroups, tlp, tours, yachts } from "@/content/poseidon";
import { Container, Heading, SplitText, delay } from "@/components/ui/primitives";
import { SailBullet, Spark, WaveMark } from "@/components/ui/Glyphs";
import { MouseStage } from "@/components/ui/MouseStage";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollWords } from "@/components/blocks/ScrollWords";
import { Carousel } from "@/components/vitrin/Carousel";
import { ProductCard } from "@/components/vitrin/ProductCard";
import { QuickBook } from "@/components/poseidon/QuickBook";
import { YachtCard } from "@/components/poseidon/YachtCard";

const tilt = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3", "-rotate-1"];

function Title({ children, href, more = "Tümünü gör" }: { children: string; href?: string; more?: string }) {
  return (
    <div data-reveal className="mb-6 flex items-end justify-between gap-4">
      <h2 className="min-w-0 text-[1.6rem] leading-tight font-extrabold tracking-tight sm:text-[2.2rem]">{children}</h2>
      {href && (
        <Link href={href} className="btn-arrow flex shrink-0 items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4 hover:decoration-pop">
          {more} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}

const shortcuts = [
  { Icon: Waves, label: "Koy turları", href: `${BASE}/turlar?tur=gunduz`, bg: "bg-pop" },
  { Icon: Sunset, label: "Gün batımı", href: `${BASE}/turlar/gun-batimi-turu`, bg: "bg-amber-soft" },
  { Icon: Anchor, label: "Sualtı", href: `${BASE}/turlar/sualti-macerasi`, bg: "bg-pop-soft" },
  { Icon: Ship, label: "Özel tekne", href: `${BASE}/yatlar`, bg: "bg-ink text-white" },
  { Icon: Sailboat, label: "Koylar", href: `${BASE}/koylar`, bg: "bg-mist" },
];

export default function PoseidonHome() {
  const coveNames = [...coves.map((c) => c.name), ...coves.map((c) => c.name)];
  return (
    <PageTransition>
      {/* HERO */}
      <section className="grain relative overflow-hidden bg-pop">
        <WaveMark className="pointer-events-none absolute -bottom-24 -left-24 w-[520px] text-white/40" />
        <Container className="relative grid items-center gap-12 pt-10 pb-20 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-28">
          <div>
            <p className="tab-in flex items-center gap-3 text-sm font-bold"><span className="h-[2px] w-8 bg-ink" /> {brand.since}&apos;den beri Çeşme&apos;de</p>
            <h1 className="split-load font-display mt-6 text-[2.8rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
              <SplitText text="Çeşme koylarını Poseidon'la keşfedin." />
            </h1>
            <p className="tab-in mt-6 max-w-lg text-lg leading-relaxed text-ink-2 sm:text-xl" style={{ animationDelay: "450ms" }}>
              Turkuaz koylarda yüzme molaları, teknede mangal öğle yemeği ve Ege&apos;de gün batımı. Biletinizi online alın, iskelede sıra beklemeyin.
            </p>
            <ul className="tab-in mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-semibold" style={{ animationDelay: "600ms" }}>
              {["24 saate kadar ücretsiz iptal", "Hava garantisi", `${brand.operator} güvencesi`].map((t) => (
                <li key={t} className="flex items-center gap-2"><span className="grid size-6 place-items-center rounded-full border-[1.5px] border-ink"><Check className="size-3.5" strokeWidth={3} /></span>{t}</li>
              ))}
            </ul>
          </div>
          <MouseStage className="relative">
            <div className="mouse-layer tab-in absolute -top-8 -right-2 hidden w-44 sm:block lg:-top-14 lg:-right-6 lg:w-52" style={{ "--depth": "-16px", animationDelay: "300ms" } as CSSProperties}>
              <div className="polaroid float rotate-6"><div className="relative aspect-[4/5]"><Image src="/images/p/koy-kus.jpg" alt="Turkuaz suda demirli tekne" fill preload sizes="210px" className="object-cover" /></div></div>
            </div>
            <div className="mouse-layer tab-in absolute -bottom-10 -left-6 hidden w-40 sm:block lg:-left-12 lg:w-44" style={{ "--depth": "22px", animationDelay: "450ms" } as CSSProperties}>
              <div className="polaroid float-late -rotate-6"><div className="relative aspect-square"><Image src="/images/p/izgara.jpg" alt="Teknede ızgarada balık" fill sizes="180px" className="object-cover" /></div></div>
            </div>
            <div className="mouse-layer tab-in relative z-10" style={{ "--depth": "8px", animationDelay: "200ms" } as CSSProperties}>
              <QuickBook />
            </div>
          </MouseStage>
        </Container>
      </section>

      {/* KOY ŞERİDİ */}
      <div className="marquee-wrap overflow-hidden bg-ink py-5 text-white" aria-label="Uğradığımız koylar">
        <ul className="marquee flex w-max items-center">
          {coveNames.map((n, i) => (
            <li key={i} aria-hidden={i >= coves.length} className="flex items-center gap-8 pr-8">
              <span className="font-display text-3xl whitespace-nowrap sm:text-4xl">{n}</span>
              <Spark className="size-5 text-pop" />
            </li>
          ))}
        </ul>
      </div>

      {/* KISAYOLLAR */}
      <Container className="pt-14">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {shortcuts.map(({ Icon, label, href, bg }, i) => (
            <li key={label} data-reveal style={delay(i * 70)} className={i === 4 ? "col-span-2 sm:col-span-1" : ""}>
              <Link href={href} className={`group flex items-center gap-3 rounded-2xl p-4 font-bold transition-transform duration-300 hover:-translate-y-1 ${bg}`}>
                <span className="grid size-11 place-items-center rounded-xl bg-white/70 text-ink transition-transform duration-500 group-hover:rotate-[-8deg]"><Icon className="size-5" /></span>
                {label}
                <ArrowRight className="ml-auto size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* ÜRÜNLER */}
      <Container className="pt-14">
        <div className="rounded-[28px] bg-mist px-5 py-12 sm:px-10 sm:py-14">
          <section aria-label="Turlarımız">
            <Title href={`${BASE}/turlar`}>Turlarımız</Title>
            <Carousel label="Turlar">{tours.map((p) => <ProductCard key={p.slug} p={p} hrefBase={`${BASE}/turlar`} />)}</Carousel>
          </section>
          <section aria-label="Özel tekne filosu" className="mt-10">
            <Title href={`${BASE}/yatlar`} more="Tüm filo">Özel tekne kiralayın</Title>
            <Carousel label="Filo">{yachts.map((y) => <YachtCard key={y.slug} y={y} />)}</Carousel>
          </section>
        </div>
      </Container>

      {/* BİLET SINIFLARI */}
      <section className="py-24 sm:py-28">
        <Container>
          <Heading>{"Teknede\nyeriniz hazır."}</Heading>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {classes.map((c, i) => (
              <article key={c.key} data-reveal style={delay(i * 120)} className={`relative flex flex-col rounded-[26px] p-8 transition-transform duration-500 hover:-translate-y-2 ${i === 1 ? "bg-ink text-white md:-translate-y-4 md:hover:-translate-y-6" : i === 2 ? "grain bg-pop" : "bg-mist"}`}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl">{c.name}</span>
                  {c.draft && <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${i === 1 ? "border-white/30 text-white/70" : "border-ink/25 text-ink-3"}`}>Taslak metin</span>}
                </div>
                <p className={`mt-3 ${i === 1 ? "text-white/70" : "text-ink-2"}`}>{c.lead}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {c.features.map((f) => <li key={f} className="flex items-center gap-3 font-medium"><SailBullet className={`size-5 shrink-0 ${i === 1 ? "text-pop" : ""}`} /> {f}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* KOYLAR */}
      <section className="overflow-hidden bg-mist py-24 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Heading>{"Turkuazın\nbeş tonu."}</Heading>
            <Link href={`${BASE}/koylar`} className="btn-arrow flex items-center gap-2 font-semibold underline decoration-2 underline-offset-4">Koyları tanıyın <ArrowRight className="size-4" /></Link>
          </div>
        </Container>
        <ul className="mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 pt-4 pb-6 [scrollbar-width:none] sm:px-[max(2rem,calc((100vw-1240px)/2+2rem))]">
          {coves.map((c, i) => (
            <li key={c.slug} data-reveal style={delay(i * 90)} className="w-[260px] shrink-0 snap-center sm:w-[290px]">
              <Link href={`${BASE}/koylar#${c.slug}`} className={`polaroid group block pb-5 transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] ${tilt[i]}`}>
                <span className="relative block aspect-[4/5] overflow-hidden"><Image src={c.image} alt="" fill sizes="290px" className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" /></span>
                <span className="block px-2 pt-4">
                  <span className="font-display block text-2xl">{c.name}</span>
                  <span className="mt-1 block text-sm text-ink-2">{c.body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* GÜVENCE */}
      <section className="py-24 sm:py-28">
        <Container className="grid gap-5 md:grid-cols-2">
          {[
            { Icon: RotateCcw, t: "24 saate kadar ücretsiz iade", b: "Planınız mı değişti? Tur saatinden 24 saat öncesine kadar iptal edin, ücretinizi geri alın." },
            { Icon: CloudSun, t: "Hava garantisi", b: "Hava koşulları nedeniyle tur yapılamazsa ücret iadesi ya da dilediğiniz güne ücretsiz tarih değişikliği." },
          ].map(({ Icon, t, b }, i) => (
            <article key={t} data-reveal style={delay(i * 120)} className={`relative overflow-hidden rounded-[26px] p-8 sm:p-10 ${i === 0 ? "grain bg-pop" : "bg-mist"}`}>
              <WaveMark className="pointer-events-none absolute -right-10 -bottom-12 w-56 text-white/50" />
              <Icon className="relative size-10" />
              <h3 className="font-display relative mt-8 text-3xl sm:text-4xl">{t}</h3>
              <p className="relative mt-3 max-w-md text-lg text-ink-2">{b}</p>
            </article>
          ))}
        </Container>
      </section>

      {/* ÖZEL TEKNE BANDI */}
      <section className="px-3 sm:px-5">
        <div className="mx-auto grid max-w-[1360px] overflow-hidden rounded-[30px] bg-ink text-white lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden"><Image src="/images/p/yelkenli.jpg" alt="Koyda demirli yelkenli" fill sizes="(min-width: 1024px) 680px, 100vw" className="zoom-on-scroll object-cover" /></div>
          <div className="p-8 sm:p-14">
            <p className="text-sm font-bold tracking-wide text-pop uppercase">Özel tekne kiralama</p>
            <h2 className="font-display mt-3 text-[2.4rem] leading-[1.04] sm:text-5xl">Tekne sizin, rota sizin.</h2>
            <p className="mt-5 max-w-md text-lg text-white/70">Doğum günü, evlilik teklifi, şirket gezisi ya da ailecek bir gün. 20&apos;den fazla teknemizle size özel planlayalım.</p>
            <p className="mt-8 text-white/60">Günlük kiralama <b className="text-2xl text-white tabular-nums">{tlp(28000)}</b>&apos;den başlayan fiyatlarla</p>
            <Link href={`${BASE}/yatlar`} className="btn-arrow mt-6 inline-flex items-center gap-2 rounded-xl bg-pop px-6 py-3.5 font-bold text-ink transition-colors hover:bg-white">Filoyu inceleyin <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>

      {/* HAKKIMIZDA */}
      <ScrollWords label="Hakkımızda" text={`${brand.since}'den bu yana Çeşme'nin koylarında misafir ağırlıyoruz. Poseidon, lisanslı seyahat acentesi ${brand.operator} güvencesiyle hizmet veriyor.`} />
      <Container className="-mt-16 flex flex-wrap items-center gap-3">
        {brand.memberships.map((m) => <span key={m} className="flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 font-bold"><BadgeCheck className="size-5" /> {m} üyesi</span>)}
        <Link href={`${BASE}/hakkimizda`} className="btn-arrow ml-auto flex items-center gap-2 font-semibold underline decoration-2 underline-offset-4">Hikâyemiz <ArrowRight className="size-4" /></Link>
      </Container>

      {/* SSS */}
      <Container className="grid gap-10 pt-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-[1.6rem] font-extrabold tracking-tight sm:text-[2.2rem]">Sıkça sorulanlar</h2>
          <Link href={`${BASE}/yardim`} className="btn-arrow mt-4 inline-flex items-center gap-2 font-semibold underline underline-offset-4">Yardım merkezi <ArrowRight className="size-4" /></Link>
        </div>
        <div className="border-t-2 border-ink">
          {faqGroups.flatMap((g) => g.items).slice(0, 4).map((f) => (
            <details key={f.q} name="p-sss" className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist transition-all duration-300 group-open:rotate-45 group-open:bg-pop"><Plus className="size-4" /></span>
              </summary>
              <p className="max-w-2xl pb-5 text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}
