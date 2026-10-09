import Image from "next/image";
import Link from "next/link";
import { BedDouble, Ruler, Users } from "lucide-react";
import { BASE, tlp, type Yacht } from "@/content/poseidon";
import { HeartButton } from "@/components/vitrin/Favorites";

export function YachtCard({ y }: { y: Yacht }) {
  return (
    <Link
      href={`${BASE}/yatlar/${y.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_2px_6px_rgb(13_15_14/0.06),0_14px_30px_-18px_rgb(13_15_14/0.35)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-24px_rgb(13_15_14/0.45)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image src={y.image} alt={y.name} fill sizes="(min-width: 1024px) 300px, 82vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
        {y.gallery[1] && <Image src={y.gallery[1]} alt="" fill sizes="300px" className="scale-110 object-cover opacity-0 transition-[opacity,scale] duration-700 group-hover:scale-100 group-hover:opacity-100" />}
        <span className="absolute top-0 left-0 rounded-br-xl bg-ink px-3 py-1.5 text-[13px] font-semibold text-pop">{y.type}</span>
        <HeartButton id={`yat-${y.slug}`} title={y.name} className="absolute top-3 right-3" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{y.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-[14.5px] text-ink-3">{y.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-2">
          <li className="flex items-center gap-1.5"><Users className="size-4" /> {y.capacity} kişi</li>
          <li className="flex items-center gap-1.5"><Ruler className="size-4" /> {y.length} m</li>
          <li className="flex items-center gap-1.5"><BedDouble className="size-4" /> {y.cabins} kabin</li>
        </ul>
        <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
          <span className="text-[13px] text-ink-3">Günlük</span>
          <span className="text-right">
            <span className="block text-[12px] text-ink-3">başlayan fiyatlarla</span>
            <b className="text-2xl font-extrabold tracking-tight tabular-nums">{tlp(y.priceFrom)}</b>
          </span>
        </div>
      </div>
    </Link>
  );
}
