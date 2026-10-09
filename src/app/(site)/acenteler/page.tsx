import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { agencyPage as c } from "@/content/pages";
import { buttonClass } from "@/components/ui/primitives";
import { PageTransition } from "@/components/ui/PageTransition";
import { ApplyButton } from "@/components/application/ApplyButton";
import { PageHero } from "@/components/blocks/PageHero";
import { BeforeAfter } from "@/components/blocks/BeforeAfter";
import { ScrollWords } from "@/components/blocks/ScrollWords";
import { StackSteps } from "@/components/blocks/StackSteps";
import { VisualBooking, VisualPrice, VisualSearch, VisualStatus } from "@/components/blocks/StepVisuals";
import { Marquee } from "@/components/sections/Marquee";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Acenteler için",
  description: c.lead,
  alternates: { canonical: "/acenteler" },
};

export default function AgenciesPage() {
  return (
    <PageTransition>
      <PageHero
        kicker={c.kicker}
        title={c.title}
        lead={c.lead}
        photos={c.photos}
        actions={
          <>
            <ApplyButton type="acente" size="lg">
              Acente Olarak Başvur <ArrowRight className="size-4" />
            </ApplyButton>
            <a href="#akis" className={buttonClass("outline", "lg")}>Nasıl çalışır?</a>
          </>
        }
      />
      <Marquee />
      <BeforeAfter title={"Telefon, WhatsApp, Excel.\nArtık tek bir yer."} before={c.before} after={c.after} />
      <ScrollWords text={c.manifesto} label="Bir günlük senaryo" />
      <StackSteps
        id="akis"
        title={"Dört adımda\nrezervasyon."}
        steps={c.steps}
        visuals={[<VisualSearch key="1" />, <VisualPrice key="2" />, <VisualBooking key="3" />, <VisualStatus key="4" />]}
      />
      <Faq only={c.faq} title={"Acentelerin\nsorduğu sorular."} />
      <FinalCta
        title={"Portföyünüzü\nbüyütmeye başlayın."}
        lead="Başvurunuzu bırakın; acente hesabınız onaylandığında B2B satışa açılmış ürünleri panelden inceleyebilirsiniz."
        actions={
          <ApplyButton type="acente" variant="pop" size="lg">
            Acente Olarak Başvur <ArrowRight className="size-4" />
          </ApplyButton>
        }
      />
    </PageTransition>
  );
}
