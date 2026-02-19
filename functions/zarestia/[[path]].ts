export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);

  if (url.pathname.startsWith('/zarestia/rclone-manager/')) {
    // We fetch from the custom subdomain to bypass the Turkey ISP block on pages.dev
    const targetPath = url.pathname.replace('/zarestia/rclone-manager/', '/');
    const proxyUrl = `https://rcm-files.hakanismail.info${targetPath}${url.search}`;

    return fetch(proxyUrl, context.request);
  }

  return new Response('Zarestia Organization Page - Coming Soon', {
    status: 404,
  });
};
