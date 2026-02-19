export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);

  // If the path is exactly /zarestia or /zarestia/, you can redirect or proxy to a landing page.
  // For now, we proxy anything under /zarestia/rclone-manager/ to that specific project.

  if (url.pathname.startsWith('/zarestia/rclone-manager/')) {
    const proxyUrl = `https://rclone-manager.pages.dev${url.pathname}${url.search}`;
    return fetch(proxyUrl, context.request);
  }

  // Fallback: If you have a general "Zarestia" organization page, proxy to it here.
  // For now, let's just return a 404 or proxy to the main project if it exists.
  return new Response('Zarestia Organization Page - Coming Soon', {
    status: 404,
  });
};
