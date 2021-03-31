"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifc2json = void 0;
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
// tslint:disable-next-line: no-var-requires no-implicit-dependencies
const debug = require('debug')('ifc2json');
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
function ifc2json(source, options) {
    debug('Prepare conversion of', source);
    return new Promise((resolve, reject) => {
        if (!fs_1.default.existsSync(source)) {
            reject(new Error('Unable to open the source file'));
            return;
        }
        if (options === null || options === void 0 ? void 0 : options.path) {
            reject(new Error('Path doesnt work, sorry. Make sur to have ConvertIfc2Json in your path'));
            return;
        }
        if ((options === null || options === void 0 ? void 0 : options.destination) && options.destination.substr(-5) !== '.json') {
            reject(new Error('Invalid destination file'));
            return;
        }
        const destination = (options === null || options === void 0 ? void 0 : options.destination) ? options.destination : `${source}.json`;
        debug('Check if', destination, 'already exists');
        if (fs_1.default.existsSync(destination)) {
            if (options === null || options === void 0 ? void 0 : options.replaceExistingFile) {
                debug('JSON destination file already exists and will be overwritten');
            }
            else {
                reject(new Error('JSON destination file already exists'));
            }
        }
        const binPath = (options === null || options === void 0 ? void 0 : options.path) !== undefined
            ? `${options.path}/ConvertIfc2Json`
            : 'ConvertIfc2Json';
        const args = [source, destination];
        debug('Calling', binPath, 'with args', args);
        child_process_1.default.execFile(binPath, args, { maxBuffer: 1024 * 2000 }, 
        // tslint:disable-next-line: variable-name
        (err, stdout, stderr) => {
            if (options === null || options === void 0 ? void 0 : options.stdout) {
                options.stdout = stdout;
            }
            if (options === null || options === void 0 ? void 0 : options.stderr) {
                options.stderr = stderr;
            }
            if (err) {
                debug('Error', err.code, ':', err.message);
                if (err.code === 1) {
                    reject(new Error('Error 1: Invalid file format'));
                }
                else if (err.code === 2) {
                    reject(new Error('Error 2: Invalid filename'));
                }
                else if (err.code === 3) {
                    reject(new Error('Error 3: Encoding error'));
                }
                else {
                    reject(new Error(`Error ${err.code}: General Error; ${err.message}`));
                }
            }
            else if (stderr.length > 0) {
                debug('StdError: ', stderr.toString());
                reject(new Error(stderr.toString()));
            }
            else {
                debug('Conversion successful');
                resolve(destination);
            }
        });
    });
}
exports.ifc2json = ifc2json;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZjMmpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2lmYzJqc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUF5QztBQUN6Qyw0Q0FBb0I7QUFDcEIscUVBQXFFO0FBQ3JFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQWlCM0M7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxTQUFnQixRQUFRLENBQ3RCLE1BQWMsRUFDZCxPQUF5QjtJQUV6QixLQUFLLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLElBQUksRUFBRTtZQUNqQixNQUFNLENBQ0osSUFBSSxLQUFLLENBQ1Asd0VBQXdFLENBQ3pFLENBQ0YsQ0FBQztZQUNGLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsV0FBVyxLQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFO1lBQ3RFLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7WUFDOUMsT0FBTztTQUNSO1FBQ0QsTUFBTSxXQUFXLEdBQUcsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxD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