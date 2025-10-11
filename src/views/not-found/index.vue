<script setup>
import { useRouter } from 'vue-router';
import { Button as AButton } from 'ant-design-vue';
import projectConfig from '@src/config';

const router = useRouter();

function goHome() {
  router.replace(projectConfig.homeRoutePath);
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-[var(--easy-color-bg-container)]">
    <img class="h-[60%]" src="@src/assets/imgs/404.svg" alt="404" />
    <div class="mt-4">
      <a-button type="primary" @click="goHome">返回首页</a-button>
    </div>
  </div>
</template>
