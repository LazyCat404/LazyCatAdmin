module.exports = {
  root: true,
  env: {
    node: true, // node 全局变量和作用域
    es6: true, // 启用 ES6 语法支持
    browser: true // 浏览器全局变量
  },
  parser: 'vue-eslint-parser', //定义ESLint的解析器
  parserOptions: {
    parser: '@typescript-eslint/parser' // 解析 .ts 文件
  },
  extends: [
    //定义文件继承的子规范
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  plugins: ['prettier', '@typescript-eslint'], // 定义了eslint文件所依赖的插件
  rules: {
    'prettier/prettier': 'warn', // prettier 检查警告
    'max-params': ['warn', 7], // 函数参数禁止超过7个
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用any
    'vue/multi-word-component-names': ['off'], // 允许单个词组件名称
    'vue/prefer-import-from-vue': 'off', // 强制从“vue”导入，而不是从“@vue/*”导入
    'no-unused-vars': 'off', // 禁用（允许）变量声明未使用（即使禁用TS也会限制）
    '@typescript-eslint/no-unused-vars': ['error'], // 使用@typescript-eslint 扩展规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
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
