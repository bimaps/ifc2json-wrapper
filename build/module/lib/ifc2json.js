import childProcess from 'child_process';
import fs from 'fs';
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
export function ifc2json(source, options) {
    debug('Prepare conversion of', source);
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(source)) {
            reject(new Error('Unable to open the source file'));
            return;
        }
        if (options?.path) {
            reject(new Error('Path doesnt work, sorry. Make sur to have ConvertIfc2Json in your path'));
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
            }
            else {
                reject(new Error('JSON destination file already exists'));
            }
        }
        const binPath = options?.path !== undefined
            ? `${options.path}/ConvertIfc2Json`
            : 'ConvertIfc2Json';
        const args = [source, destination];
        debug('Calling', binPath, 'with args', args);
        childProcess.execFile(binPath, args, { maxBuffer: 1024 * 2000 }, 
        // tslint:disable-next-line: variable-name
        (err, _stdout, stderr) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZjMmpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2lmYzJqc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDcEIscUVBQXFFO0FBQ3JFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQWUzQzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sVUFBVSxRQUFRLENBQ3RCLE1BQWMsRUFDZCxPQUF5QjtJQUV6QixLQUFLLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxFQUFFLElBQUksRUFBRTtZQUNqQixNQUFNLENBQ0osSUFBSSxLQUFLLENBQ1Asd0VBQXdFLENBQ3pFLENBQ0YsQ0FBQztZQUNGLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxFQUFFLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtZQUN0RSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE9BQU87U0FDUjtRQUNELE1BQU0sV0FBVyxHQUFHLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUM7UUFDbEYsS0FBSyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUVqRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxPQUFPLEVBQUUsbUJBQW1CLEVBQUU7Z0JBQ2hDLEtBQUssQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO2FBQ3ZFO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7U0FDRjtRQUVELE1BQU0sT0FBTyxHQUNYLE9BQU8sRUFBRSxJQUFJLEtBQUssU0FBUztZQUN6QixDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxrQkFBa0I7WUFDbkMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3hCLE1BQU0sSUFBSSxHQUF1QixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV2RCxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0MsWUFBWSxDQUFDLFFBQVEsQ0FDbkIsT0FBTyxFQUNQLElBQUksRUFDSixFQUFFLFNBQVMsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFO1FBQzFCLDBDQUEwQztRQUMxQyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7aUJBQ25EO3FCQUFNLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7aUJBQ2hEO3FCQUFNLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7aUJBQzlDO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLG9CQUFvQixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUN2RTthQUNGO2lCQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLEtBQUssQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUMvQixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9