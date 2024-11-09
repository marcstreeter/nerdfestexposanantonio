import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "Nerd Fest + Expo",
  tagline:
    "Avengers, Jedi, Hobbits, and Whovians: Assemble! 🎉 Join the ultimate gathering of fandoms where your nerdy heart belongs. Resistance is futile — come, you must!",
  description:
    "Nerd Fest + Expo is an event meant for the community and by the community.  We share because we care.",
  description_short: "Nerd Fest + Expo is a nerdy family friendly event.",
  url: "https://nerdfestexpo.com",
  author: "Nerds",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title} Website`,
  description: "Come to the Expo you've been waiting for!",
  image: ogImageSrc,
};
