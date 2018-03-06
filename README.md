# React Single Pages Application 1.0.8

> 基于`uba` + `react` + `bee` + `mirrorx` 搭建基本快速开发脚手架，包含相关示例系统以及参照组件等

### 说明

- 本脚手架依赖于前端集成开发工具[ uba ](https://github.com/iuap-design/tinper-uba)，项目生成的时候需要安装全局工具命令来使用，参与开发人员无需重复安装全局使用.

- 使用[数据模拟平台](https://mock.yonyoucloud.com)来做项目代码请求数据.

- 集成市面上常规的使用插件等配置，可以满足常规开发需求，无需繁琐复杂的配置项，简单、干净、舒服.

- 依赖强大的集成开发工具 `uba` 内置 `数据模拟`、`代理请求`、`静态托管`、`开放配置`等功能.

- 方便开发人员在快速搭建`react`前端开发项目，无需学习复杂配置环境，拆箱即用.

### 安装与使用

1. 下载本仓库 `npm install` 安装依赖.

2. 启动开发调试服务 `npm run dev`.

3. 构建静态资源服务 `npm run build`.

4. 享受集成开发工具`uba`给你带来的方便体验来开发吧！

### 特性

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

### 预览

![image](https://user-images.githubusercontent.com/3817644/37010226-85edcf0a-2125-11e8-88be-ea37d3537463.png)

![image](https://user-images.githubusercontent.com/3817644/37010265-b60db51a-2125-11e8-8e2a-20250de40c4d.png)


![image](https://user-images.githubusercontent.com/3817644/37010239-99c67374-2125-11e8-9ae8-7c5d253c25cf.png)

![image](https://user-images.githubusercontent.com/3817644/37010273-bfe800d6-2125-11e8-916b-c85613a77106.png)

![image](https://user-images.githubusercontent.com/3817644/37010284-ca307050-2125-11e8-9248-c88e0a208789.png)

![image](https://user-images.githubusercontent.com/3817644/37010290-d468a07e-2125-11e8-8438-df47e0d90355.png)


![image](https://user-images.githubusercontent.com/3817644/37010305-e4a44632-2125-11e8-97e7-91adec04aa02.png)


![image](https://user-images.githubusercontent.com/3817644/37010313-f03bc11e-2125-11e8-8143-33a3c9261f2c.png)


![image](https://user-images.githubusercontent.com/3817644/37010322-fbd4540a-2125-11e8-824b-559da9a05d88.png)


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
