import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BASE } from "@/content/poseidon";
import { SplitText } from "@/components/ui/primitives";
import { WaveMark } from "@/components/ui/Glyphs";

/** İç sayfa başlığı: turkuaz bant, kırıntı yolu, kelime kelime açılan başlık ve eğik fotoğraf. */
export function PageBanner({ crumb, title, lead, image }: { crumb: string; title: string; lead: string; image: string }) {
  return (
    <section className="grain relative overflow-hidden bg-pop">
      <WaveMark className="pointer-events-none absolute -top-16 -right-24 w-[440px] text-white/40" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 pt-8 pb-14 sm:pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <nav aria-label="Konum" className="tab-in flex items-center gap-1 text-sm font-semibold">
            <Link href={BASE} className="opacity-60 hover:opacity-100">Ana sayfa</Link>
            <ChevronRight className="size-3.5 opacity-50" />
            <span>{crumb}</span>
          </nav>
          <h1 className="split-load font-display mt-5 text-[2.6rem] leading-[1.03] sm:text-6xl">
            <SplitText text={title} />
          </h1>
          <p className="tab-in mt-5 max-w-xl text-lg text-ink-2" style={{ animationDelay: "400ms" }}>{lead}</p>
        </div>
        <div className="tab-in hidden justify-self-center lg:block" style={{ animationDelay: "250ms" }}>
          <div className="polaroid float w-64 rotate-[5deg]">
            <div className="relative aspect-[4/5]"><Image src={image} alt="" fill preload sizes="256px" className="object-cover" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
