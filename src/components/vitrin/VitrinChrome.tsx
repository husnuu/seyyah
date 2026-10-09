"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { agency } from "@/content/vitrin";
import { SearchBox } from "./SearchBox";
import { FavoritesCount } from "./Favorites";
import { CategoryBar } from "./CategoryBar";

/** Önizleme olduğunu açıkça söyleyen ince şerit. */
export function DemoBar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex h-10 max-w-[1320px] items-center justify-between gap-4 px-5 text-[13px]">
        <span className="truncate">
          <b className="text-pop">Vitrin önizlemesi</b>
          <span className="hidden text-white/70 sm:inline"> · Acente, ürünler ve fiyatlar örnektir; rezervasyon alınmaz.</span>
        </span>
        <Link href="/" className="btn-arrow inline-flex shrink-0 items-center gap-1.5 font-semibold hover:text-pop">
          <ArrowLeft className="size-3.5" /> Seyyah&apos;a dön
        </Link>
      </div>
    </div>
  );
}

export function AgencyLogo({ compact = false, tone = "dark" }: { compact?: boolean; tone?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`grid place-items-center rounded-[14px] bg-pop transition-all duration-500 ${compact ? "size-9" : "size-11"}`}>
        <svg viewBox="0 0 32 32" className={compact ? "size-5" : "size-6"} aria-hidden="true">
          <path d="M4 20 L12 9 L17 16 L21 11 L28 20 Z" fill="#0d0f0e" />
          <path d="M4 24c3-2 6-2 9 0s6 2 9 0 4-1.5 6-1" fill="none" stroke="#0d0f0e" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className={`leading-none ${tone === "light" ? "text-white" : ""}`}>
        <span className={`block font-extrabold tracking-tight transition-all duration-500 ${compact ? "text-xl" : "text-2xl"}`}>{agency.name}</span>
        {!compact && <span className="mt-1 block text-[11px] font-medium tracking-[0.18em] uppercase opacity-60">{agency.tagline}</span>}
      </span>
    </span>
  );
}

export function VitrinHeader() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const on = () => setCompact(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      style={{ viewTransitionName: "vitrin-header" }}
      className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${compact ? "shadow-[0_8px_24px_-12px_rgb(13_15_14/0.25)]" : ""}`}
    >
      <div className={`mx-auto grid max-w-[1320px] grid-cols-[1fr_auto] items-center gap-4 px-5 transition-[height] duration-500 lg:grid-cols-[1fr_auto_1fr] ${compact ? "h-16" : "h-20"}`}>
        <div className="hidden max-w-[400px] lg:block">
          <SearchBox />
        </div>
        <Link href="/vitrin" aria-label={`${agency.name} ana sayfa`} className="justify-self-start lg:justify-self-center">
          <AgencyLogo compact={compact} />
        </Link>
        <nav aria-label="Vitrin" className="flex items-center justify-end gap-5 text-[15px] font-medium">
          <Link href="/vitrin/ara" className="hidden hover:underline sm:block">Tüm deneyimler</Link>
          <Link href="/vitrin/ara?favoriler=1" className="hover:underline"><FavoritesCount /></Link>
          <a href="#yardim" className="flex items-center gap-1.5 hover:underline">
            <HelpCircle className="size-5" /> <span className="hidden sm:inline">Yardım</span>
          </a>
        </nav>
      </div>
      <div className="px-5 pb-3 lg:hidden">
        <SearchBox />
      </div>
      <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${compact ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`} aria-hidden={compact}>
        <div className="overflow-hidden">
          <Suspense>
            <CategoryBar />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
