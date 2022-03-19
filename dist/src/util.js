"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omap = exports.need = exports.copy = void 0;
const v8 = require('v8');
/**
 * @exports copy
 * @param a
 * @returns
 */
function copy(a) {
    return v8.deserialize(v8.serialize(a));
    //  return JSON.parse(JSON.stringify(a))
}
exports.copy = copy;
/**
 * @exports need
 * @param b
 * @param s
 */
function need(b, s) {
    if (!b != null && !s)
        throw new Error(s);
    console.error('ERROR: need, b, s)`');
}
exports.need = need;
/**
 * omap - map over an object, returning a new object
 * @exports omap
 * @param {Object} obj
 * @param {Function} keyMapFunction - Transform operation to apply on the key.
 * @param {Function} [valueMapFunction] - Transform operation to apply on the value.
 * @returns {Object} out
 */
function omap(x, f) {
    const out = {};
    for (const k of Object.keys(x)) {
        out[k] = f(x[k]);
    }
    return out;
}
exports.omap = omap;
;
