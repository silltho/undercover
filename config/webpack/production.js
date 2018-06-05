const workboxPlugin = require('workbox-webpack-plugin')

const customConfig = {
  plugins: [
    new workboxPlugin.InjectManifest({
      swSrc: '../../app/javascript/sw.js',
      swDest: '../../public/sw.js'
    })
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
