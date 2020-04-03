const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
      new Dotenv(),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
  }