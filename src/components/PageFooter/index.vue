<script setup>
  defineOptions({
    name: 'PageFooter'
  })
  const title = import.meta.env.VITE_BASE_TITLE
</script>

<template>
  <!-- 页脚 -->
  <div class="mt-8 text-center text-gray-400 text-sm">
    <p>© 2025 {{ title }} 后台管理系统 | 技术支持: 400-888-8888</p>
  </div>
</template>

<style scoped></style>
