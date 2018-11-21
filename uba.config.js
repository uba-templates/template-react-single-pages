/**
 * 核心配置文件
 */

const path = require("path");
const hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

//服务启动设置
const svrConfig = {
  historyApiFallback: false
};

//远程代理访问，可以配置多个代理服务
const proxyConfig = [{
  enable: true,
  router: "/api/",
  headers: { "X-XSS": "X-XSS" },
  pathRewrite: { '^/mes': '' },
  url: "http://cnodejs.org"
}, {
  enable: true,
  router: ["/users/", "/orgs/"],
  url: "https://api.github.com"
}];



//提取package里的包
function getVendors() {
  let pkg = require("./package.json");
  let _vendors = [];
  for (const key in pkg.dependencies) {
    _vendors.push(key);
  }
  return _vendors;
}


//优化配置，对于使用CDN作为包资源的引用从外到内的配置
const externals = {
  "axios": "axios",
  "react": "React",
  "react-dom": "ReactDOM",
  "tinper-bee": "TinperBee"
}

//默认加载扩展名、相对JS路径模块的配置
const resolve = {
  extensions: [
    ".jsx", ".js", ".less", ".css", ".json"
  ],
  alias: {
    components: path.resolve(__dirname, "src/components/"),
    modules: path.resolve(__dirname, "src/modules/"),
    routes: path.resolve(__dirname, "src/routes/"),
    layout: path.resolve(__dirname, "src/layout/"),
    utils: path.resolve(__dirname, "src/utils/")
  }
}

//开发和生产需要的loader
const rules = [{
  test: /\.js[x]?$/,
  exclude: /(node_modules)/,
  include: path.resolve("src"),
  use: [{
    loader: "babel-loader"
  }]
}, {
  test: /\.css$/,
  use: [{
    loader: MiniCssExtractPlugin.loader
  }, {
    loader: 'css-loader',
    options: {
      url: true,
      root: path.resolve('.')
    }
  }, {
    loader: 'postcss-loader'
  }]
}, {
  test: /\.less$/,
  use: [{
    loader: MiniCssExtractPlugin.loader
  },
  {
    loader: 'css-loader',
    options: {
      url: true,
      root: path.resolve('.')
    }
  }, {
    loader: 'postcss-loader'
  },
  {
    loader: 'less-loader'
  }
  ]
}, {
  test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
  exclude: /favicon\.png$/,
  use: [{
    loader: "url-loader",
    options: {
      limit: 8196,
      name: "images/[name].[ext]"
    }
  }]
}, {
  test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
  use: [{
    loader: "file-loader",
    options: {
      name: "images/[name].[ext]"
    }
  }]
}]

const optimization = {
  //提取公共模块，webpack4去除了CommonsChunkPlugin，使用SplitChunksPlugin作为替代
  //主要用于多页面
  //例子代码 https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
  //SplitChunksPlugin配置，其中缓存组概念目前不是很清楚
  splitChunks: {
    // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
    chunks: "all",
    // 表示在压缩前的最小模块大小，默认为0；
    minSize: 30000,
    //表示被引用次数，默认为1
    minChunks: 1,
    //最大的按需(异步)加载次数，默认为1；
    maxAsyncRequests: 3,
    //最大的初始化加载次数，默认为1；
    maxInitialRequests: 3,
    // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
    name: true,
    //缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
    cacheGroups: {
      //缓存组信息，名称可以自己定义
      commons: {
        //拆分出来块的名字,默认是缓存组名称+"~" + [name].js
        name: "commons",
        // 同上
        chunks: "all",
        // 同上
        minChunks: 3,
        // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
        enforce: true,
        //test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
        test: ""
      },
      //设置多个缓存规则
      vendor: {
        test: /node_modules/,
        chunks: "all",
        name: "vendor",
        //表示缓存的优先级
        priority: 10,
        enforce: true
      }
    }
  }
};

//开发环境的webpack配置
const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    //vendors: getVendors(),
    app: ["./src/app.jsx", hotMiddlewareScript]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  optimization: optimization,
  externals: externals,
  module: {
    rules: rules
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'build:uba by yueming@yonyou.com hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: "body",
      hash: false,
      favicon: "./src/static/images/favicon.png",
    })
  ],
  resolve: resolve
}


//生产环境的webpack配置
const prodConfig = {
  mode: "production",
  devtool: "source-map",
  entry: {
    vendors: getVendors(),
    app: "./src/app.jsx"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: ""
  },
  optimization: optimization,
  externals: externals,
  module: {
    rules: rules
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: "body",
      hash: true,
      favicon: "./src/static/images/favicon.png"
    })
  ],
  resolve: resolve
}

//最终向uba导出配置文件
module.exports = {
  devConfig,
  prodConfig,
  svrConfig,
  proxyConfig
};
