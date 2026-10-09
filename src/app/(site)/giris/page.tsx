import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Container, buttonClass } from "@/components/ui/primitives";
import { ApplyButton } from "@/components/application/ApplyButton";

export const metadata: Metadata = {
  title: "Giriş Yap",
  robots: { index: false },
};

/**
 * Panel girişi henüz yok. Bu sayfa ziyaretçiye durumu açıkça söyler ve
 * başvuruya yönlendirir; çalışmıyormuş gibi görünen bir giriş formu koymadık.
 */
export default function LoginPage() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-xl text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-pop text-ink">
          <LockKeyhole className="size-6" />
        </span>
        <h1 className="font-display mt-6 text-4xl font-semibold text-ink sm:text-5xl">Panel girişi yakında.</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-2">
          Seyyah paneli henüz kullanıma açılmadı. Başvurusu onaylanan acente ve tedarikçilere giriş bilgileri e-posta ile
          iletilecek.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ApplyButton size="lg">Ücretsiz Başvur</ApplyButton>
          <Link href="/" className={buttonClass("outline", "lg")}>
            <ArrowLeft className="size-4" /> Ana sayfa
          </Link>
        </div>
      </Container>
    </section>
  );
}
