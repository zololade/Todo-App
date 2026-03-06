import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import path from "node:path";

const __dirname = import.meta.dirname;

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
});
