import Collector from './collector.js';

// 构建卫视频道
export async function makeSATV(m3uText: string) {
  const satv = new Collector({
    name: '卫视频道',
    desc: '卫视频道',
    fileName: 'SATV.m3u',
    headers: {
      xTvgUrl: 'https://epg.112114.eu.org/'
    }
  });

  satv.collectFromText(m3uText, (channel) =>
    channel.groupTitle?.includes('卫视频道')
  );

  return satv;
}
