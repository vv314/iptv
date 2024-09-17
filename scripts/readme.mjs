import path from 'node:path';
import { readdir } from 'node:fs/promises';
import Mustache from 'mustache';
import { ROOT_DIR, README_DIR } from './const.mjs';
import { readFileAsync, writeFileAsync } from './util.mjs';

const TMPL_PATH = path.resolve(README_DIR, 'template.md');
const DEST_PATH = path.resolve(ROOT_DIR, 'README.md');

function getViewData(manifest) {
  const playlists = manifest.playlists
    .filter((e) => e.name !== '全部频道')
    .map((e) => ({
      cate: e.name,
      total: e.total,
      channels: e.channels.map((c) => c.name).join('、')
    }));
  const assets = manifest.playlists.map((e) => ({
    desc: e.desc,
    fileName: e.fileName,
    filePath: e.filePath
  }));

  return {
    assets,
    playlists
  };
}

// 匹配 README_DIR/_*.md 为 partials
async function getPartials() {
  const files = await readdir(README_DIR);
  const regExp = /^_(.+)\.md$/;
  const partials = {};

  for (const file of files) {
    const match = file.match(regExp);

    if (!match) {
      continue;
    }

    const partialName = match[1];

    partials[partialName] = await readFileAsync(path.resolve(README_DIR, file));
  }

  return partials;
}

async function buildReadme(manifest) {
  const tmpl = await readFileAsync(TMPL_PATH);
  const viewData = getViewData(manifest);
  const partials = await getPartials();
  const output = Mustache.render(tmpl, viewData, partials);

  return writeFileAsync(DEST_PATH, output);
}

export default buildReadme;
