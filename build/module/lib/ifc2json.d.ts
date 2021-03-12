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
export declare function ifc2json(source: string, options?: Ifc2JsonOptions): Promise<string>;
