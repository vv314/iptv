import path from 'node:path';
import { parseM3U, writeM3U } from '@iptv/playlist';
import { M3U_DEST_DIR, ROOT_DIR } from '../const.mjs';
import { writeFileAsync } from '../util.mjs';

class PlaylistCollector {
  channels = [];

  get filePath() {
    return path.join(this.destDir, this.fileName);
  }

  constructor(opts) {
    this.name = opts.name ?? '';
    this.desc = opts.desc ?? opts.name ?? '';
    this.fileName = opts.fileName ?? 'IPTV.m3u';
    this.headers = opts.headers ?? {};
    this.destDir = opts.destDir ?? M3U_DEST_DIR;
  }

  collectFromText(m3uText, filter) {
    const m3uObj = parseM3U(m3uText);
    const channels = m3uObj.channels.filter(filter);

    this.channels = this.channels.concat(channels);

    return this.channels;
  }

  async collectFromUrl(url, filter) {
    const m3uText = await fetch(url).then((res) => res.text());

    return this.collectFromText(m3uText, filter);
  }

  async save() {
    const text = writeM3U({
      channels: this.channels,
      headers: this.headers
    });

    await writeFileAsync(this.filePath, text);
  }

  toJSON() {
    return {
      name: this.name,
      desc: this.desc,
      fileName: this.fileName,
      filePath: `./${path.relative(ROOT_DIR, this.filePath)}`,
      total: this.channels.length,
      channels: this.channels
    };
  }
}

export default PlaylistCollector;
