import { Suspense } from "react";
import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { PageBanner } from "@/components/poseidon/PageBanner";
import { TourList } from "@/components/poseidon/TourList";

export const metadata: Metadata = { title: "Turlar" };

export default function ToursPage() {
  return (
    <PageTransition>
      <PageBanner
        crumb="Turlar"
        title="Denizde bir gün, dört farklı rota."
        lead="Koy turundan gün batımına, İzmir çıkışlı tam günden sualtı macerasına. Hepsinde 24 saate kadar ücretsiz iptal."
        image="/images/p/gunbatimi-yat.jpg"
      />
      <div className="mx-auto max-w-[1240px] px-5">
        <Suspense>
          <TourList />
        </Suspense>
      </div>
    </PageTransition>
  );
}
