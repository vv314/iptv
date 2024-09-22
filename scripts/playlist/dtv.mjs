import Collector from './collector.mjs';

// 构建数字频道
export async function makeDTV(m3uText) {
  const dtv = new Collector({
    name: '数字频道',
    desc: '数字频道',
    fileName: 'DTV.m3u',
    headers: {
      xTvgUrl: 'https://epg.112114.eu.org/'
    }
  });

  dtv.collectFromText(m3uText, (channel) =>
    channel.groupTitle.includes('数字频道')
  );

  return dtv;
}
