const webpack = require('webpack')

module.exports = {

  devtool: 'inline-source-map',
  debug: true,
  noInfo: true,

  entry: ['webpack/hot/dev-server', `${__dirname}/../src/index.js`],

  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$|\.jsx$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'raw' }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    })
  ],

  target: 'web'

}