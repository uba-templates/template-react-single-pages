# React Single Pages Application 1.0.8

> 基于`webpack` + `react` + `tinper-bee` + `mirrorx` 搭建基本快速开发脚手架并使用强大的集成开发工具[ uba ](https://github.com/iuap-design/tinper-uba)

### 说明

- 本脚手架依赖于前端集成开发工具[ uba ](https://github.com/iuap-design/tinper-uba)，项目生成的时候需要安装全局工具命令来使用，参与开发人员无需重复安装全局使用。

- 集成市面上常规的使用插件等配置，可以满足常规开发需求，无需繁琐复杂的配置项，简单、干净、舒服。

- 依赖强大的集成开发工具 `uba` 内置 `数据模拟`、`代理请求`、`静态托管`、`开放配置`等功能.

- 方便开发人员在快速搭建`react`前端开发项目，无需学习复杂配置环境，拆箱即用.

### 安装与使用

1. 安装`uba` 命令：`npm install uba -g`.

2. 执行`uba`命令来查看帮助.

3. 生成本脚手架 命令：`uba init`选择`template-react-single-pages`回车继续等待安装即可。(可以使用默认的npm来安装，也可以手动后续来安装)

4. 启动开发`npm run dev`,稍等片刻会自动打开默认浏览器显示.

5. 开发完毕后，使用命令`npm run build`来产出所需的静态资源依赖文件.

6. 享受集成开发工具`uba`给你带来的方便体验来开发吧！

### 默认内置

- `react`、`mirrorx`、`react-router v4`、`webpack`.
- `babel`、`ES7`、`Postcss`、`Less`、`Png\Jpg\Svg\Woff`.

### 资源说明

```base
root
├── mock                          # 本地数据模拟
│   └── user
└── src                           # 项目源代码
    ├── components                # 公共提取复用组件
    │   └── Reference             # 演示使用参照组件
    ├── layout                    # 布局组件
    ├── modules                   # 业务模块
    │   └── bdm                   # 具体业务模块
    │       ├── components        # 业务级别复用组件
    │       │   └── User          # 演示组件
    │       ├── containers        # 容器类组件
    │       ├── models            # 数据模型
    │       └── services          # 数据请求服务
    ├── routes                    # 路由表
    ├── static                    # 资源
    │   ├── font
    │   └── images
    └── utils                     # 工具类

```

### 修改默认配置

项目核心文件 `uba.config.js` 里面包含所有的配置，主要是基于 `webpack2` 配置，修改需谨慎。

数据模拟配置文件`uba.mock.js`可以配置需要模拟的请求方式，简单易懂，默认带完整配置。
支出8种请求模式(`OPTIONS`,`HEAD`,`GET`,`POST`,`PUT`,`DELETE`,`TRACE`,`CONNECT`)

#### 常见问题说明

1. 服务器IP和端口修改：

  ```js
  //服务启动设置
  const svrConfig = {
    host: "127.0.0.1",
    port: 3000
  };
  ```

2. 代理服务的设置：

  ```js
  //远程代理访问，可以配置多个代理服务
  const proxyConfig = [{
    enable: true,
    router: "/api/*",
    url: "http://cnodejs.org"
  },{
    enable: true,
    router: ["/users/*", "/orgs/*"],
    url: "https://api.github.com"
  },{
    enable: true,
    router: '/mes/*',
    url: "http://10.11.113.33:8080"
  }];
  ```

3. 开发监视控制台

```bash
http://localhost:3000/    #开发访问地址
http://localhost:8888/    #监视访问地址
```