
import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: "src/core.mjs",
    external: [
      "querystring",
      ...Object.keys(pkg.dependencies)
    ],
    plugins: [
      resolve(),  // preferBuiltins: true
      babel({ ...pkg.babel, babelrc: false })
    ],
    output: [
      { file: `${pkg.main}.js`, format: "cjs", exports: "named" },
      { file: `${pkg.main}.mjs`, format: "esm" }
    ]
  }
]
