/* eslint-disable no-undef */
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  // watch: true, untuk live server
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    assetModuleFilename: "img/[name][ext]", // ++untuk men generate file img src img ke dist sesuai dengan nama nya dan ditambahkan hash + extention
    clean: true,
  },
});
