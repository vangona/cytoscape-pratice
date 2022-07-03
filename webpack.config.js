const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// html 파일 추출 플러그인입니다
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css 파일 추출 플러그인입니다
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// build 폴더 자동 정리를 위한 플러그인 입니다

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname + "/build"),
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "app"),
    },

    hot: true,
    historyApiFallback: { index: "index.html" },
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"],
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
    // js, jsx, html, css 파일 번들링 관련 설정입니다
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CleanWebpackPlugin(),
    // 플러그인 설정들입니다
  ],
};
