import Collector, { type Channel } from './collector.js';

export async function makeCombo(collectors: Collector[]) {
  const channels = collectors.reduce(
    (acc, e) => [...acc, ...e.channels],
    [] as Channel[]
  );
  const combo = new Collector({
    name: '全部频道',
    desc: collectors.map((e) => e.name).join('+'),
    fileName: 'IPTV.m3u',
    headers: {
      xTvgUrl: 'https://epg.112114.eu.org/'
    }
  });

  combo.channels = channels;

  return combo;
}
