const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

const customConfig = {
    plugins: [
        new ServiceWorkerWebpackPlugin({
            entry: './app/javascript/packs/registerServiceWorker.js'
        }),
    ]
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
