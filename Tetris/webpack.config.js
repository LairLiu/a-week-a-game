const path = require("path");

const config = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: ["ts-loader"], exclude: ["/node_modules/"] }
    ]
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  devtool: "source-map"
}

module.exports = config;