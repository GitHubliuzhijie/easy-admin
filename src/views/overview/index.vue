<script setup>
import WorkingSvg from './working-svg.vue';

defineOptions({
  name: 'Overview',
});
</script>

<template>
  <div class="p-4 h-full">
    <div class="h-full rounded-lg bg-[var(--easy-color-bg-container)] flex justify-center items-center">
      <div class="text-center w-100">
        <h1 class="text-center mb-6">开启牛马的一天</h1>
        <div class="flex justify-center">
          <working-svg class="h-full text-[var(--easy-color-text)]"></working-svg>
        </div>
      </div>
    </div>
  </div>
</template>
