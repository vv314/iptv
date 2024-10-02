import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const ROOT_DIR = fileURLToPath(new URL('..', import.meta.url));
export const BUILD_DIR = resolve(ROOT_DIR, '.build');
export const M3U_DEST_DIR = resolve(ROOT_DIR, 'm3u');
export const SRC_DIR = resolve(ROOT_DIR, 'src');
export const README_DIR = resolve(SRC_DIR, 'readme');
