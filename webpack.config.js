const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWbepackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "littlemodal.js",
    library: "littlemodal",
    libraryExport: 'default',
    libraryTarget: "umd",
    clean: true
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new HtmlWbepackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  target: ['es5'],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "sass-loader",
        ]
      }
    ],
  },
  mode: "development",
}