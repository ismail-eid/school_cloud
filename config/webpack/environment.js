const { environment } = require('@rails/webpacker')

const path = require('path')

const customConfig = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
      '@util': path.resolve(__dirname, '..', '..', 'app/javascript/src/util')
    }
  }
}

environment.config.merge(customConfig)

module.exports = environment
