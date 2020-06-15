# BUE CMS 后端管理系统 - 前端开发框架

> author: bruski
> update_time: 2020/06/14

BUE CMS是一款后台管理系统的前端解决方案，基于Vue-CLI3，在Github 开源框架 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 的基础上定制，整合原框架功能，加入一些实用第三方库，提供开箱即用的便捷体验：

* 核心框架与插件：Vue2, Vue-Router, Vuex
* 主要语言: HTML / Sass / JavaScript
* 脚手架：Vue-CLI3
* UI组件库： Element-UI
* 项目文档书写：vuepress
* 开发工具库：
	* HTTP请求库：Axios 
	* 图表库：Echarts
	* 参数校验库： @hapi/joi
	* 工具函数库: lodash
	* 时间库: Moment
	* Mock库：Mockjs
	* 代码质量检测与修复：ESLint
	* 自动化测试：Jest, @vue/test-utils
	* Git-Precommit钩子：Husky
* 功能：
	* 本地开发+热更新：```npm run dev```
	* 页面预览：```npm run preview```
	* 代码打包：
		* 预发布环境：```npm run build:stage```
		* 正式环境： ```npm run build:prod```
	* 运行单元测试：```npm run test:unit```
	* 可配置的环境变量文件，如根据开发和正式环境设置不同Base URL，打包时可自动切换。
	* Mock服务器：Express + Mockjs
* 后台页面框架
	* 自动生成左栏+面包屑+主页面的页面框架，并可配置。
	* 新增页面时，配置好路由，左菜单栏栏自动引入该菜单项。
	* 菜单栏自适应收缩展开。
	* 内置Element-UI的icon与多款其他icon，并可自行引入Svg图标。

同时将日常开发中通用业务页面或组件，沉淀为模板页与业务组件库，方便组内开发复用。

## 前序准备

你需要在本地安装node(>=8)和git，本框架技术栈基于 ES2015+、vue、vuex、vue-router 、vue-cli 、axios、element-ui 和echarts，单元测试使用Jest框架，模拟数据使用Mock.js进行模拟，提前了解和学习这些知识会对使用本框架有很大的帮助。

## 目录结构

```
├── build                      # 构建相关
├── mock                       # 本地mock sever
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有API请求
│   ├── assets                 # 主题，字体，图片、icons等静态资源
│   ├── components             # 组件库
│   ├── errors                 # 错误处理与异常类
│   ├── layout                 # 页面框架，含菜单栏，面包屑等
│   ├── router                 # 页面路由配置
│   ├── store                  # 页面全局状态管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 工具方法
│   │   ├── filters            # 全局模板管道函数
│   │   ├── mixins             # 全局mixin
│   │   └── vendor             # 第三方脚本
│   ├── views                  # 所有页面存放于此目录
│   ├── App.vue                # 入口页面
│   ├── main.js                # Webpack入口文件
│   └── settings.js            # 全局可配置项
├── tests                      # 测试用例代码
├── .env.xxx                   # 环境变量配置（实现API请求路径随环境而变化）
├── .eslintrc.js               # eslint 配置项
├── jest.config.js             # jest 配置项
├── babel.config.js            # babel-loader 配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

## 框架快速使用

### 全局配置
进入 ```src/settings.js ``` 进行全局配置（页面标题，系统名...）

```
 title: 'BUE-CMS',  // 浏览器页面标题
 system: '待命名',  // 系统名称
 admin: '待命名',  // 系统负责人名称
 fixedHeader: true,  // 是否固定顶部导航栏
 sidebarLogo: false  // 是否显示侧边栏LOGO
```

### 新建页面
进入```src/views```目录，所有要新建的页面都放置在此目录下，推荐新建一级目录取名为页面名称，该目录下创建index.vue。

可在页面目录下自行创建components目录，用于放置页面所需组件。目录及一般文件推荐kebab命名法，组件推荐大驼峰命名(引入更直观)。

```
目录结构示意

├── views                        
│   ├── demo-page  
│   │   ├── components
│   │   │  └── TheTable.vue
│   │   └── index.vue 
```

### 配置页面路由

进入 ```src/router/index.js``` 将新建页对应的路由配置好。

本项目的侧边菜单栏将根据路由表自动生成，路由表分静态路由表```constantRoutes ```与动态路由表```asyncRoutes ```。如无需权限的页面，配置在constantRoutes下即可。

```
export const constantRoutes = [
  {
    path: '/demo-page',
    component: Layout,
    redirect: '/demo-page/index',  // 点击面包屑时，重定向到某个子路由
    name: 'DemoPage',  //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/demo-page/index'),  // 路由懒加载，优化单页应用
        meta: { title: '示例', icon: 'dashboard' }  // 侧边栏的标题与icon
      }
    ]
  },

  // 多级菜单的配置，此时侧边栏一级菜单项有多个二级菜单项
  {
    path: '/demo2',
    redirect: '/demo2/page1',
    component: Layout,
    name: 'Demo2',
    meta: { title: '示例2', icon: 'nested'},  // 侧边栏的标题与icon
    children: [
      {
        path: 'page1',
        name: 'Page1',
        component: () => import('@/views/demo2/page1'),
        meta: { title: '页面1', icon: 'component' }
      },
      {
        path: 'page2',
        name: 'Page2',
        component: () => import('@/views/demo2/page2'),
        meta: { title: '页面2', icon: 'component' }
      }，
      ...
    ]
  ...
]
```

### 页面预览，调试，热更新

在项目**根目录**下的命令行运行命令：```npm run dev``` 
即可启用本地开发服务器来调试页面（开发环境），此时打开浏览器输入提示的地址应该能看到页面效果。

## 框架使用建议

### API请求

> 建议将所有api请求统一写在```src/api```文件夹下。

根目录下的环境变量文件：```.env.development``` / ```.env.staging``` / ```.env.production```， 用于配置环境变量.

框架会根据不同的构建命令```npm run dev/build:stage/build:prod```，读取环境变量文件，根据环境自动切换API请求前缀。（如，api定义为```/getlist```，开发环境下发出的请求是```/dev-api/getlist```，预发布环境下发出的请求是```/stage-api/getlist```生产环境下发出的请求是```/prod-api/getlist```）

### 前端错误处理

> 错误处理对于页面的可用性非常重要，请针对有可能出错的代码进行错误捕获与处理。

错误捕获

- 全局错误捕获 VUE errorHandler： 在```@/errors/error-handler.js```中添加全局错误处理的代码。
- 可疑区域增加 Try-Catch（如，发出请求处）
- 监控网页崩溃：window 对象的 load 和 beforeunload
- 开发环境下，可配置```@/settings.js```中的errorLog为```['production', 'development']```，一旦有错误，可以在顶部栏看到错误栈信息 

错误处理

- 在能预见的错误手动抛出错误，并添加错误操作名+错误原因
- 在合适的地方加try-catch代码块中处理错误，如使用```@/utils/message.js```中的Message类的error方法，将错误信息显示到页面上。