import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import { BASE, brand, coves, tours } from "@/content/poseidon";
import { LogoMark } from "@/components/ui/Logo";
import { PoseidonWordmark } from "./Chrome";

const link = "text-ink-2 hover:text-ink hover:underline underline-offset-4";

export function PoseidonFooter() {
  return (
    <footer className="grain relative mt-24 overflow-hidden bg-pop pt-20">
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display text-[2.4rem] leading-[1.04] sm:text-6xl">İskelede görüşmek üzere.</h2>
          <dl className="mt-8 grid gap-5 text-lg sm:grid-cols-2">
            <div><dt className="text-sm font-bold uppercase">Adres</dt><dd className="mt-1">{brand.address}</dd></div>
            <div><dt className="text-sm font-bold uppercase">Çalışma saatleri</dt><dd className="mt-1">{brand.hours}</dd></div>
            <div><dt className="text-sm font-bold uppercase">İşletmeci</dt><dd className="mt-1">{brand.operator}</dd></div>
            <div><dt className="text-sm font-bold uppercase">Üyelikler</dt><dd className="mt-1">{brand.memberships.join(" · ")}</dd></div>
          </dl>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Çeşme Yat Limanı")}`}
          target="_blank"
          rel="noreferrer"
          className="group relative block min-h-[240px] overflow-hidden rounded-[26px] bg-white"
        >
          <svg viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <rect width="600" height="260" fill="#d9fbf1" />
            <path d="M0 170 C 120 140, 200 200, 300 160 S 480 110, 600 140 L600 260 L0 260 Z" fill="#48ebc3" opacity=".55" />
            <path d="M-10 90 C 140 60, 260 120, 360 80 S 520 40, 620 70" fill="none" stroke="#0f9f7c" strokeOpacity=".3" strokeWidth="10" strokeLinecap="round" />
          </svg>
          <span className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-full">
            <span className="pulse absolute top-[70%] left-1/2 size-9 -translate-x-1/2 rounded-full bg-ink/20" />
            <MapPin className="relative size-12 fill-ink text-pop" strokeWidth={1.5} />
          </span>
          <span className="absolute right-5 bottom-5 left-5 flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3 font-bold backdrop-blur">
            Çeşme Yat Limanı <span className="flex items-center gap-1.5 text-sm underline underline-offset-4">Haritada aç <ExternalLink className="size-4" /></span>
          </span>
        </a>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-[1240px] gap-10 border-t border-ink/20 px-5 pt-12 sm:grid-cols-2 lg:grid-cols-4">
        <div><PoseidonWordmark /><p className="mt-4 max-w-xs text-ink-2">{brand.since}&apos;den beri Çeşme koylarında tekne turları ve özel tekne kiralama.</p></div>
        <nav aria-label="Turlar"><h3 className="font-bold">Turlar</h3><ul className="mt-4 flex flex-col gap-2.5">{tours.map((t) => <li key={t.slug}><Link className={link} href={`${BASE}/turlar/${t.slug}`}>{t.title.split(",")[0]}</Link></li>)}</ul></nav>
        <nav aria-label="Yatlar ve koylar"><h3 className="font-bold">Yatlar & koylar</h3><ul className="mt-4 flex flex-col gap-2.5"><li><Link className={link} href={`${BASE}/yatlar`}>Filo (20+ tekne)</Link></li>{coves.slice(0, 4).map((c) => <li key={c.slug}><Link className={link} href={`${BASE}/koylar#${c.slug}`}>{c.name}</Link></li>)}</ul></nav>
        <nav aria-label="Kurumsal"><h3 className="font-bold">Kurumsal</h3><ul className="mt-4 flex flex-col gap-2.5"><li><Link className={link} href={`${BASE}/hakkimizda`}>Hakkımızda</Link></li><li><Link className={link} href={`${BASE}/yardim`}>Yardım merkezi</Link></li><li><Link className={link} href={`${BASE}/yardim#iptal-ve-hava-durumu`}>İptal ve iade</Link></li><li><span className="text-ink-3">KVKK ve gizlilik</span></li></ul></nav>
      </div>

      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-8 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {brand.name} · {brand.operator}</span>
        <Link href="/" className="flex items-center gap-2 hover:text-ink">
          Altyapı <LogoMark className="size-5" /> <b className="font-extrabold tracking-tight text-ink">seyyah</b>
        </Link>
      </div>
      <div aria-hidden="true" className="relative -mb-[0.22em] text-center text-[22vw] leading-[0.8] font-extrabold tracking-[-0.07em] select-none">poseidon</div>
    </footer>
  );
}
