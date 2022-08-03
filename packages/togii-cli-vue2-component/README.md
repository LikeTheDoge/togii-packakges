---
title: tog-cli-vue2-component
subtitle: vue2 组件管理脚手架
description: 针对 vue2 组件库项目脚本一些封装
---

## 安装

```
yarn add togii-cli-vue2-component@latest
```

## 初始化项目

`init` -> 初始化类库
  
在项目通过 `npm init` 创建之后使用，每个项目只用一次。

会在项目内添加 *初始代码（包括源码，配置，示例代码）*，*修改 package.json(包括添加 script 和依赖)*

之后需要通过 yarn install 安装依赖

## 本地文档服务

- `doc --serve` -> 通过本地服务打开项目文档 

会根据当前库的 packages 和 .docs 编译生成文档相关的中间代码

并复制 `/.config/vue.config.doc.js` 到 `/vue.config.js`

之后可以通过 `vue-cli-service serve` 打开文档服务


- `doc --build` -> 通过本地服务打开项目文档 

会根据当前库的 packages 和 .docs 编译生成文档相关的中间代码

并复制 `/.config/vue.config.doc.js` 到 `/vue.config.js`

之后可以通过 `vue-cli-service build` 生成目标代码到 `/dist` 目录


## npm script 脚本

`yarn doc:serve`

- 调用 `toggii-cli doc --server` 
- 调用 `vue-cli-service serve` 打开文档服务

`yarn doc:build`

- 调用 `togii-cli doc --build` 生成代码
- 调用 `vue-cli-service build`,生成组件库项目的文档。