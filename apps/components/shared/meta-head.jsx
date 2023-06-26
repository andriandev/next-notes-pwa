import Head from 'next/head';
import {
  siteBaseUrl,
  siteFaviconUrl,
  siteTitle,
  siteDescription,
  siteIndex,
} from '@/config/setting';

function MetaHead(props) {
  // Props variable
  const { title, description, index, canonical } = props;

  // Define variabel
  const baseUrl = siteBaseUrl();
  const faviconUrl = siteFaviconUrl();
  const faviconType = faviconUrl.split('.');

  return (
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={index == 'noindex' ? 'noindex, nofollow' : index}
      />
      <link rel="canonical" href={baseUrl + canonical} />
      <link
        rel="icon"
        type={`image/${faviconType[faviconType.length - 1]}`}
        href={faviconUrl.includes('http') ? faviconUrl : baseUrl + faviconUrl}
      />

      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/icons/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/icons/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/icons/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/icons/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/icons/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/icons/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/icons/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/icons/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/icons/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/icons/ms-icon-144x144.png"
      />
    </Head>
  );
}

MetaHead.defaultProps = {
  title: siteTitle(),
  description: siteDescription(),
  index: siteIndex(),
  canonical: '/',
};

export default MetaHead;
