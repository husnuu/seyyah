"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HeartOff } from "lucide-react";
import { BASE, tourMeta, tours, yachts } from "@/content/poseidon";
import { fromPrice } from "@/content/vitrin";
import { ProductCard } from "@/components/vitrin/ProductCard";
import { useFavorites } from "@/components/vitrin/Favorites";
import { YachtCard } from "./YachtCard";

const kinds = [
  { key: "", label: "Tümü" },
  { key: "gunduz", label: "Gündüz turları", match: ["adalar-ve-koylar-turu", "izmir-cikisli-tam-gun-tur"] },
  { key: "aksam", label: "Akşam", match: ["gun-batimi-turu"] },
  { key: "macera", label: "Macera", match: ["sualti-macerasi"] },
];

export function TourList() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const { ids } = useFavorites();
  const kind = sp.get("tur") ?? "";
  const sort = sp.get("sirala") ?? "";
  const fav = sp.get("favoriler") === "1";
  const set = (k: string, v: string) => {
    const n = new URLSearchParams(sp.toString());
    if (v) n.set(k, v);
    else n.delete(k);
    router.replace(`${pathname}${n.size ? `?${n}` : ""}`, { scroll: false });
  };

  const match = kinds.find((k) => k.key === kind)?.match;
  const list = tours.filter((t) => (!match || match.includes(t.slug)) && (!fav || ids.includes(t.slug)));
  if (sort === "artan") list.sort((a, b) => fromPrice(a) - fromPrice(b));
  if (sort === "azalan") list.sort((a, b) => fromPrice(b) - fromPrice(a));
  const favYachts = fav ? yachts.filter((y) => ids.includes(`yat-${y.slug}`)) : [];

  const chip = (on: boolean) => `shrink-0 rounded-full border-[1.5px] px-4 py-2 text-sm font-semibold transition-colors ${on ? "border-ink bg-ink text-white" : "border-ink/15 bg-white hover:border-ink"}`;

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 flex flex-wrap items-center gap-3 border-y border-line bg-white/95 px-5 py-4 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {kinds.map((k) => (
            <button key={k.key} type="button" aria-pressed={kind === k.key} onClick={() => set("tur", k.key)} className={chip(kind === k.key && !fav)}>{k.label}</button>
          ))}
          <button type="button" aria-pressed={fav} onClick={() => set("favoriler", fav ? "" : "1")} className={chip(fav)}>Favorilerim{ids.length ? ` (${ids.length})` : ""}</button>
        </div>
        <label className="ml-auto flex items-center gap-2 text-sm">
          <span className="text-ink-3">Sırala</span>
          <select value={sort} onChange={(e) => set("sirala", e.target.value)} className="h-10 rounded-xl border-[1.5px] border-ink/15 bg-white px-3 font-semibold">
            <option value="">Önerilen</option>
            <option value="artan">Fiyat: düşükten yükseğe</option>
            <option value="azalan">Fiyat: yüksekten düşüğe</option>
          </select>
        </label>
      </div>

      <p className="mt-6 text-ink-3" aria-live="polite">{list.length} tur{fav && favYachts.length ? ` · ${favYachts.length} tekne` : ""}</p>
      {list.length + favYachts.length > 0 ? (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((t, i) => (
            <li key={t.slug} className="tab-in" style={{ animationDelay: `${i * 60}ms` }}>
              <ProductCard p={t} hrefBase={`${BASE}/turlar`} />
              <p className="mt-2 px-2 text-sm text-ink-3">Kalkış: {tourMeta[t.slug].departure}</p>
            </li>
          ))}
          {favYachts.map((y) => <li key={y.slug} className="tab-in"><YachtCard y={y} /></li>)}
        </ul>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center">
          <span className="grid size-20 place-items-center rounded-full bg-mist"><HeartOff className="size-9" /></span>
          <h2 className="mt-5 text-2xl font-bold">Henüz favoriniz yok</h2>
          <p className="mt-2 max-w-sm text-ink-3">Turlardaki ve teknelerdeki kalp simgesine dokunarak burada toplayabilirsiniz.</p>
        </div>
      )}
    </div>
  );
}
