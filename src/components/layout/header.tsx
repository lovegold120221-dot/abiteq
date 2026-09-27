import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Globe, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { NAV, type NavChild, type NavItem } from "@/lib/site-data";
import { useUi } from "@/lib/ui-store";
import { cn } from "@/lib/cn";

function resolvePath(item: { to?: string; params?: Record<string, string> }): string {
  if (!item.to) return "";
  let path = item.to;
  if (item.params) {
    for (const [k, v] of Object.entries(item.params)) {
      path = path.replace(`$${k}`, v).replace(`{${k}}`, v);
    }
  }
  return path;
}

function isActivePath(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

function isLinkActive(pathname: string, link: NavChild | NavItem): boolean {
  if (!("to" in link) || !link.to) return false;
  return isActivePath(pathname, resolvePath(link));
}

function itemActive(pathname: string, item: NavItem): boolean {
  if (isLinkActive(pathname, item)) return true;
  if ("children" in item && item.children) {
    return item.children.some((c) => isLinkActive(pathname, c));
  }
  return false;
}

function NavLink({
  link,
  className,
}: {
  link: NavChild | NavItem;
  className?: string;
}) {
  if ("href" in link && link.href) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }
  if (!("to" in link) || !link.to) return null;
  if (link.params) {
    return (
      <Link to={link.to as never} params={link.params as never} className={className as never}>
        {link.label}
      </Link>
    );
  }
  return (
    <Link to={link.to as never} className={className as never}>
      {link.label}
    </Link>
  );
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const openDialer = useUi((s) => s.openDialer);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-bg/90 backdrop-blur-md transition-[box-shadow] duration-200",
        scrolled ? "shadow-[var(--shadow-header)]" : "shadow-none",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-4 px-5 lg:px-8">
        <Logo />
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
          {NAV.map((item) => {
            const key = "href" in item && item.href ? item.href : `${item.label}`;
            const active = itemActive(pathname, item);
            const hasChildren = "children" in item && item.children && item.children.length > 0;
            const linkClass = cn(
              "relative flex items-center gap-1 px-2.5 py-2 text-[13.5px] font-medium rounded-md transition-colors",
              active ? "text-primary" : "text-fg-muted hover:text-fg",
            );
            const underline = active ? (
              <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-0.5 rounded-full bg-primary" />
            ) : null;

            if ("href" in item && item.href) {
              return (
                <a key={key} href={item.href} className={linkClass}>
                  {item.label}
                  {underline}
                </a>
              );
            }

            if (!hasChildren) {
              return (
                <span key={key} className="relative flex">
                  <NavLink link={item} className={linkClass} />
                  {underline}
                </span>
              );
            }

            return (
              <div key={key} className="group relative">
                <span className="relative flex">
                  <NavLink link={item} className={cn(linkClass, "pr-1")} />
                  <span className="flex items-center" aria-hidden="true">
                    <ChevronDown className="size-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
                  </span>
                  {underline}
                </span>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="min-w-52 overflow-hidden rounded-xl border border-border bg-bg py-1.5 shadow-lg">
                    {item.children?.map((child) => {
                      const childActive = isLinkActive(pathname, child);
                      const childClass = cn(
                        "block px-4 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-bg-soft",
                        childActive ? "text-primary" : "text-fg-muted hover:text-fg",
                      );
                      return (
                        <NavLink
                          key={child.label}
                          link={child}
                          className={childClass}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden sm:inline-flex size-10 items-center justify-center rounded-full text-fg-muted hover:bg-bg-soft hover:text-fg"
            aria-label="Language"
            title="English"
          >
            <Globe className="size-[18px]" strokeWidth={1.8} />
          </button>
          <Button size="sm" className="pr-3.5 max-sm:h-10 max-sm:px-3 max-sm:text-xs" onClick={openDialer}>
            Let's Talk
            <ArrowRight className="size-4" strokeWidth={2.2} />
          </Button>
          <button
            type="button"
            className="lg:hidden inline-flex size-11 items-center justify-center rounded-full text-fg hover:bg-bg-soft"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-border bg-bg">
          <nav className="mx-auto flex max-w-[1240px] flex-col px-5 py-2" aria-label="Mobile">
            {NAV.map((item) => {
              if ("href" in item && item.href) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex min-h-12 items-center border-b border-border/70 text-[15px] font-medium text-fg"
                  >
                    {item.label}
                  </a>
                );
              }
              const hasChildren = item.children && item.children.length > 0;
              if (!hasChildren) {
                return (
                  <span
                    key={item.label}
                    className="flex min-h-12 items-center border-b border-border/70 text-[15px] font-medium text-fg"
                  >
                    <NavLink link={item} />
                  </span>
                );
              }
              const isOpen = expanded === item.label;
              return (
                <div key={item.label} className="border-b border-border/70">
                  <div className="flex min-h-12 items-center justify-between">
                    <span className="flex-1 py-3 text-[15px] font-medium text-fg">
                      <NavLink link={item} />
                    </span>
                    <button
                      type="button"
                      aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="inline-flex size-10 items-center justify-center rounded-full text-fg-muted hover:bg-bg-soft"
                    >
                      <ChevronDown
                        className={cn("size-4 transition-transform", isOpen && "rotate-180")}
                      />
                    </button>
                  </div>
                  {isOpen ? (
                    <div className="pb-3 pl-3">
                      {item.children?.map((child) => (
                        <span key={child.label} className="block py-2.5 text-sm text-fg-muted">
                          <NavLink link={child} />
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
