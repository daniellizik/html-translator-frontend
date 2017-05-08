const webpack = require('webpack')
const path = require('path')
const themes = require('../src/style/index.json')
const THEMES = Object.keys(themes).reduce((acc, k) => Object.assign({}, acc, {
  [k]: path.resolve(__dirname, '..', 'src', 'style', `${k}.scss`)
}), {})

module.exports = {

  devtool: 'source-map',

  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      `${__dirname}/../src/entry/index.dev.js`
    ]
  },

  output: {
    path: '/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { 
        THEME: JSON.stringify(THEMES),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]


}