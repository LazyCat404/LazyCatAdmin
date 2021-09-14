module.exports = {
  root: true,
  env: {
    node: true,   // node 全局变量和作用域
    es6: true,    // 启用 ES6 语法支持
    browser: true // 浏览器全局变量
  },
  parser: 'vue-eslint-parser',                //定义ESLint的解析器
  parserOptions: {
    parser: '@typescript-eslint/parser'       // 解析 .ts 文件
  },
  extends: [                                  //定义文件继承的子规范
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
  ], 
  plugins: ['@typescript-eslint'],            //定义了eslint文件所依赖的插件
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['warn', 2],        // 控制缩进2个字符
    'semi': ['warn', 'always'],   // 结尾加分号
    'max-params': ['warn', 7],    // 函数参数禁止超过7个
    'quotes': ['warn', 'single'], // 使用单引号
    'no-unused-vars': 'error',    // 禁止变量声明未使用
    'no-undef': 'error',
    // new 后面的类名必须首字母大写
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
        properties: true
      }
    ]
  }
};
