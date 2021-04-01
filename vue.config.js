// process.env.VUE_APP_VERSION = require("./package.json").version;
// const GenerateAssetPlugin = require("generate-asset-webpack-plugin");
//
// let createConfig = function () {
//   let cfgJson = {
//     server_url: "http://127.0.0.1",
//   };
//
//   return JSON.stringify(cfgJson);
// };
// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new GenerateAssetPlugin({
//         filename: "dynamicConfig.json",
//         fn: (compilation, cb) => {
//           cb(null, createConfig(compilation));
//         },
//       }),
//     ],
//   },
// };
