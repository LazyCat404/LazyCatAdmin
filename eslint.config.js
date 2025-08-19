import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  { ignores: ['node_modules', 'dist'] },
  { files: ['**/*.{ts,tsx,jsx,vue,mjs,cjs,css,scss,less}'] },
  /**
   * js 规则
   */
  { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'] },
  /**
   * ts 规则
   */
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { tseslint },
    extends: ['tseslint/recommended'],
    languageOptions: {
      parser: tsParser // 使用TS解析器
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // 用变量声明未使用-关闭（此处会被全局规则覆盖）
      '@typescript-eslint/no-explicit-any': 'off' // 关闭 any 类型
    }
  },
  /**
   * vue 规则
   */
  {
    files: ['**/*.vue'],
    plugins: { pluginVue },
    extends: ['pluginVue/flat/recommended'],
    languageOptions: {
      parser: vueParser, // template 模板解析
      parserOptions: {
        parser: tsParser, // script 使用TS解析器
        sourceType: 'module',
        jsx: true
      }
    },
    rules: {
      'vue/v-on-event-hyphenation': ['error', 'never'], // v-on 事件名禁止使用连字符(-)
      'vue/attribute-hyphenation': ['off'], // 属性名允许连字符(-)、驼峰
      'vue/multi-word-component-names': ['off'], // 允许单个词组件名称
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { globals: ['RouterView', 'KeepAlive'] }], // 模板中组件名称使用大驼峰
      'vue/prefer-import-from-vue': 'error' // 强制从'vue' 导入，而不是从 '@vue/*' 导入
    }
  },
  eslintPluginPrettierRecommended, // prettier 检查
  /**
   * 通用规则
   */
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'prettier/prettier': 'warn', // prettier 检查-警告
      'no-unused-vars': 'warn', // 用变量声明未使用-警告
      'prefer-const': 'warn', // 声明未改变，优先使用 const
      'max-params': ['warn', 7], // 函数参数禁止超过7个
      // new 后面的类名必须首字母大写
      'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }]
    }
  }
]);
