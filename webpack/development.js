const webpack = require('webpack')

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
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    })
  ]


}