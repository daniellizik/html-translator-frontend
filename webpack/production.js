const webpack = require('webpack')

module.exports = {

  entry: {
    'app': [
      'babel-polyfill',
      `${__dirname}/../src/entry/index.prod.js`
    ]
  },

  output: {
    path: `${__dirname}/../www`,
    filename: 'bundle.min.js'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    })
  ]

}
