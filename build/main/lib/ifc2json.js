"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        var _a, _b, _c, _d, _e;
        if (!fs_1.default.existsSync(source)) {
            reject(new Error('Unable to open the source file'));
            return;
        }
        if ((_a = options) === null || _a === void 0 ? void 0 : _a.path) {
            reject(new Error('Path doesnt work, sorry. Make sur to have ConvertIfc2Json in your path'));
            return;
        }
        if (((_b = options) === null || _b === void 0 ? void 0 : _b.destination) && options.destination.substr(-5) !== '.json') {
            reject(new Error('Invalid destination file'));
            return;
        }
        const destination = ((_c = options) === null || _c === void 0 ? void 0 : _c.destination) ? options.destination : `${source}.json`;
        debug('Check if', destination, 'already exists');
        if (fs_1.default.existsSync(destination)) {
            if ((_d = options) === null || _d === void 0 ? void 0 : _d.replaceExistingFile) {
                debug('JSON destination file already exists and will be overwritten');
            }
            else {
                reject(new Error('JSON destination file already exists'));
            }
        }
        const binPath = ((_e = options) === null || _e === void 0 ? void 0 : _e.path) !== undefined
            ? `${options.path}/ConvertIfc2Json`
            : 'ConvertIfc2Json';
        const args = [source, destination];
        debug('Calling', binPath, 'with args', args);
        child_process_1.default.execFile(binPath, args, { maxBuffer: 1024 * 2000 }, 
        // tslint:disable-next-line: variable-name
        (err, stdout, stderr) => {
            var _a, _b;
            if ((_a = options) === null || _a === void 0 ? void 0 : _a.stdout) {
                options.stdout = stdout;
            }
            if ((_b = options) === null || _b === void 0 ? void 0 : _b.stderr) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZjMmpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2lmYzJqc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXlDO0FBQ3pDLDRDQUFvQjtBQUNwQixxRUFBcUU7QUFDckUsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBaUIzQzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILFNBQWdCLFFBQVEsQ0FDdEIsTUFBYyxFQUNkLE9BQXlCO0lBRXpCLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztRQUNyQyxJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE9BQU87U0FDUjtRQUVELFVBQUksT0FBTywwQ0FBRSxJQUFJLEVBQUU7WUFDakIsTUFBTSxDQUNKLElBQUksS0FBSyxDQUNQLHdFQUF3RSxDQUN6RSxDQUNGLENBQUM7WUFDRixPQUFPO1NBQ1I7UUFFRCxJQUFJLE9BQUEsT0FBTywwQ0FBRSxXQUFXLEtBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7WUFDdEUsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztZQUM5QyxPQUFPO1NBQ1I7UUFDRCxNQUFNLFdBQVcsR0FBRyxPQUFBLE9BQU8sMENBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDO1FBQ2xGLEtBQUssQ0FBQyxVQUFVLEVBQUUs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