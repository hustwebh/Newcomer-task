const path = require('path');


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
  mode: 'development'
};
module.exports = config;