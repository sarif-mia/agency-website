import { useLocation } from "react-router-dom";
export default function SEO({
  title = "SiteGenIT — Independent Digital Studio",
  description = "Thoughtful brands, websites, and digital products. Based in Bangladesh. Working worldwide.",
  url,
  robots = "index, follow",
  image = "/images/social-card.png",
  type = "website",
}) {
  const location = useLocation();
  const canonical = new URL(url || location.pathname, window.location.origin)
    .href;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta
        property="og:image"
        content={new URL(image, window.location.origin).href}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#203a32" />
    </>
  );
}
