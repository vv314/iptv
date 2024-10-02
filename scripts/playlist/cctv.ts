import Collector from './collector.js';

// 构建央视频道
export async function makeCCTV(m3uText: string) {
  const cctv = new Collector({
    name: '央视频道',
    desc: '央视频道',
    fileName: 'CCTV.m3u',
    headers: {
      xTvgUrl: 'https://epg.112114.eu.org/'
    }
  });

  cctv.collectFromText(m3uText, (channel) =>
    channel.groupTitle?.includes('央视频道')
  );

  return cctv;
}
