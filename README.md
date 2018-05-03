# Tinper-React 2.0.0

> 基于`uba` + `react` + `bee` + `mirrorx` 搭建基本快速开发脚手架，包含相关示例系统以及参照组件等

### 说明

- 本脚手架依赖于前端集成开发工具[ uba ](https://github.com/iuap-design/tinper-uba)，项目生成的时候需要安装全局工具命令来使用，参与开发人员无需重复安装全局使用.

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


### 修改默认配置
