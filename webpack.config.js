var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var fs = require("fs");

var package = fs.readFileSync("package.json", "utf-8");
package = JSON.parse(package);

module.exports = {
  module: {
    rules: [
      {
        test: /(\.|lib)\/\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ]
  },
  entry: "./index.js",
  output: {
    filename: "dist/" + package.name + ".js"
  },
  plugins: [new UglifyJSPlugin()]
};
