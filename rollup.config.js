
import pkg from "./package.json";
import minify from "rollup-plugin-minify-es"
import resolve from "rollup-plugin-node-resolve"
import sourcemaps from 'rollup-plugin-sourcemaps'
import typescript from "rollup-plugin-typescript2"

export default [
  {
    input: "src/core.ts",
    external: [
      "querystring",
      ...Object.keys(pkg.dependencies)
    ],
    plugins: [
      minify(),
      resolve(),
      sourcemaps(),
      typescript()
    ],
    output: {
      file: `${pkg.main}.js`,
      format: "cjs",
      exports: "named",
      sourcemap: true
    }
  }
]
