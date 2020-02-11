const path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'example'),
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: /(node_modules)/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: { 
                insert: 'head',
                injectType: 'singletonStyleTag'
              },
            },
            "css-loader"
          ]
        }
      ]
    }
  },

  {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      libraryTarget: 'var',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: /(node_modules)/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: { 
                insert: 'head',
                injectType: 'singletonStyleTag'
              },
            },
            "css-loader"
          ]
        }
      ]
    }
  }
];