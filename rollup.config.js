import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import svgr from "@svgr/rollup";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs(),
    svgr({
      icon: true,
      typescript: true,
    }),
    typescript({
      tsconfig: "./tsconfig.package.json",
      declaration: true,
      declarationDir: "dist",
    }),
    postcss({
      minimize: true,
      inject: true,
    }),
  ],
  external: ["react", "react-dom", "@heroicons/react/outline"],
};
