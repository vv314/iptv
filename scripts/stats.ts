import path from 'node:path';
import { readFileAsync, writeFileAsync } from './util.js';
import type { PlaylistCollector, Playlist } from './playlist/index.js';
import { BUILD_DIR } from './const.js';

export const MANIFEST_JSON = path.join(BUILD_DIR, 'manifest.json');
export const BUILD_VERSION = path.join(BUILD_DIR, 'VERSION');

export interface Manifest {
  playlists: Playlist[];
  updatedAt: string;
}

function writeManifest(collectors: PlaylistCollector[]) {
  const meta = {
    playlists: collectors.map((c) => c.toJSON()),
    updatedAt: new Date().toISOString()
  };

  return writeFileAsync(MANIFEST_JSON, JSON.stringify(meta, null, 2));
}

function readManifest() {
  return readFileAsync(MANIFEST_JSON, 'json');
}

function readBuildVersion() {
  return readFileAsync(BUILD_VERSION).catch(() => '');
}

function writeBuildVersion(val: string) {
  return writeFileAsync(BUILD_VERSION, val);
}

export { writeManifest, readManifest, readBuildVersion, writeBuildVersion };
