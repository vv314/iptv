import path from 'node:path';
import { readdir } from 'node:fs/promises';
import Mustache from 'mustache';
import { ROOT_DIR, README_DIR } from './const.js';
import { readFileAsync, writeFileAsync } from './util.js';
import type { Manifest } from './stats.js';

const TMPL_PATH = path.resolve(README_DIR, 'template.md');
const DEST_PATH = path.resolve(ROOT_DIR, 'README.md');

function getViewData(manifest: Manifest) {
  const playlists = manifest.playlists
    .filter((e) => e.name !== '全部频道')
    .map((e) => ({
      cate: e.name,
      fileName: e.fileName,
      total: e.total,
      channels: e.channels.map((c) => c.name).join('、')
    }));
  const assets = manifest.playlists.map((e) => ({
    desc: e.desc,
    total: e.total,
    fileName: e.fileName,
    filePath: e.filePath
  }));

  return {
    assets,
    playlists
  };
}

// 匹配 README_DIR/_*.md 为 partials
async function getTmplPartials() {
  const files = await readdir(README_DIR);
  const regExp = /^_(.+)\.md$/;
  const partials: Record<string, string> = {};

  for (const file of files) {
    const match = file.match(regExp);

    if (!match) {
      continue;
    }

    const name = match[1];
    const source = await readFileAsync(path.resolve(README_DIR, file));

    partials[name] = source;
  }

  return partials;
}

async function buildReadme(manifest: Manifest) {
  const tmpl = await readFileAsync(TMPL_PATH);
  const viewData = getViewData(manifest);
  const partials = await getTmplPartials();
  const output = Mustache.render(tmpl, viewData, partials);

  return writeFileAsync(DEST_PATH, output);
}

export default buildReadme;
