// path: src/components/seo/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://thesis-buoy.vercel.app";
const SITE_NAME = "neleus1";
const SITE_DESCRIPTION =
  "AI-powered ocean monitoring and decision support platform for coastal stakeholders. Track sea conditions, fish activity, and marine data in real time.";
const OG_IMAGE = `${SITE_URL}/image/favicon1.png`;
const TWITTER_HANDLE = "@neleus1";

export function SEO({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
  noFollow = false,
  canonical,
  structuredData,
}) {
  const fullTitle = title ? `${title} · neleus1` : "neleus1 · AI Decision Support";
  const fullDescription = description || SITE_DESCRIPTION;
  const fullUrl = `${SITE_URL}${path}`;
  const fullImage = image || OG_IMAGE;
  const robotsValue = `${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"}`;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content="ocean monitoring, AI decision support, marine data, coastal monitoring, fish farming, coral reef monitoring, buoy telemetry, aquaculture" />
      <meta name="author" content="neleus1" />
      <meta name="robots" content={robotsValue} />
      <meta name="googlebot" content={robotsValue} />
      <meta name="theme-color" content="#03131F" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <link rel="canonical" href={canonical || fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="128" />
      <meta property="og:image:height" content="128" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export const defaultStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "neleus1",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: "neleus1",
    url: SITE_URL,
  },
  applicationCategory: "Marine Monitoring Application",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "neleus1",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/image/favicon1.png`,
  sameAs: [],
};

export const webSiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "neleus1",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
