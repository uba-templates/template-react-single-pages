# React Single Pages Application 1.0.0

> 基于webpack+react搭建基本快速发开脚手架并使用强大的集成开发工具[ uba ](https://github.com/iuap-design/tinper-uba)

### 说明

- 本脚手架依赖于前端集成开发工具[ uba ](https://github.com/iuap-design/tinper-uba)，项目生成的时候需要安装全局工具命令来使用，参与开发人员无需重复安装全局使用。

- 集成市面上常规的使用插件等配置，无需繁琐复杂的配置项，简单、干净、舒服。

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

- `react 15.6.1`、`react-dom 15.6.1`、`webpack`.
- `babel`、`ES5\6`、`postcss`、`Less`、`Sass`、`图片处理`、`字体处理`、`热部署`.

### 资源说明

```base

├── LICENSE
├── README.md
├── mock                               -- 数据模拟存放文件夹
│   └── api
│       └── user
│           ├── get.json
│           └── post.json
├── package.json
├── postcss.config.js                  -- postcss的基本配置文件
├── src -- 存放开发源代码文件夹
│   ├── assets                         -- 开发使用到的资源文件
│   │   └── images
│   │       ├── favicon.png
│   │       └── logo.png
│   ├── components                     -- react组件存放
│   │   └── Test
│   │       ├── index.css
│   │       └── index.js
│   ├── entry                          -- react入口的文件
│   │   ├── index.css
│   │   ├── index.html
│   │   └── index.js
│   ├── pages                          -- 业务模块存放的文件夹
│   │   └── App.js
│   └── static                         -- 可以直接静态资源托管的文件夹
│       └── js
│           └── demo.js
├── uba.config.js                      -- uba的核心配置文件
└── uba.mock.js                        -- uba配置数据模拟

```
