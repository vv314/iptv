import fetch from 'axios';
import { makeCCTV } from './cctv.mjs';
import { makeSATV } from './satv.mjs';
import { makeDTV } from './dtv.mjs';
import { makeCombo } from './combo.mjs';

async function makePlaylist() {
  const res = await fetch(
    'https://raw.githubusercontent.com/fanmingming/live/main/tv/m3u/ipv6.m3u'
  );
  const m3u = res.data;

  // 数组顺序敏感，影响整合文件的频道顺序
  const collections = await Promise.all([
    makeCCTV(m3u),
    makeSATV(m3u),
    makeDTV(m3u)
  ]);

  const combo = await makeCombo(collections);

  return [...collections, combo];
}

export default makePlaylist;
