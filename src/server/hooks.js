import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @desc Converts a URL to file path and directory path
 * @param {string} url - the URL to convert, typically `import.meta.url`
 * @returns {{ __filename: string, __dirname: string }} - an object containing:
 *  - `__filename`: path of the current file
 *  - `__dirname`: directory path of the current file
 *
 * @author Hussam Aldarwish <hussam.aldarwish@hotmail.com>
 * @ref {@link https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/}
 */
export function usePathFromURL(url) {
  const __filename = fileURLToPath(url);
  const __dirname = path.dirname(__filename);
  return { __filename, __dirname };
}
