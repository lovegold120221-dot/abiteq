import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ConsultModal } from "@/components/modals/consult-modal";
import { DialerModal } from "@/components/modals/dialer-modal";
import { VideoModal } from "@/components/modals/video-modal";
import { ApplyModal } from "@/components/modals/apply-modal";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ConsultModal />
      <DialerModal />
      <VideoModal />
      <ApplyModal />
    </div>
  );
}
