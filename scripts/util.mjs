import { dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

export const readFileAsync = async (fileName, type = 'text') => {
  const text = await readFile(fileName, { encoding: 'utf8' });

  if (type === 'json') {
    return JSON.parse(text);
  }

  return text;
};
export const writeFileAsync = async (path, content) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, { encoding: 'utf8', flag: 'w' });
};

export const md5 = (str) => {
  return createHash('md5').update(str).digest('hex');
};
