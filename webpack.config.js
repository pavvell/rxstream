const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

let plugins = [];

if (isProd) {
  plugins.push(
    new UglifyJsPlugin({
      beautify: false, //prod
      output: {
        comments: false
      },
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      },
      sourceMap: false
    })
  );
}

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        include: /app\/index/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: plugins
};