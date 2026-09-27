import { COMPANY } from "./site-data";

export const SITE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  "https://www.abitech.site"
).replace(/\/$/, "");

export const SITE_NAME = "ABI Tech";

export function absUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function seoHead({
  title,
  description,
  path,
  image = "/og.jpg",
  type = "website",
  published,
  modified,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  published?: string;
  modified?: string;
  noindex?: boolean;
}) {
  const url = absUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const imageUrl = absUrl(image);
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex
          ? "noindex, nofollow"
          : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "author", content: SITE_NAME },
      { name: "theme-color", content: "#1D6FE8" },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type === "article" ? "article" : "website" },
      { property: "og:image", content: imageUrl },
      { property: "og:locale", content: "en_PH" },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      ...(published ? [{ property: "article:published_time", content: published }] : []),
      ...(modified ? [{ property: "article:modified_time", content: modified }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: SITE_NAME,
    legalName: "ABI Tech",
    url: SITE_URL,
    logo: absUrl("/logo.png"),
    image: absUrl("/og.jpg"),
    description:
      "ABI Tech designs, builds, and deploys production AI systems — strategy, custom development, automation, and dedicated teams.",
    email: COMPANY.email,
    telephone: COMPANY.whatsapp,
    foundingDate: "2021",
    address: {
      "@type": "PostalAddress",
      streetAddress: "One Corporate Center, Julia Vargas Ave. cor. Meralco Ave.",
      addressLocality: "Pasig City",
      addressRegion: "Metro Manila",
      postalCode: "1605",
      addressCountry: "PH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 14.5865,
      longitude: 121.0614,
    },
    areaServed: ["PH", "SG", "US", "AU", "AE"],
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: COMPANY.email,
        telephone: COMPANY.whatsapp,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Filipino"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-PH",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  cover_image: string | null;
  author_name: string;
  published_at: string;
  updated_at: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [absUrl(post.cover_image || "/og.jpg")],
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author_name, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absUrl("/logo.png") },
    },
    mainEntityOfPage: absUrl(`/blog/${post.slug}`),
    inLanguage: "en-PH",
  };
}
