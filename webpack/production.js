const webpack = require('webpack')
const Extract = require('extract-text-webpack-plugin')
const MinCss = require('optimize-css-assets-webpack-plugin')
const cssProcessor = require('cssnano')

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
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader' 
      },
      { 
        test: /\.json$/, 
        exclude: /node_modules/, 
        loader: 'json-loader' 
      },
      { 
        test: /\.html$/, 
        exclude: /node_modules/, 
        loader: 'raw-loader' 
      },
      { 
        test: /\.scss$/, 
        exclude: /node_modules/, 
        use: Extract.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        }) 
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    }),
    new Extract('style.css'),
    new MinCss({cssProcessor})
  ]

}
