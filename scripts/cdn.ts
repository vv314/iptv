import axios from 'axios';
import type { Manifest } from './stats.js';

function getJsdelivrUrl(pathname: string) {
  return `https://purge.jsdelivr.net/gh/vv314/iptv@main/${pathname}`;
}

async function purgeCache(manifest: Manifest) {
  const urls = manifest.playlists
    .map((e) => {
      const pathname = e.filePath.replace('./', '');

      return getJsdelivrUrl(pathname);
    })
    .concat(getJsdelivrUrl('IPTV.m3u'));
  const results = await Promise.all(
    urls.map((url) => axios(url).then((res) => res.data))
  );

  return results;
}

export { purgeCache };
