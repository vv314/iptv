import Collector from './collector.mjs';

// 构建卫视频道
export async function makeSATV(m3uText) {
  const satv = new Collector({
    name: '卫视频道',
    desc: '卫视频道',
    fileName: 'SATV.m3u',
    headers: {
      xTvgUrl: 'https://e.erw.cc/cc.xml'
    }
  });

  satv.collectFromText(m3uText, (channel) =>
    channel.groupTitle.includes('卫视频道')
  );

  return satv;
}
