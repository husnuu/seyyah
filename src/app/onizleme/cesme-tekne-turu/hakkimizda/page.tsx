import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CloudSun, LifeBuoy, RotateCcw, Ship } from "lucide-react";
import { BASE, brand } from "@/content/poseidon";
import { Container, Heading, delay } from "@/components/ui/primitives";
import { WaveMark } from "@/components/ui/Glyphs";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollWords } from "@/components/blocks/ScrollWords";
import { PageBanner } from "@/components/poseidon/PageBanner";

export const metadata: Metadata = { title: "Hakkımızda" };

const facts = [
  { n: String(brand.since), l: "Kuruluş yılı" },
  { n: "20+", l: "Tekne" },
  { n: "4", l: "Düzenli tur" },
  { n: "5", l: "Favori koy" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageBanner crumb="Hakkımızda" title={`${brand.since}'den beri Çeşme'de.`} lead={`Poseidon, lisanslı seyahat acentesi ${brand.operator} güvencesiyle Çeşme'nin koylarında tekne turları ve özel kiralama hizmeti veriyor.`} image="/images/tekne.jpg" />

      <Container className="pt-14">
        <dl className="grid grid-cols-2 border-y-2 border-ink sm:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.l} data-reveal style={delay(i * 80)} className={`px-2 py-8 sm:px-6 ${i ? "sm:border-l-2 sm:border-ink/10" : ""}`}>
              <dd className="font-display text-6xl leading-none tabular-nums sm:text-7xl">{f.n}</dd>
              <dt className="mt-2 font-bold">{f.l}</dt>
            </div>
          ))}
        </dl>
      </Container>

      <ScrollWords label="Hikâyemiz" text="Denizde geçen bir gün, tatilin en çok hatırlanan anlarından biri olur. Biz de yıllardır bu günü güvenli, rahat ve keyifli kılmak için çalışıyoruz: doğru koy, doğru saat, iyi bir mangal ve iskeleye dönerken yorgun ama mutlu misafirler." />

      <section className="px-3 sm:px-5">
        <div className="reveal-img relative mx-auto aspect-[16/10] max-w-[1360px] overflow-hidden rounded-[20px] sm:aspect-[21/9]">
          <Image src="/images/p/koy-yat.jpg" alt="Koyda demirli tekne" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent" />
          <p className="font-display absolute bottom-6 left-6 max-w-xl text-3xl text-white sm:bottom-10 sm:left-10 sm:text-5xl">İskeleden koya, koydan iskeleye.</p>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <Heading>{"Bize güvenebilirsiniz,\nçünkü…"}</Heading>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {[
              { Icon: BadgeCheck, t: "Lisanslı ve üye", b: `${brand.operator} güvencesi; ${brand.memberships.join(" ve ")} üyeliği.` },
              { Icon: RotateCcw, t: "24 saat ücretsiz iade", b: "Tur saatinden 24 saat öncesine kadar iptal edin, ücretinizi geri alın." },
              { Icon: CloudSun, t: "Hava garantisi", b: "Hava izin vermezse tam iade ya da ücretsiz tarih değişikliği." },
              { Icon: Ship, t: "Geniş filo", b: "20'den fazla tekneyle gruplara, ailelere ve çiftlere uygun seçenekler." },
            ].map(({ Icon, t, b }, i) => (
              <article key={t} data-reveal style={delay((i % 2) * 120)} className={`relative overflow-hidden rounded-[24px] p-8 ${i === 0 || i === 3 ? "grain bg-pop" : "bg-mist"}`}>
                <WaveMark className="pointer-events-none absolute -right-10 -bottom-10 w-48 text-white/40" />
                <Icon className="relative size-9" />
                <h3 className="font-display relative mt-6 text-3xl">{t}</h3>
                <p className="relative mt-2 text-lg text-ink-2">{b}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-start gap-4 rounded-[24px] bg-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <p className="flex items-center gap-3 text-xl font-bold"><LifeBuoy className="size-7 text-pop" /> Denize açılmaya hazır mısınız?</p>
            <Link href={`${BASE}/turlar`} className="btn-arrow flex items-center gap-2 rounded-xl bg-pop px-6 py-3 font-bold text-ink hover:bg-white">Turları gör <ArrowRight className="size-4" /></Link>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
