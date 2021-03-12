import childProcess from 'child_process';
import fs from 'fs';
// tslint:disable-next-line: no-var-requires no-implicit-dependencies
const debug = require('debug')('ifc2json');

/**
 * Options for [[ifc2json]]
 *
 * @param destination           Path to the destination file. If ommited, the converted file will have the original name with .json added to it
 * @param replaceExistingFile   If true, the destination file will be replace if it exists. Otherwise the function will throw an error
 * @param path                  Absolute path to the ConvertIfc2Json binary (do not work yet)
 */
export interface Ifc2JsonOptions {
  readonly destination?: string;
  readonly replaceExistingFile?: boolean;
  readonly path?: string;
  stdout?: string;
  stderr?: string
}

/**
 * Wrapper for ConvertIfc2Json command.
 *
 * ### Example
 * ```js
 * import { ifc2json } from 'ifc2json-wrapper'
 * ifc2json(filepath, {replaceExistingFile: true});
 * // a new file will be created with the .json extension added to the given path
 * ```
 *
 * @param source Path to the original .ifc file
 * @param options
 * @returns         Destination of the converted .json file
 * @anotherNote     `ConvertIfc2Json` must be in the $PATH of the system
 */
export function ifc2json(
  source: string,
  options?: Ifc2JsonOptions
): Promise<string> {
  debug('Prepare conversion of', source);
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(source)) {
      reject(new Error('Unable to open the source file'));
      return;
    }

    if (options?.path) {
      reject(
        new Error(
          'Path doesnt work, sorry. Make sur to have ConvertIfc2Json in your path'
        )
      );
      return;
    }

    if (options?.destination && options.destination.substr(-5) !== '.json') {
      reject(new Error('Invalid destination file'));
      return;
    }
    const destination = options?.destination ? options.destination : `${source}.json`;
    debug('Check if', destination, 'already exists');

    if (fs.existsSync(destination)) {
      if (options?.replaceExistingFile) {
        debug('JSON destination file already exists and will be overwritten');
      } else {
        reject(new Error('JSON destination file already exists'));
      }
    }

    const binPath =
      options?.path !== undefined
        ? `${options.path}/ConvertIfc2Json`
        : 'ConvertIfc2Json';
    const args: ReadonlyArray<any> = [source, destination];

    debug('Calling', binPath, 'with args', args);

    childProcess.execFile(
      binPath,
      args,
      { maxBuffer: 1024 * 2000 },
      // tslint:disable-next-line: variable-name
      (err, stdout, stderr) => {
        if (options?.stdout) {
          options.stdout = stdout;
        }
        if (options?.stderr) {
          options.stderr = stderr;
        }
        if (err) {
          debug('Error', err.code, ':', err.message);
          if (err.code === 1) {
            reject(new Error('Error 1: Invalid file format'));
          } else if (err.code === 2) {
            reject(new Error('Error 2: Invalid filename'));
          } else if (err.code === 3) {
            reject(new Error('Error 3: Encoding error'));
          } else {
            reject(new Error(`Error ${err.code}: General Error; ${err.message}`));
          }
        } else if (stderr.length > 0) {
          debug('StdError: ', stderr.toString());
          reject(new Error(stderr.toString()));
        } else {
          debug('Conversion successful');
          resolve(destination);
        }
      }
    );
  });
}
