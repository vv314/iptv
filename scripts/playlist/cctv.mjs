import Collector from './collector.mjs';

// 构建央视频道
export async function makeCCTV(m3uText) {
  const cctv = new Collector({
    name: '央视频道',
    desc: '央视频道',
    fileName: 'CCTV.m3u',
    headers: {
      xTvgUrl: 'https://e.erw.cc/cc.xml.gz'
    }
  });

  cctv.collectFromText(m3uText, (channel) =>
    channel.groupTitle.includes('央视频道')
  );

  return cctv;
}
