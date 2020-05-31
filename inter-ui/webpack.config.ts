const webpack = require('webpack')
const path = require('path')
const MiniCssExtract = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPluginProd = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: './index.ts',
  output: {
    path: path.join(__dirname, 'cdn'),
    filename: 'style.js',
  },
  plugins: [
    new MiniCssExtract({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCSSAssetsPluginProd({})],
  },
  module: {
    rules: [
      {
        test: /\.(styl)$/,
        use: [
          {
            loader: MiniCssExtract.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtract.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        ],
      },
    ],
  },
}
