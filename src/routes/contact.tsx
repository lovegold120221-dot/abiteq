import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { InnerHero } from "@/components/layout/inner-hero";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/ui-store";
import { COMPANY } from "@/lib/site-data";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    seoHead({
      title: "Contact ABI Tech — Ortigas Office, Email, WhatsApp",
      description:
        "Contact ABI Tech: admin@abitech.site, WhatsApp +63 945 4456 764. Ortigas Office at One Corporate Center, Pasig City. Meetings by appointment.",
      path: "/contact",
    }),
});

function ContactPage() {
  const openConsult = useUi((s) => s.openConsult);
  return (
    <>
      <InnerHero
        eyebrow="Contact"
        title="Let’s talk about the work, not the hype"
        lede="Whether you have a scoped problem or a messy one, the first conversation is free and opinionated. Meetings are by appointment at our Ortigas office."
      />
      <section className="mx-auto grid max-w-[1100px] gap-8 px-5 py-12 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="grid gap-4">
          <a
            href={COMPANY.emailHref}
            className="flex items-start gap-3 rounded-2xl p-5 shadow-[var(--shadow-card)] transition-colors hover:bg-bg-soft"
          >
            <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
            <span>
              <span className="block text-sm font-semibold">Email</span>
              <span className="text-sm text-fg-muted">{COMPANY.email}</span>
            </span>
          </a>
          <a
            href={COMPANY.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 rounded-2xl p-5 shadow-[var(--shadow-card)] transition-colors hover:bg-bg-soft"
          >
            <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" />
            <span>
              <span className="block text-sm font-semibold">WhatsApp</span>
              <span className="text-sm text-fg-muted">{COMPANY.whatsapp}</span>
            </span>
          </a>
          <a
            href={COMPANY.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 rounded-2xl p-5 shadow-[var(--shadow-card)] transition-colors hover:bg-bg-soft"
          >
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
            <span>
              <span className="block text-sm font-semibold">{COMPANY.officeName}</span>
              <span className="text-sm text-fg-muted">
                {COMPANY.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="mt-2 block font-medium text-fg">{COMPANY.appointmentNote}</span>
              </span>
            </span>
          </a>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button onClick={openConsult}>
              Schedule a consultation
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="secondary" asChild>
              <a href={COMPANY.whatsappHref} target="_blank" rel="noreferrer">
                Message on WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <img
          src="/images/manila.jpg"
          alt="Ortigas Center, Pasig City"
          className="w-full rounded-2xl object-cover aspect-[16/11] shadow-[var(--shadow-card)]"
        />
      </section>
    </>
  );
}
