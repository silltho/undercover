const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

const customConfig = {
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: './app/javascript/packs/registerServiceWorker.js'
    }),
    new Visualizer()
  ],
  module: {
    rules: [
      {
        test: /\.mp4/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimtetype: 'video/mp4'
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader?attrs[]=video:src'
      }
    ]
  }
}

const environment = require('./environment')

// Merge custom config
environment.config.merge(customConfig)

/*
environment.loaders.get('sass')
    .use.find((item) => item.loader === 'sass-loader')
        .options.includePaths = [resolve('app', 'javascript', 'styles')]
*/

module.exports = environment.toWebpackConfig()
