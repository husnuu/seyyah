import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Check, ChevronRight, Info, Ruler, Sailboat, Users } from "lucide-react";
import { BASE, tlp, yachts } from "@/content/poseidon";
import { PageTransition } from "@/components/ui/PageTransition";
import { Carousel } from "@/components/vitrin/Carousel";
import { HeartButton } from "@/components/vitrin/Favorites";
import { ProductGallery } from "@/components/vitrin/ProductGallery";
import { ShareButton } from "@/components/vitrin/ProductTopBar";
import { CharterRequest } from "@/components/poseidon/CharterRequest";
import { YachtCard } from "@/components/poseidon/YachtCard";

export function generateStaticParams() {
  return yachts.map((y) => ({ slug: y.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/onizleme/cesme-tekne-turu/yatlar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const y = yachts.find((x) => x.slug === slug);
  return y ? { title: y.name, description: y.summary } : {};
}

export default async function YachtPage({ params }: PageProps<"/onizleme/cesme-tekne-turu/yatlar/[slug]">) {
  const { slug } = await params;
  const y = yachts.find((x) => x.slug === slug);
  if (!y) notFound();
  const specs = [
    { Icon: Sailboat, label: "Tip", value: y.type },
    { Icon: Ruler, label: "Uzunluk", value: `${y.length} m` },
    { Icon: Users, label: "Kapasite", value: `${y.capacity} kişi` },
    { Icon: BedDouble, label: "Kabin", value: `${y.cabins}` },
  ];

  return (
    <PageTransition>
      <section className="mx-auto max-w-[1240px] px-5 pt-5">
        <div className="relative h-[300px] overflow-hidden rounded-[24px] sm:h-[420px] lg:h-[480px]">
          <ProductGallery images={y.gallery} title={y.name} />
          <HeartButton id={`yat-${y.slug}`} title={y.name} className="absolute top-5 right-5 size-12" />
        </div>
      </section>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 pt-8 lg:grid-cols-[1fr_390px] lg:gap-14">
        <article className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Konum" className="flex items-center gap-1 text-sm text-ink-3">
              <Link href={BASE} className="underline underline-offset-2 hover:text-ink">Ana sayfa</Link>
              <ChevronRight className="size-3.5" />
              <Link href={`${BASE}/yatlar`} className="underline underline-offset-2 hover:text-ink">Yatlar</Link>
            </nav>
            <ShareButton title={y.name} />
          </div>
          <span className="mt-5 inline-block rounded-full bg-ink px-3.5 py-1 text-[13px] font-bold text-pop">Özel kiralama</span>
          <h1 className="mt-4 text-[2.2rem] leading-[1.1] font-extrabold tracking-tight sm:text-5xl">{y.name}</h1>
          <p className="mt-3 text-lg text-ink-2">{y.summary}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {specs.map(({ Icon, label, value }) => (
              <div key={label} className="bg-white p-4"><Icon className="size-5" /><dt className="mt-3 text-sm text-ink-3">{label}</dt><dd className="text-lg font-bold">{value}</dd></div>
            ))}
          </dl>

          <h2 className="mt-12 text-[1.6rem] font-extrabold tracking-tight sm:text-3xl">Teknede neler var?</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {y.features.map((f) => <li key={f} className="flex items-center gap-3 rounded-xl bg-mist p-4 font-semibold"><Check className="size-5 text-pop-deep" strokeWidth={3} /> {f}</li>)}
          </ul>

          <h2 className="mt-12 text-[1.6rem] font-extrabold tracking-tight sm:text-3xl">Nasıl çalışır?</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Tarih, kiralama türü ve kişi sayısını seçip teklif isteyin.", "Ekibimiz rota ve fiyat detaylarıyla size dönüş yapar.", "Onayladığınızda teknemiz iskelede sizi bekler."].map((s, i) => (
              <li key={s} className="rounded-2xl border-2 border-ink/10 p-5">
                <span className="font-display text-4xl text-pop-deep">{i + 1}</span>
                <p className="mt-2 text-ink-2">{s}</p>
              </li>
            ))}
          </ol>

          <p className="mt-12 flex gap-2 rounded-xl bg-mist p-4 text-sm text-ink-3">
            <Info className="mt-0.5 size-4 shrink-0" /> Önizleme: bu tekne ve özellikleri temsilidir. Fiyat aralığı ({tlp(28000)} – {tlp(110000)}) cesmetekneturu.net&apos;ten alınmıştır.
          </p>
        </article>
        <aside><div className="lg:sticky lg:top-24"><CharterRequest y={y} /></div></aside>
      </div>

      <section className="mx-auto max-w-[1240px] px-5 pt-20">
        <h2 className="mb-6 text-[1.6rem] font-extrabold tracking-tight sm:text-[2.2rem]">Diğer teknelerimiz</h2>
        <Carousel label="Diğer tekneler">{yachts.filter((x) => x.slug !== y.slug).map((x) => <YachtCard key={x.slug} y={x} />)}</Carousel>
      </section>
    </PageTransition>
  );
}
