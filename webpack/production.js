const webpack = require('webpack')

module.exports = {

  entry: `${__dirname}/../src/index.js`,


  output: {
    path: `${__dirname}/../www`,
    filename: 'bundle.min.js'
  },

  module: {
    loaders: [
      { test: /\.js$|\.jsx$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'raw' }
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
