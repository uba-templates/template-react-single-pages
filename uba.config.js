const path = require("path");
const hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

//服务启动设置
const svrConfig = {
  host: "127.0.0.1",
  port: 3000
};

//远程代理访问
const proxyConfig = [{
  enable: false,
  router: "/",
  url: "cnodejs.org",
  options : {
    filter : function(req,res){
      return (req.url.indexOf("webpack_hmr") > -1 ? false : true);
    }
  }
}];

//静态服务托管
const staticConfig = {
  folder: "src/static"
};


//生产环境的配置
var devConfig = {
  devtool: "cheap-module-source-map",
  entry: {
    vendors: ["react", "react-dom"],
    app: ["./src/entry/index.js",hotMiddlewareScript]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /(node_modules)/,
      include: path.resolve("src"),
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ["css-loader","postcss-loader"],
        fallback: "style-loader"
      })
    },{
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader', 'less-loader'],
        fallback: 'style-loader'
      })
    }, {
      test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
      exclude: /favicon\.png$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:8].[ext]"
        }
      }]
    }, {
      test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "[name].[hash:8].[ext]"
        }
      }]
    }]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "vendors"
    }),
    new ExtractTextPlugin({
      filename: "[name].[hash].css"
    }),
    new OpenBrowserPlugin({
      url: `http://${svrConfig.host}:${svrConfig.port}`
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/entry/index.html",
      inject: "body",
      hash: false,
      favicon : "./src/assets/images/favicon.png",
      chunks: ["vendors", "app"]
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [
      ".js", "jsx"
    ],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      assets: path.resolve(__dirname, "src/assets/"),
      pages: path.resolve(__dirname, "src/pages/")
    }
  }
}

/*
 * 最终发布的配置
 *
 */
var prodConfig = {
  entry: {
    vendors: ["react", "react-dom"],
    app: "./src/entry/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash].js",
    publicPath: ""
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /(node_modules)/,
      include: path.resolve("src"),
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ["css-loader","postcss-loader"],
        fallback: "style-loader"
      })
    },{
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader', 'less-loader'],
        fallback: 'style-loader'
      })
    }, {
      test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
      exclude: /favicon\.png$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "images/[name].[hash:8].[ext]"
        }
      }]
    }, {
      test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "[name].[hash:8].[ext]"
        }
      }]
    }]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "vendors"
    }),
    new ExtractTextPlugin({
      filename: "[name].[hash].css"
    }),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/entry/index.html",
      inject: "body",
      hash: true,
      favicon : "./src/assets/images/favicon.png",
      chunks: ["vendors", "app"]
    })
  ],
  resolve: {
    extensions: [
      ".js", "jsx"
    ],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      assets: path.resolve(__dirname, "src/assets/"),
      pages: path.resolve(__dirname, "src/pages/")
    }
  }
}


module.exports = {
  devConfig: devConfig,
  prodConfig: prodConfig,
  svrConfig: svrConfig,
  proxyConfig: proxyConfig,
  staticConfig: staticConfig
};