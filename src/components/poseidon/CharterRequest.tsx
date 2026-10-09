"use client";

import { useState } from "react";
import { Info, Minus, Plus } from "lucide-react";
import { rentalModes, tlp, type Yacht } from "@/content/poseidon";
import { AvailabilityCalendar, formatTr } from "@/components/vitrin/AvailabilityCalendar";

/** Özel tekne için teklif isteği. Önizleme olduğu için gönderilmez ve bu açıkça söylenir. */
export function CharterRequest({ y }: { y: Yacht }) {
  const [mode, setMode] = useState("gunluk");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(Math.min(6, y.capacity));
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState<{ warn: boolean; text: string } | null>(null);

  const submit = () => {
    if (!date) return setMsg({ warn: true, text: "Lütfen bir tarih seçin." });
    setMsg({ warn: false, text: `Önizleme: ${formatTr(date)} için ${guests} kişilik teklif isteği gönderilmedi. Canlı sitede ekibimiz size dönüş yapar.` });
  };

  return (
    <div id="teklif" className="scroll-mt-28 rounded-[24px] border-2 border-ink/10 bg-white p-6 shadow-[0_24px_60px_-30px_rgb(13_15_14/0.35)]">
      <p className="text-sm text-ink-3">Günlük kiralama</p>
      <p className="text-3xl font-extrabold tracking-tight tabular-nums">{tlp(y.priceFrom)}<span className="text-base font-semibold text-ink-3">&apos;den</span></p>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold">Kiralama türü</legend>
        <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-mist p-1">
          {rentalModes.map((m) => (
            <label key={m.key} className="cursor-pointer rounded-lg py-2 text-center text-sm font-bold transition-colors has-checked:bg-ink has-checked:text-white">
              <input type="radio" name="kiralama" checked={mode === m.key} onChange={() => setMode(m.key)} className="sr-only" />
              {m.label}
            </label>
          ))}
        </div>
        <p className="mt-2 text-sm text-ink-3">{rentalModes.find((m) => m.key === mode)?.body}</p>
      </fieldset>

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold">Tarih {date && <span className="font-normal text-ink-3">· {formatTr(date)}</span>}</p>
        <AvailabilityCalendar slug={y.slug} value={date} onChange={(v) => { setDate(v); setMsg(null); }} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span><span className="block font-semibold">Misafir sayısı</span><span className="text-sm text-ink-3">En fazla {y.capacity} kişi</span></span>
        <span className="flex items-center gap-3">
          <button type="button" aria-label="Azalt" disabled={guests <= 1} onClick={() => setGuests((g) => g - 1)} className="grid size-10 place-items-center rounded-xl border-[1.5px] border-ink/15 disabled:opacity-30"><Minus className="size-4" /></button>
          <span className="w-6 text-center text-lg font-bold tabular-nums">{guests}</span>
          <button type="button" aria-label="Artır" disabled={guests >= y.capacity} onClick={() => setGuests((g) => g + 1)} className="grid size-10 place-items-center rounded-xl bg-ink text-white disabled:opacity-30"><Plus className="size-4" /></button>
        </span>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-semibold">Notunuz (opsiyonel)</span>
        <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Doğum günü, rota isteği, yemek tercihi…" className="mt-2 w-full resize-y rounded-xl border-[1.5px] border-ink/15 px-4 py-3 outline-none focus:border-ink" />
      </label>

      <button type="button" onClick={submit} className="magnetic mt-5 h-13 w-full rounded-xl bg-ink font-bold text-white transition-colors hover:bg-ink-2">Teklif iste</button>
      {msg && <p role="status" className={`tab-in mt-3 flex gap-2 rounded-xl p-3 text-sm ${msg.warn ? "bg-amber-soft text-amber" : "bg-pop-soft"}`}><Info className="mt-0.5 size-4 shrink-0" /> {msg.text}</p>}
    </div>
  );
}
