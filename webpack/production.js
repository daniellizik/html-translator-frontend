const webpack = require('webpack')
const Extract = require('extract-text-webpack-plugin')
const MinCss = require('optimize-css-assets-webpack-plugin')
const cssProcessor = require('cssnano')

module.exports = {

  entry: {
    [`bundle.js`]: [
      'babel-polyfill',
      `${__dirname}/../src/entry/index.prod.js`
    ],
    [`style-light.css`]: `${__dirname}/../src/style/light.scss`,
    [`style-dark.css`]: `${__dirname}/../src/style/dark.scss`
  },

  output: {
    path: `${__dirname}/../build`,
    filename: '[name]'
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
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
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
    new Extract({filename: '[name]'}),
    new MinCss({cssProcessor})
  ]

}