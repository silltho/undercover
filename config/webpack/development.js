/* eslint-disable no-undef */
const environment = require('./environment')

/*
environment.loaders.get('sass')
    .use.find((item) => item.loader === 'sass-loader')
        .options.includePaths = [resolve('app', 'javascript', 'styles')]
*/

module.exports = environment.toWebpackConfig()
