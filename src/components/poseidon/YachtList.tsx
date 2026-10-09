"use client";

import { useState } from "react";
import { yachts, type Yacht } from "@/content/poseidon";
import { YachtCard } from "./YachtCard";

const types: ("" | Yacht["type"])[] = ["", "Gulet", "Motor yat", "Yelkenli", "Trawler"];

export function YachtList() {
  const [type, setType] = useState<"" | Yacht["type"]>("");
  const [guests, setGuests] = useState(0);
  const [sort, setSort] = useState("");
  const list = yachts.filter((y) => (!type || y.type === type) && y.capacity >= guests);
  if (sort === "artan") list.sort((a, b) => a.priceFrom - b.priceFrom);
  if (sort === "kapasite") list.sort((a, b) => b.capacity - a.capacity);
  const chip = (on: boolean) => `shrink-0 rounded-full border-[1.5px] px-4 py-2 text-sm font-semibold transition-colors ${on ? "border-ink bg-ink text-white" : "border-ink/15 bg-white hover:border-ink"}`;

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 flex flex-wrap items-center gap-3 border-y border-line bg-white/95 px-5 py-4 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {types.map((t) => <button key={t || "hepsi"} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={chip(type === t)}>{t || "Tüm tekneler"}</button>)}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-ink-3">Kişi</span>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="h-10 rounded-xl border-[1.5px] border-ink/15 bg-white px-3 font-semibold">
            <option value={0}>Fark etmez</option>
            {[8, 12, 20, 30].map((n) => <option key={n} value={n}>{n}+ kişi</option>)}
          </select>
        </label>
        <label className="ml-auto flex items-center gap-2 text-sm">
          <span className="text-ink-3">Sırala</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-xl border-[1.5px] border-ink/15 bg-white px-3 font-semibold">
            <option value="">Önerilen</option>
            <option value="artan">Fiyat: düşükten yükseğe</option>
            <option value="kapasite">Kapasite: büyükten küçüğe</option>
          </select>
        </label>
      </div>
      <p className="mt-6 text-ink-3" aria-live="polite">{list.length} tekne gösteriliyor · Örnek filo</p>
      <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((y, i) => <li key={y.slug} className="tab-in" style={{ animationDelay: `${i * 60}ms` }}><YachtCard y={y} /></li>)}
      </ul>
      {list.length === 0 && <p className="mt-10 text-center text-ink-3">Bu kriterlere uyan tekne yok. Kişi sayısını azaltmayı deneyin.</p>}
    </div>
  );
}
