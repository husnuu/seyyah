"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { BASE, brand } from "@/content/poseidon";
import { useFavorites } from "@/components/vitrin/Favorites";

export const pNav = [
  { href: `${BASE}/turlar`, label: "Turlar" },
  { href: `${BASE}/yatlar`, label: "Yatlar" },
  { href: `${BASE}/koylar`, label: "Koylar" },
  { href: `${BASE}/hakkimizda`, label: "Hakkımızda" },
  { href: `${BASE}/yardim`, label: "Yardım merkezi" },
];

/** Poseidon logosu: üç dişli mızrak + dalga. */
export function PoseidonMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#0d0f0e" />
      <path d="M20 9v20M13 11v6c0 3 3 5 7 5s7-2 7-5v-6" fill="none" stroke="#48EBC3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 31c3-2.5 6-2.5 9 0s6 2.5 9 0 3.5-1.5 4-1.5" fill="none" stroke="#48EBC3" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function PoseidonWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <PoseidonMark className={compact ? "size-9" : "size-10"} />
      <span className="leading-none">
        <span className="block text-xl font-extrabold tracking-tight">Poseidon</span>
        <span className="block text-[10.5px] font-semibold tracking-[0.2em] uppercase opacity-60">Çeşme · {brand.since}</span>
      </span>
    </span>
  );
}

export function PreviewBar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex h-10 max-w-[1240px] items-center justify-between gap-4 px-5 text-[13px]">
        <span className="truncate">
          <b className="text-pop">Önizleme · {brand.domain}</b>
          <span className="hidden text-white/70 sm:inline"> · Seyyah tasarım diliyle yeniden yorumlandı; rezervasyon alınmaz.</span>
        </span>
        <Link href="/" className="btn-arrow inline-flex shrink-0 items-center gap-1.5 font-semibold hover:text-pop">
          <ArrowLeft className="size-3.5" /> Seyyah&apos;a dön
        </Link>
      </div>
    </div>
  );
}

export function PoseidonHeader() {
  const pathname = usePathname();
  const home = pathname === BASE;
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const { ids } = useFavorites();
  const ref = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState(120);
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const on = () => setCompact(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = compact || !home || open;

  return (
    <header ref={ref} style={{ viewTransitionName: "poseidon-header" }} className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-500 ${solid ? "bg-white shadow-[0_10px_30px_-18px_rgb(13_15_14/0.4)]" : "bg-pop"}`}>
      <div className={`mx-auto flex max-w-[1240px] items-center gap-8 px-5 transition-[height] duration-500 ${compact ? "h-16" : "h-20"}`}>
        <Link href={BASE} className="shrink-0" aria-label={`${brand.name} ana sayfa`}>
          <PoseidonWordmark compact={compact} />
        </Link>
        <nav aria-label="Ana menü" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-1">
            {pNav.map((n) => {
              const on = pathname.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link href={n.href} aria-current={on ? "page" : undefined} className="group relative px-3 py-2 text-[15px] font-semibold">
                    {n.label}
                    <span className={`absolute inset-x-3 -bottom-0.5 h-[2.5px] origin-left rounded bg-ink transition-transform duration-300 group-hover:scale-x-100 ${on ? "scale-x-100" : "scale-x-0"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href={`${BASE}/turlar?favoriler=1`} aria-label="Favoriler" className="relative grid size-11 place-items-center rounded-xl hover:bg-ink/5">
            <Heart className={`size-5 ${ids.length ? "fill-ink" : ""}`} />
            {ids.length > 0 && <span className="absolute top-1 right-1 grid min-w-4.5 place-items-center rounded-full bg-pop px-1 text-[10px] font-bold">{ids.length}</span>}
          </Link>
          <Link href={`${BASE}/turlar`} className="magnetic hidden rounded-xl bg-ink px-5 py-2.5 font-bold text-white transition-colors hover:bg-ink-2 sm:block">
            Bilet al
          </Link>
          <button
            type="button"
            onClick={() => {
              setMenuTop(ref.current?.getBoundingClientRect().bottom ?? 120);
              setOpen((o) => !o);
            }}
            aria-expanded={open}
            aria-controls="p-mobil-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="relative grid size-11 place-items-center rounded-xl lg:hidden"
          >
            <span className={`absolute h-[2.5px] w-6 rounded bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
            <span className={`absolute h-[2.5px] w-6 rounded bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
          </button>
        </div>
      </div>
      <div id="p-mobil-menu" hidden={!open} style={{ top: menuTop }} className="fixed inset-x-0 bottom-0 overflow-y-auto border-t border-line bg-white px-5 py-6 lg:hidden">
        <ul>
          {[{ href: BASE, label: "Ana sayfa" }, ...pNav].map((n, i) => (
            <li key={n.href} className="tab-in" style={{ animationDelay: `${i * 50}ms` }}>
              <Link href={n.href} className="flex items-center justify-between border-b border-line py-4 font-display text-[1.9rem]">
                {n.label} <ArrowRight className="size-6" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href={`${BASE}/turlar`} className="mt-8 flex h-14 items-center justify-center rounded-xl bg-ink font-bold text-white">Bilet al</Link>
      </div>
    </header>
  );
}
