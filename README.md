# Vue 3 + Typescript + Vite


### 启动

```
npm run dev
```

### 构建

```
npm run build
```

### 线上环境

```
npm run serve
```

### UI 框架

- [element-plus](https://element-plus.org/#/zh-CN)


### 主要插件依赖

- typescript: ts 语法检查

- vite：打包工具

- sass：css预编译

- splitpanes：窗格拆分/大小控制

- clipboard：复制面板

- vuex-persistedstate: vuex 持久化

- vuedraggable：拖拽

### node版本

> 推荐**最新LTS版本**

最低要求node版本为14+

- 如果为了适应低版本node，可舍去部分配置

    - `unplugin-auto-import` : 自动引入，全局变量（依赖或自定义）、适配TS、ESLint检查