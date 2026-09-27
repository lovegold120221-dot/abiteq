import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { useUi } from "@/lib/ui-store";

export const DIALER_URL = "https://192-888-702-801.site/dialer/";

export function DialerModal() {
  const open = useUi((s) => s.dialerOpen);
  const close = useUi((s) => s.closeDialer);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-navy"
      role="dialog"
      aria-modal="true"
      aria-label="Talk to ABI Tech"
    >
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 bg-navy px-4 text-white sm:px-5">
        <p className="truncate text-sm font-semibold">Let&apos;s Talk — ABI Tech</p>
        <div className="flex items-center gap-2">
          <a
            href={DIALER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
          >
            <ExternalLink className="size-3.5" />
            Open in new tab
          </a>
          <button
            type="button"
            onClick={close}
            aria-label="Close dialer"
            className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
      <iframe
        src={DIALER_URL}
        title="ABI Tech dialer"
        className="h-full w-full flex-1 border-0 bg-white"
        allow="microphone *; camera *; autoplay *; fullscreen *; display-capture *; speaker-selection *"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
