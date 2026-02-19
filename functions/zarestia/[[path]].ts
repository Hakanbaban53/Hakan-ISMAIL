export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);

  // We handle multiple potential projects under /zarestia/
  if (url.pathname.startsWith('/zarestia/rclone-manager/')) {
    // STRIP the prefix so we fetch from the root of the target site
    // This allows the target site to be deployed normally at the root of its .pages.dev
    const targetPath = url.pathname.replace('/zarestia/rclone-manager/', '/');
    const proxyUrl = `https://rclone-manager-website.pages.dev${targetPath}${url.search}`;

    return fetch(proxyUrl, context.request);
  }

  // Fallback for other paths under /zarestia/
  return new Response('Zarestia Organization Page - Coming Soon', {
    status: 404,
  });
};
