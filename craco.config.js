const path = require('path')

module.exports = {
  babel: {
    presets: [['@babel/preset-typescript', { allowNamespaces: true }]],
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
}
