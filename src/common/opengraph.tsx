import { Manga } from '../api/types';
import { baseUrl, domain as baseDomain } from '../core/consts';

const resizeUrl = process.env.NEXT_PUBLIC_RESIZE_URL;
const propertyKeyMap = {
  description: 'description',
  'twitter:url': 'twitterUrl',
  'twitter:domain': 'twitterDomain',
  'twitter:card': 'twitterCard',
  'twitter:title': 'twitterTitle',
  'twitter:description': 'twitterDescription',
  'twitter:image': 'twitterImage',
  'og:url': 'ogUrl',
  'og:type': 'ogType',
  'og:title': 'ogTitle',
  'og:description': 'ogDescription',
  'og:image': 'ogImage',
};

function getImagePreviewUrl(manga: Manga) {
  return `${resizeUrl}?image=${manga?.image || manga.thumbnail}`;
}

function getDescription(manga: Manga) {
  const output = `Sora: ${manga.description}`;
  if (output.length > 55) return output.slice(0, 52) + '...';
  return output;
}

export function getBaseOpenGraph(url: string = baseUrl, domain: string = baseDomain) {
  const description = 'Читайте мангу на Sora';
  const title = 'Sora-reader';
  const preview = `${url}/assets/preview.png`;
  return (
    <>
      <meta key={propertyKeyMap['description']} name="description" content={description} />

      <meta key={propertyKeyMap['og:url']} property="og:url" content={url} />
      <meta key={propertyKeyMap['og:type']} property="og:type" content="website" />
      <meta key={propertyKeyMap['og:title']} property="og:title" content={title} />
      <meta key={propertyKeyMap['og:description']} property="og:description" content={description} />
      <meta key={propertyKeyMap['og:image']} property="og:image" content={preview} />

      <meta key={propertyKeyMap['twitter:domain']} property="twitter:domain" content={domain} />
      <meta key={propertyKeyMap['twitter:url']} property="twitter:url" content={url} />
      <meta key={propertyKeyMap['twitter:card']} name="twitter:card" content="summary_large_image" />
      <meta key={propertyKeyMap['twitter:title']} name="twitter:title" content={title} />
      <meta key={propertyKeyMap['twitter:description']} name="twitter:description" content={description} />
      <meta key={propertyKeyMap['twitter:image']} name="twitter:image" content={preview}></meta>
    </>
  );
}

export function getOpenGraphForManga(manga: Manga) {
  return (
    <>
      <meta key={propertyKeyMap['description']} name="description" content={getDescription(manga)} />

      <meta key={propertyKeyMap['og:title']} property="og:title" content={manga?.title} />
      <meta key={propertyKeyMap['og:description']} property="og:description" content={getDescription(manga)} />
      <meta key={propertyKeyMap['og:image']} property="og:image" content={getImagePreviewUrl(manga)} />

      <meta key={propertyKeyMap['twitter:card']} name="twitter:card" content="summary_large_image" />
      <meta key={propertyKeyMap['twitter:title']} name="twitter:title" content={manga?.title} />
      <meta key={propertyKeyMap['twitter:description']} name="twitter:description" content={getDescription(manga)} />
      <meta key={propertyKeyMap['twitter:image']} name="twitter:image" content={getImagePreviewUrl(manga)}></meta>
    </>
  );
}
