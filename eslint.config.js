import eslint from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import configPrettier from 'eslint-config-prettier'
import prettierConfig from 'eslint-config-prettier'

// 正确导出配置数组
export default [
  // 忽略文件配置
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.min.*',
      '**/auto-imports.d.ts',
      '**/components.d.ts'
    ]
  },

  // 基础 JavaScript 配置
  eslint.configs.recommended,

  // Vue 推荐配置
  ...pluginVue.configs['flat/recommended'],
  // 全局配置
  {
    // 指定要检查的文件
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      // 基础规则
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      // ES6+ 规则
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',

      // 最佳实践
      eqeqeq: 'off',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

      // 禁用与 TypeScript 冲突的规则
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-redeclare': 'off',
      '@typescript-eslint/ban-ts-comment': 'off'
    }
  },

  // Vue 文件特定配置
  {
    files: ['**/*.vue'],
    languageOptions: {},
    rules: {
      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'error',
      'vue/no-unused-vars': 'error',
      'vue/no-mutating-props': 'off',
      'vue/valid-v-for': 'warn',
      'vue/no-template-shadow': 'warn',
      'vue/return-in-computed-property': 'warn',
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style']
        }
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  prettierConfig,
  // Prettier 集成（必须放在最后）
  configPrettier
]
