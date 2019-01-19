const path = require('path')
export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    // ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }],
    ["lodash", { "id": ["async", "lodash-bound"] }]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": ["dva-hmr"]
    },
  },

  // extraBabelPresets:[
  //   ["@babel/env", { "targets": { "node": 6 } }]
  // ],
  "html": {
    "template": "./src/index.ejs"
  },
  hash: true,
  publicPath: '/',
  proxy: {
    "/api/v1/User/*": {
      target: 'http://192.168.70.131:5001',
      // target: 'http://192.168.70.131:5003',
      changeOrigin: true
    },
    "/api/v1/gateway/*": {
      // target: 'http://192.168.70.131:5001',
      target: 'http://192.168.70.131:5003',
      changeOrigin: true
    },
    "/api/v1/country/*": {
      // target: 'http://192.168.70.131:5001',
      target: 'http://192.168.70.131:5001',
      changeOrigin: true
    }
  },
  alias: {
    "@routes": path.resolve(__dirname, "./src/routes"),
    "@models": path.resolve(__dirname, "./src/models"),
    "@services": path.resolve(__dirname, "./src/services"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@utils": path.resolve(__dirname, "./src/utils"),
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@constants": path.resolve(__dirname, "./src/constants"),
    "@common": path.resolve(__dirname, "./src/common"),
    "@mock": path.resolve(__dirname, "./mock"),
    "@plugins": path.resolve(__dirname, "./src/plugins"),
    "@styles": path.resolve(__dirname, "./src/styles")
  },
  ignoreMomentLocale: true,
  theme: './src/utils/lessvar.js'
}
