const path = require('path');


const config = {
  entry: './src/app.js',
  output: {
    path: '/home/zyr/new-comer-task/5-todo_lists/qwe',
    filename: 'app.js'
  },
  module:{
    rules:[
      {test:/\.css$/,use: 'css-loader'}
    ]
  },
  mode:'development'
};
module.exports = config;