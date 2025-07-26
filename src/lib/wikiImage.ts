const cache: Record<string, string | null> = {};

export function formatWikiTitle(title: string): string {
  return title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .replace(/_+/g, '_');
}

export async function getWikiImage(topic: string): Promise<string | null> {
  if (cache[topic]) return cache[topic];

  try {
    const formattedTopic = formatWikiTitle(topic);
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=original&titles=${formattedTopic}&origin=*`;

    const response = await fetch(apiUrl);
    if (!response.ok) return null;

    const data = await response.json();
    const page = data.query?.pages?.[0];

    if (page?.original?.source) {
      cache[topic] = page.original.source;
      return page.original.source;
    }

    // Fallback to other images
    const imagesUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=images&titles=${formattedTopic}&origin=*`;
    const imagesResponse = await fetch(imagesUrl);
    if (!imagesResponse.ok) return null;

    const imagesData = await imagesResponse.json();
    const images = imagesData.query?.pages?.[0]?.images;

    if (images && images.length > 0) {
      const validImage = images.find((img: { title: string }) => {
        const title = img.title.toLowerCase();
        return (
          (title.endsWith('.jpg') || title.endsWith('.jpeg') || title.endsWith('.png')) &&
          !title.includes('commons') &&
          !title.includes('logo') &&
          !title.includes('icon')
        );
      });

      if (validImage) {
        const imageInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(validImage.title)}&origin=*`;
        const imageInfoResponse = await fetch(imageInfoUrl);
        const imageInfoData = await imageInfoResponse.json();

        const url = imageInfoData.query?.pages?.[0]?.imageinfo?.[0]?.url || null;
        cache[topic] = url;
        return url;
      }
    }

    cache[topic] = null;
    return null;
  } catch (err) {
    console.error('Wiki Image Error:', err);
    cache[topic] = null;
    return null;
  }
}
