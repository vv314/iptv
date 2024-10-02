import { copyFile } from 'node:fs/promises';
import path from 'node:path';
import buildPlaylist, { PlaylistCollector } from './playlist/index.js';
import buildReadme from './readme.js';
import { purgeCache } from './cdn.js';
import { md5 } from './util.js';
import { ROOT_DIR } from './const.js';
import {
  readBuildVersion,
  writeBuildVersion,
  readManifest,
  writeManifest
} from './stats.js';

async function commitPlaylists(
  collectors: PlaylistCollector[],
  version: string
) {
  await writeManifest(collectors);
  await writeBuildVersion(version);
  await Promise.all(collectors.map((c) => c.save()));

  const combo = collectors.find(
    (c) => c.fileName === 'IPTV.m3u'
  ) as PlaylistCollector;

  // 复制一份到根目录
  await copyFile(
    path.resolve(ROOT_DIR, combo.filePath),
    path.join(ROOT_DIR, combo.fileName)
  );
}

async function handlePlaylist() {
  const oldVer = await readBuildVersion();
  let playlists = [];

  try {
    playlists = await buildPlaylist();
  } catch (e) {
    console.error('Failed to build Playlist', e);
    process.exit(1);
  }

  const newVer = md5(JSON.stringify(playlists));
  const changes = oldVer !== newVer;

  if (changes) {
    await commitPlaylists(playlists, newVer);
  }

  console.log('[BUILD] Playlist done, changes:', changes);
}

async function handleReadme() {
  let manifest = null;

  try {
    manifest = await readManifest();
  } catch {
    console.error('Failed to load playlist data, run `playlist` command first');
    process.exit(1);
  }

  await buildReadme(manifest);

  console.log('[BUILD] README done');
}

async function handlePurge() {
  let manifest = null;

  try {
    manifest = await readManifest();
  } catch {
    console.error('Failed to load playlist data, run `playlist` command first');
    process.exit(1);
  }

  const results = await purgeCache(manifest);

  console.log(JSON.stringify(results, null, 2));
}

async function main(cmd: string) {
  switch (cmd) {
    case 'playlist':
      await handlePlaylist();
      break;
    case 'readme':
      await handleReadme();
      break;
    case 'purge':
      await handlePurge();
      break;
    default:
      console.error(`Unknown command: ${cmd}`);
      process.exit(1);
  }
}

// 获取命令行参数
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: node scripts/cmd.mjs <command>');
  process.exit(1);
}

main(args[0]);
