const v8 = require('v8');
/**
 * @exports copy
 * @param a
 * @returns
 */
export function copy(a) {
    return v8.deserialize(v8.serialize(a));
    //  return JSON.parse(JSON.stringify(a))
}
/**
 * @exports need
 * @param b
 * @param s
 */
export function need(b, s) {
    if (!b != null && !s)
        throw new Error(s);
    console.error('ERROR: need, b, s)`');
}
/**
 * omap - map over an object, returning a new object
 * @exports omap
 * @param {Object} obj
 * @param {Function} keyMapFunction - Transform operation to apply on the key.
 * @param {Function} [valueMapFunction] - Transform operation to apply on the value.
 * @returns {Object} out
 */
export function omap(x, f) {
    const out = {};
    for (const k of Object.keys(x)) {
        out[k] = f(x[k]);
    }
    return out;
}
;
