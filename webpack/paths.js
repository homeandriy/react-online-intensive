// Instruments
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// __filename та __dirname у ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Core
export const source = resolve(__dirname, '../source');
export const build = resolve(__dirname, '../build');
export const statics = resolve(__dirname, '../static');
