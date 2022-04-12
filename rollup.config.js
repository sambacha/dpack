import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from 'rollup-plugin-typescript2';
const packageJson = require("./package.json");

export default {
	input: './index.ts',
    output: [
        {
          file: packageJson.main,
          format: "cjs",
          sourcemap: true,
        },
        {
          file: 'dist/dpack.mjs',
          file: packageJson.module,
          format: "esm",
          sourcemap: true,
        },
      ],
 /*{   output: {
        file: `./test-builds/rollup/${path.basename(test)}`,
        format: "iife",
        name: "tests",
        sourcemap: true,
        exports: "named"
      },}*/
	plugins: [
    peerDepsExternal(),
        resolve({
            browser: true,
            preferBuiltins: false
          }),
        commonjs(),
        typescript({ rollupCommonJSResolveHack: true, clean: true }),
	]
}