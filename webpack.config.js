var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/scss/style.scss'],
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { 
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ 
      filename: 'style.css',
      allChunks: true,
    })
  ],
};
