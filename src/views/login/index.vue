<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- 左侧展示 -->
    <div
      class="hidden md:flex flex-col w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-12 relative overflow-hidden"
    >
      <!-- 动态背景 -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2 animate-ping"
        ></div>
        <div class="absolute top-1/3 right-1/4 w-40 h-40 bg-white rounded-full opacity-10"></div>
      </div>

      <!-- 内容 -->
      <div class="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div class="flex items-center">
            <i class="fas fa-cube text-3xl text-blue-200"></i>
            <span class="ml-2 text-xl font-bold tracking-wide">{{ title }}</span>
          </div>
          <div class="mt-24">
            <h1 class="text-4xl font-bold leading-tight">欢迎使用管理后台</h1>
            <p class="mt-4 text-blue-100 max-w-md"
              >高效、安全、专业的企业级后台管理系统，助力您的业务数字化转型</p
            >
          </div>
        </div>

        <div class="mb-8">
          <div class="flex items-center text-blue-100">
            <div
              class="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
            >
              <i-ep:monitor />
            </div>
            <div class="ml-3">
              <p class="font-medium">企业级安全</p>
              <p class="text-sm opacity-80">银行级数据加密与保护</p>
            </div>
          </div>

          <div class="flex items-center text-blue-100 mt-6">
            <div
              class="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
            >
              <i-ep:cpu />
            </div>
            <div class="ml-3">
              <p class="font-medium">高性能设计</p>
              <p class="text-sm opacity-80">毫秒级响应，流畅体验</p>
            </div>
          </div>

          <div class="flex items-center text-blue-100 mt-6">
            <div
              class="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
            >
              <i-ep:coin />
            </div>
            <div class="ml-3">
              <p class="font-medium">实时数据同步</p>
              <p class="text-sm opacity-80">多设备数据实时更新</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧登录表单区 -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6">
      <div class="w-full max-w-md">
        <!-- 移动端顶部品牌 -->
        <div class="md:hidden flex justify-center mb-8">
          <div class="flex items-center text-blue-600">
            <i class="fas fa-cube text-2xl"></i>
            <span class="ml-2 text-xl font-bold">{{ title }}</span>
          </div>
        </div>
        <!-- 登录表单 -->
        <div class="bg-white p-8 rounded-xl shadow-lg">
          <h2 class="text-2xl font-bold text-gray-800 text-center">账号登录</h2>
          <p class="mt-2 text-gray-500 text-center">请输入您的账号和密码</p>
          <el-form
            :model="loginForm"
            :rules="loginRules"
            class="mt-8"
            @submit.prevent="handleLogin"
          >
            <el-form-item>
              <el-input v-model="loginForm.username" placeholder="请输入用户名" size="large">
                <template #prefix>
                  <el-icon>
                    <i-ep:user />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                size="large"
                show-password
              >
                <template #prefix>
                  <el-icon>
                    <i-ep:lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <div class="flex justify-between items-center mt-2">
              <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
              <el-link type="primary" underline="never">忘记密码?</el-link>
            </div>
            <el-button
              type="primary"
              size="large"
              class="w-full mt-6"
              native-type="submit"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form>
          <div class="mt-8 text-center text-sm text-gray-500">
            <p>其他登录方式</p>
            <div class="flex justify-center space-x-4 mt-3">
              <div
                class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <i-ep:element-plus class="text-green-500" />
              </div>
              <div
                class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <i-ep:element-plus class="text-blue-500" />
              </div>
              <div
                class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <i-ep:element-plus class="text-gray-800" />
              </div>
            </div>
          </div>

          <div class="mt-8 text-center text-sm text-gray-500">
            还没有账号?
            <el-link type="primary" underline="never">立即注册</el-link>
          </div>
        </div>
        <PageFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useLayoutStore } from '@/store/modules/layout.js'
  import { toggleTheme } from '@/utils/toggleTheme.js'

  import PageFooter from '@/components/PageFooter/index.vue'
  import { useUserStore } from '@/store/modules/user.js'

  const title = import.meta.env.VITE_BASE_TITLE

  const layoutStore = useLayoutStore()
  const userStore = useUserStore()
  const { darkMode } = storeToRefs(layoutStore)

  const loading = ref(false)

  const loginForm = reactive({
    username: '',
    password: '',
    remember: false
  })

  const loginRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ]
  }

  onMounted(() => {
    const userInfo = userStore.getUserInfo
    if (userInfo.remember) {
      loginForm.username = userInfo.username
      loginForm.password = userInfo.password
      loginForm.remember = true
    }
  })

  function handleLogin() {
    console.log(loginForm)
    userStore.setToken('admin')
    if (loginForm.remember) {
      userStore.setUserInfo(loginForm)
    } else {
      userStore.$resetUserInfo()
    }
  }

  function onSwitchContainerClick(event) {
    toggleTheme(event)
  }
</script>
<style scoped lang="scss"></style>
