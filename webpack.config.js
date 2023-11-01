const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.[contenthash].bundle.js",
    assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src/"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: { contentBase: path.join(__dirname, "src"), port: 3001, historyApiFallback: true },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // post process the compiled CSS
        ],
      },
      // {
      //   test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
      //   type: "asset/resource",
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 10000,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif|jp2|webp|avif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new CopyPlugin({
      patterns: [
        { from: "sitemap.xml", to: "sitemap.xml", force: true },
        { from: "robots.txt", to: "robots.txt", force: true },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
};
