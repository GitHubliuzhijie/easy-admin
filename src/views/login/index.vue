<script setup>
import {storeToRefs} from 'pinia'
import {useLayoutStore} from "@/store/modules/layout.js";
import {toggleTheme} from "@/utils/toggleTheme.js";

const title = import.meta.env.VITE_BASE_TITLE
// 社交登录图标
const socialLogins = [
  {
    name: 'google',
    icon: defineComponent({template: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>`}),
    color: '#4285F4'
  },
  {
    name: 'facebook',
    icon: defineComponent({template: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>`}),
    color: '#1877F2'
  },
  {
    name: 'twitter',
    icon: defineComponent({template: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/></svg>`}),
    color: '#1DA1F2'
  },
  {
    name: 'github',
    icon: defineComponent({template: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg>`}),
    color: '#333333'
  }
];

const layoutStore = useLayoutStore()
const {darkMode} = storeToRefs(layoutStore)

const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
const loginRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
  ]
}

function onLogin() {
  console.log(loginForm)
}

function onSwitchContainerClick(event) {
  toggleTheme(event)
}
</script>

<template>
  <div class="relative w-full flex h-full flex-content-center flex-col justify-center flex-items-center p-2">
    <!-- 背景动画 -->
    <div class="bg-animation"></div>
    <!-- 登录容器 -->
    <div
        class="flex flex-col md:flex-row w-full max-w-6xl h-auto md:h-[600px] bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
      <!-- 左侧品牌区 -->
      <div
          class="w-full md:w-2/5 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
        <div class="relative z-10 text-center">
          <div class="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-14 h-14 text-white" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M12,4L4,8V16L12,20L20,16V8L12,4M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,14.5C12.62,14.5 13.12,14.19 13.5,13.78C14.27,14.41 15.28,14.2 15.78,13.5C16.31,12.78 16.16,11.72 15.41,11.19C15.25,11.07 15.09,11 15,10.93V10.5C15,9.67 14.33,9 13.5,9H10.5L9.5,10L10.5,11H13V11.5C13,11.67 13.08,11.82 13.18,11.94C13.35,12.12 13.5,12.27 13.5,12.5C13.5,12.78 13.28,13 13,13H11A1,1 0 0,1 10,12C10,11.45 10.45,11 11,11V10.5C11,9.67 10.33,9 9.5,9H8.5V12.5L8.5,13.5H9.5V15H8.5V17H15.5V15H12V14.5Z"/>
            </svg>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">{{ title }}</h1>
          <p class="text-white/90 max-w-md mx-auto leading-relaxed">
            基于Vue3 + Element Plus + UnoCSS构建的企业级后台管理系统解决方案
          </p>
        </div>
      </div>
      <!-- 右侧表单区 -->
      <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
        <div class="mb-10">
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">欢迎回来</h2>
          <p class="text-slate-400">请输入您的账号和密码登录系统</p>
        </div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="space-y-6">
          <el-form-item prop="username">
            <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                size="large"
                :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="loginForm.password"
                placeholder="请输入密码"
                type="password"
                size="large"
                :prefix-icon="Lock"
                show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                size="large"
                class="w-full"
            >
              登录
            </el-button>
          </el-form-item>
          <div class="flex justify-between items-center mt-2">
            <el-link type="primary" :underline="false">忘记密码?</el-link>
            <el-link type="primary" :underline="false">注册账号</el-link>
          </div>
        </el-form>
        <div class="mt-10">
          <div class="relative flex items-center justify-center my-6">
            <div class="flex-grow border-t border-slate-600"></div>
            <span class="flex-shrink mx-4 text-slate-500 text-sm">其他登录方式</span>
            <div class="flex-grow border-t border-slate-600"></div>
          </div>
          <div class="flex justify-center gap-5">
            <div v-for="(social, index) in socialLogins" :key="index"
                 class="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center cursor-pointer transition-all hover:bg-indigo-500/20 hover:-translate-y-1"
                 @click="socialLogin(social.name)">
              <component :is="social.icon" class="w-6 h-6" :style="{ color: social.color }"/>
            </div>
          </div>
        </div>
        <div class="mt-8 text-center text-slate-500 text-sm">
          <p>© 2023 EasyAdmin 后台管理系统 | 版本 v3.0.1</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>