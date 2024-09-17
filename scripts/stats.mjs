import path from 'node:path';
import { readFileAsync, writeFileAsync } from './util.mjs';
import { BUILD_DIR } from './const.mjs';

export const MANIFEST_JSON = path.join(BUILD_DIR, 'manifest.json');
export const BUILD_VERSION = path.join(BUILD_DIR, 'VERSION');

function writeManifest(playlists) {
  const meta = {
    playlists: playlists.map((e) => e.toJSON()),
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

function writeBuildVersion(val) {
  return writeFileAsync(BUILD_VERSION, val);
}

export { writeManifest, readManifest, readBuildVersion, writeBuildVersion };
