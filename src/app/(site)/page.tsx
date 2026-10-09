import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ValueProps } from "@/components/sections/ValueProps";
import { Marketplace } from "@/components/sections/Marketplace";
import { Categories } from "@/components/sections/Categories";
import { Distribution } from "@/components/sections/Distribution";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Integrations } from "@/components/sections/Integrations";
import { FinalCta } from "@/components/sections/FinalCta";
import { Faq } from "@/components/sections/Faq";
import { faq } from "@/content/site";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollWords } from "@/components/blocks/ScrollWords";
import { CountStrip } from "@/components/blocks/CountStrip";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Marquee />
      <ScrollWords
        label="Seyyah nedir?"
        text="Bir acente yeni ürün arıyor. Bir tedarikçi yeni acente arıyor. Seyyah ikisini aynı panelde buluşturur; ürünü, fiyatı ve rezervasyonu tek yerde toplar."
      />
      <ValueProps />
      <CountStrip />
      <Marketplace />
      <Categories />
      <Distribution />
      <Features />
      <HowItWorks />
      <Integrations />
      <FinalCta />
      <Faq />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </PageTransition>
  );
}
