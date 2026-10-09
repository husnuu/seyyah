"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Info, Minus, Plus, Sailboat, Users } from "lucide-react";
import { classes, tlp, tours } from "@/content/poseidon";
import { fromPrice } from "@/content/vitrin";

export const SELECT_EVENT = "poseidon:tur-sec";

/** Hero'daki hızlı rezervasyon kartı. Tur kartları SELECT_EVENT ile buraya tur gönderir. */
export function QuickBook() {
  const [tour, setTour] = useState(tours[0].slug);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);
  const [cls, setCls] = useState<string>("eco");
  const [min, setMin] = useState("");
  const [flash, setFlash] = useState(false);
  const [msg, setMsg] = useState<{ warn: boolean; text: string } | null>(null);

  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- bugünün tarihi yalnızca istemcide bilinir
    setMin(d.toISOString().slice(0, 10));
    const on = (e: Event) => {
      setTour((e as CustomEvent<string>).detail);
      setMsg(null);
      setFlash(true);
      window.setTimeout(() => setFlash(false), 900);
    };
    window.addEventListener(SELECT_EVENT, on);
    return () => window.removeEventListener(SELECT_EVENT, on);
  }, []);

  const t = tours.find((x) => x.slug === tour)!;
  const price = fromPrice(t);
  const total = price * people;

  const submit = () => {
    if (!date) return setMsg({ warn: true, text: "Lütfen bir tarih seçin." });
    setMsg({ warn: false, text: "Bu bir önizleme; rezervasyon oluşturulmadı. Canlı sitede bu adım ödeme sayfasına gider." });
  };

  const box = "rounded-xl border-[1.5px] border-ink/15 px-4 py-2.5 transition-colors focus-within:border-ink";
  const label = "block text-[11px] font-bold tracking-wide text-ink-3 uppercase";

  return (
    <div id="rezervasyon" className={`scroll-mt-28 rounded-[26px] bg-white p-5 text-ink shadow-[0_40px_80px_-30px_rgb(13_15_14/0.6)] transition-[box-shadow] duration-500 sm:p-7 ${flash ? "ring-4 ring-pop" : ""}`}>
      <p className="flex items-center justify-between">
        <span className="text-xl font-extrabold tracking-tight">Biletinizi ayırtın</span>
        <span className="rounded-full bg-pop px-3 py-1 text-xs font-bold">24 saate kadar ücretsiz iptal</span>
      </p>

      <div className="mt-5 grid gap-2.5">
        <label className={`${box} flex items-center gap-3`}>
          <Sailboat className="size-5 shrink-0" />
          <span className="min-w-0 flex-1">
            <span className={label}>Tur</span>
            <select value={tour} onChange={(e) => setTour(e.target.value)} className="w-full cursor-pointer appearance-none bg-transparent font-semibold outline-none">
              {tours.map((x) => <option key={x.slug} value={x.slug}>{x.title} · {tlp(fromPrice(x))}</option>)}
            </select>
          </span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <label className={`${box} flex items-center gap-3`}>
            <CalendarDays className="size-5 shrink-0" />
            <span className="min-w-0 flex-1">
              <span className={label}>Tarih</span>
              <input type="date" min={min} value={date} onChange={(e) => { setDate(e.target.value); setMsg(null); }} className="w-full bg-transparent font-semibold outline-none" />
            </span>
          </label>
          <div className={`${box} flex items-center gap-2`}>
            <Users className="size-5 shrink-0" />
            <span className="min-w-0 flex-1">
              <span className={label}>Kişi</span>
              <span className="font-semibold tabular-nums">{people}</span>
            </span>
            <button type="button" aria-label="Kişi azalt" disabled={people <= 1} onClick={() => setPeople((p) => p - 1)} className="grid size-8 place-items-center rounded-lg border border-ink/15 disabled:opacity-30"><Minus className="size-3.5" /></button>
            <button type="button" aria-label="Kişi artır" disabled={people >= 30} onClick={() => setPeople((p) => p + 1)} className="grid size-8 place-items-center rounded-lg bg-ink text-white disabled:opacity-30"><Plus className="size-3.5" /></button>
          </div>
        </div>
        <fieldset>
          <legend className="sr-only">Bilet sınıfı</legend>
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-mist p-1">
            {classes.map((c) => (
              <label key={c.key} className="cursor-pointer rounded-lg py-2 text-center text-sm font-bold transition-colors has-checked:bg-ink has-checked:text-white">
                <input type="radio" name="sinif" value={c.key} checked={cls === c.key} onChange={() => setCls(c.key)} className="sr-only" />
                {c.name}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4 border-t-2 border-ink pt-4">
        <span>
          <span className="block text-sm text-ink-3">{people} kişi × {tlp(price)}</span>
          <span key={total} className="tab-in block text-3xl font-extrabold tracking-tight tabular-nums">{tlp(total)}</span>
        </span>
        <button type="button" onClick={submit} className="magnetic h-13 rounded-xl bg-ink px-6 font-bold text-white transition-colors hover:bg-ink-2">
          Rezervasyon yap
        </button>
      </div>
      {cls !== "eco" && <p className="mt-2 text-xs text-ink-3">Gösterilen fiyat Eco sınıfı içindir; sınıf farkı rezervasyon adımında eklenir.</p>}
      {msg && (
        <p role="status" className={`tab-in mt-3 flex gap-2 rounded-xl p-3 text-sm ${msg.warn ? "bg-amber-soft text-amber" : "bg-pop-soft"}`}>
          <Info className="mt-0.5 size-4 shrink-0" /> {msg.text}
        </p>
      )}
    </div>
  );
}

/** Tur kartındaki "Bu turu seç": hero kartına turu gönderir ve oraya kaydırır. */
export function SelectTourButton({ tourKey, className = "" }: { tourKey: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(SELECT_EVENT, { detail: tourKey }));
        document.getElementById("rezervasyon")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className={className}
    >
      Bu turu seç
    </button>
  );
}
