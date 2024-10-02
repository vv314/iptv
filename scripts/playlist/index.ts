import fetch from 'axios';
import { makeCCTV } from './cctv.js';
import { makeSATV } from './satv.js';
import { makeDTV } from './dtv.js';
import { makeCombo } from './combo.js';

export { PlaylistCollector, type Playlist } from './collector.js';

async function makePlaylist() {
  const res = await fetch(
    'https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/ipv6.m3u'
  );
  const m3u = res.data;

  // 数组顺序敏感，影响整合文件的频道顺序
  const collectors = await Promise.all([
    makeCCTV(m3u),
    makeSATV(m3u),
    makeDTV(m3u)
  ]);

  const combo = await makeCombo(collectors);

  return [...collectors, combo];
}

export default makePlaylist;
