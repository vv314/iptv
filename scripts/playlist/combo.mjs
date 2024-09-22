import Collector from './collector.mjs';

export async function makeCombo(groups) {
  const channels = groups.reduce((acc, e) => [...acc, ...e.channels], []);
  const combo = new Collector({
    name: '全部频道',
    desc: groups.map((e) => e.name).join('+'),
    fileName: 'IPTV.m3u',
    headers: {
      xTvgUrl: 'https://epg.112114.eu.org/'
    }
  });

  combo.channels = channels;

  return combo;
}
