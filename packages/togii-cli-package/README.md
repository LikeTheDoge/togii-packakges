---
title: tog-cli-package
subtitle: Monorepo 管理脚手架
description: 对 monorepo 主项目脚本一些封装
---

## 安装

```
yarn add togii-cli-package@latest
```

## 初始化项目

`init` -> 初始化类库
  
在项目通过 `npm init` 创建之后使用，每个项目只用一次。

会在项目内添加 *初始代码（包括源码，配置，示例代码）*，*修改 package.json(包括添加 script 和依赖)*

之后需要通过 yarn install 安装依赖

## 本地文档服务

1. `doc --serve` -> 通过本地服务打开项目文档 

会根据当前库的 packages 和 .docs 编译生成文档相关的中间代码

并复制 `/.config/vue.config.doc.js` 到 `/vue.config.js`

之后可以通过 `vue-cli-service serve` 打开文档服务


2. `doc --build` -> 通过本地服务打开项目文档 

会根据当前库的 packages 和 .docs 编译生成文档相关的中间代码

并复制 `/.config/vue.config.doc.js` 到 `/vue.config.js`

之后可以通过 `vue-cli-service build` 生成目标代码到 `/dist` 目录


3. `dist` -> 移动子项目内文档静态文件  

将子项目 `/packages/*/dist` 内部所有文件移动到主目录 `/dist` 文件夹中 （用于生成整个 monorepo 的文档）

## npm script 脚本

`yarn doc:serve`

- 调用 `toggii-cli doc --server` 
- 调用 `vue-cli-service serve` 打开文档服务

`yarn doc:build`

- 调用 `togii-cli doc --build` 生成代码
- 调用 `vue-cli-service build`,生成 monorepo 项目的文档。
- 调用 `lerna run doc:build` 对 `/packages/*` 内所有项目生成文档。
- 调用 `togii-cli dist`，将子项目内的文档代码（`/packages/*/dist`）拷贝到 `/dist` 目录中 