/**
 * @exports copy
 * @param a
 * @returns
 */
export declare function copy(a: any): any;
/**
 * @exports need
 * @param b
 * @param s
 */
export declare function need(b: any, s: string): void;
/**
 * omap - map over an object, returning a new object
 * @exports omap
 * @param {Object} obj
 * @param {Function} keyMapFunction - Transform operation to apply on the key.
 * @param {Function} [valueMapFunction] - Transform operation to apply on the value.
 * @returns {Object} out
 */
export declare function omap<K extends string, T, M>(x: {
    [P in K]: T;
}, f: (t: T) => M): {
    [P in K]: M;
};
