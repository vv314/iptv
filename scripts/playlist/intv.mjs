import Collector from './collector.mjs';

// 构建海外频道
export async function makeINTV() {
  const intv = new Collector({
    name: '海外频道',
    desc: '海外频道',
    fileName: 'INTV.m3u'
  });

  return intv;
}
