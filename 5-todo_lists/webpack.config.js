const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'index'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
         new CleanWebpackPlugin(['dist']),
        ],
  mode: 'development'
};
module.exports = config;