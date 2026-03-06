import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import path from "node:path";

const __dirname = import.meta.dirname;

export default merge(common, {
  mode: "production",
  devtool: "source-map",
});
