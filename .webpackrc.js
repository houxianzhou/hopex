const path = require('path')
export default {
  entry: 'src/index.js',
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  publicPath: '/',
  hash: true,
  "alias": {
    "@routes": path.resolve(__dirname, "./src/routes"),
    "@models": path.resolve(__dirname, "./src/models"),
    "@services": path.resolve(__dirname, "./src/services"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@utils": path.resolve(__dirname, "./src/utils"),
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@constants": path.resolve(__dirname, "./src/constants"),
    "@common": path.resolve(__dirname, "./src/common")
    // "@mock": path.resolve(__dirname, "./mock"),
    // "@constants": path.resolve(__dirname, "./src/constants"),
    // "@roadhog": path.resolve(__dirname, "./roadhog")
  }
}
