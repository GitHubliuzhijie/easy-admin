<script setup>
  import PageFooter from '@/components/PageFooter/index.vue'

  import { useRouter } from 'vue-router'
  const router = useRouter()

  const goHome = () => {
    router.push('/')
    window.location.href = '/'
  }
  const goBack = () => {
    router.back()
  }
  const contactSupport = () => {
    window.location.href = 'https://github.com/GitHubliuzhijie/easy-admin-vue3'
  }
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 text-gray-800"
  >
    <div class="flex flex-col items-center max-w-4xl w-full">
      <!-- 错误内容 -->
      <div class="text-center mb-12">
        <div
          class="text-[180px] md:text-[240px] font-extrabold bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent leading-none"
        >
          404
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4"> 哎呀，页面走丢了！ </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          您访问的页面可能已被移除、重命名或暂时不可用。请检查URL是否正确。
        </p>
      </div>
      <!-- 操作按钮 -->
      <div class="flex flex-wrap justify-center gap-4 w-full max-w-xl mb-12">
        <button
          @click="goHome"
          class="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
        >
          <i-ep:house /> 返回首页
        </button>
        <button
          @click="goBack"
          class="px-8 py-4 bg-white text-blue-600 border border-blue-200 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
        >
          <i-ep:back /> 返回上一页
        </button>
        <button
          @click="contactSupport"
          class="px-8 py-4 bg-white text-indigo-600 border border-indigo-200 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
        >
          <i-ep:phone-filled /> 联系支持
        </button>
      </div>
      <!-- 装饰元素 -->
      <div class="absolute -top-20 -left-20 w-40 h-40 opacity-10">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,40 50,20 80,40 50,60" fill="#3b82f6" />
          <polygon points="20,40 20,80 50,100 50,60" fill="#2563eb" />
          <polygon points="50,60 50,100 80,80 80,40" fill="#60a5fa" />
        </svg>
      </div>
      <div class="absolute bottom-10 right-10 w-32 h-32 opacity-10 rotate-12">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,40 50,20 80,40 50,60" fill="#3b82f6" />
          <polygon points="20,40 20,80 50,100 50,60" fill="#2563eb" />
          <polygon points="50,60 50,100 80,80 80,40" fill="#60a5fa" />
        </svg>
      </div>
      <div class="absolute top-1/4 right-20 w-24 h-24 opacity-10 -rotate-12">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#3b82f6" />
        </svg>
      </div>
      <PageFooter />
    </div>
  </div>
</template>

<style scoped></style>
