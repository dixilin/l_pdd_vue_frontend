const path = require("path");

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  devServer: {
    proxy: {
      '/api': { //前端任何含/api的URL请求都会被反向代理。如http://localhost:8000/xxx/api/source/xxx的请求会变成服务器的反向代理请求
        target: 'http://39.101.198.23:3333', //原来请求的服务器IP地址会换成此地址，如以上地址会变成http://localhost:3333/xxx/api/source/xxx
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '/api' //路径重写 这里会对反向代理的地址进行重写。比如我的实际后端资源的URI是http://localhost:3333/api/resource，那么不加这个配置属性的话是访问不到我这个有效地址的。这里配置是一个正则替换，替换后就是后端api真正有效的地址了
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@apis", resolve("src/apis"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@utils", resolve("src/utils"))
      .set("@views", resolve("src/views"))
      .set("@styles", resolve("src/styles"))
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5,
            minPixelValue: 2,
            propList: ['*'],
          })
        ]
      }
    }
  }
}