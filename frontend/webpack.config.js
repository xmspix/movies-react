const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const isDevelopment = process.env.NODE_ENV !== "production";

const path = require("path");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

const sassWebpackPlugin = new MiniCssExtractPlugin({
  filename: isDevelopment ? "[name].css" : "[name].[hash].css",
  chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
});

const copyFiles = new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, "./public/img"),
    to: path.resolve(__dirname, "./dist/public/img")
  }
]);

const postfixPlugin = new webpack.LoaderOptionsPlugin({
  options: {
    postcss: [autoprefixer()]
  }
});

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx", ".scss"]
        },
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
      // {
      //   test: /\.s(a|c)ss$/,
      //   exclude: /\.module.(s(a|c)ss)$/,
      //   loader: [
      //     isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     {
      //       loader: "sass-loader",
      //       options: {
      //         sourceMap: isDevelopment
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [htmlWebpackPlugin, sassWebpackPlugin, postfixPlugin, copyFiles],
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    stats: "errors-only",
    proxy: {
      "/api": "http://localhost:3001"
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Accept-Encoding": "gzip, deflate"
    },
    https: false,
    inline: true,
    port: 3000,
    host: "localhost",
    disableHostCheck: true
  }
};
