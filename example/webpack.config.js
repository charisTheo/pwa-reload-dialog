const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new InjectManifest({
    swSrc: './sw.js',
    exclude: [/sw\.js/, /\.DS_Store$/],
  }),
];

module.exports = [
  {
    mode: 'none',
    entry: './dist.js',
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'build')
    },
    resolve: {
      // modules: [
      //   path.resolve(__dirname, 'node_modules'),
      // ]
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            { loader: 'babel-loader' },
            { loader: 'raw-loader' }
          ]
        },
        // {
        //   test: /(\.js$)/,
        //   use: 'babel-loader'
        // },
      ]
    },
    devServer: {
      contentBase: __dirname,
      compress: true,
      port: 9000
    },
    plugins: [...plugins]
  }
];