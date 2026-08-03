/** A link is "real" only once its [ADD_*_URL] placeholder token is replaced. */
export const isRealLink = (url) => Boolean(url) && !url.startsWith('[ADD');
