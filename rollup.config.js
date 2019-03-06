
import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import minify from "rollup-plugin-minify-es"
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps'

export default [
  {
    input: "src/core.mjs",
    external: [
      "querystring",
      ...Object.keys(pkg.dependencies)
    ],
    plugins: [
      minify(),
      resolve(),
      sourcemaps()
    ],
    output: {
      file: `${pkg.main}.js`,
      format: "cjs",
      exports: "named",
      sourcemap: true
    }
  }
]
