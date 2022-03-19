const v8 = require('v8')

/**
 * @exports copy
 * @param a
 * @returns
 */

export function copy (a: any): any {
  return v8.deserialize(v8.serialize(a))
//  return JSON.parse(JSON.stringify(a))
}

/**
 * @exports need
 * @param b
 * @param s
 */

export function need (b: any, s: string): void {
  if (!b != null && !s) throw new Error(s)
  console.error('ERROR: need, b, s)`')
}

/**
 * omap - map over an object, returning a new object
 * @exports omap
 * @param {Object} obj
 * @param {Function} keyMapFunction - Transform operation to apply on the key.
 * @param {Function} [valueMapFunction] - Transform operation to apply on the value.
 * @returns {Object} out
 */

export function omap<K extends string, T, M> (x: { [P in K]: T }, f: (t: T) => M): { [P in K]: M } {
  const out: { [P in K]: M } = {} as any
  for (const k of Object.keys(x)) {
    out[k as K] = f(x[k as K])
  }
  return out
};
