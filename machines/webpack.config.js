const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dest = path.resolve(__dirname, './server/dist');
const {FORM} = process.env

module.exports = {
  entry: {
    index: './main.js',
  },
  output: {
    filename: 'bundle.[name].js',
    path: `${dest}`,
  },
  devServer: {
    port: 8081,
    inline: true,
    liveReload: false,
    historyApiFallback: true,
    proxy: {
      '/': 'http://127.0.0.1:4000'
    }
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$|.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyPlugin([
      {
        from: './styles', to: `${dest}/styles`
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.FORM': JSON.stringify(FORM)
    })
  ]
}