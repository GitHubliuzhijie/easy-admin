<template>
  <div class="relative w-full h-full overflow-hidden">
    <div v-if="loading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white bg-opacity-90 rounded-lg text-center">
      Loading...
    </div>
    <div v-if="error" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white bg-opacity-90 rounded-lg text-center">
      Failed to load iframe
      <button
        @click="reload"
        class="mt-2.5 px-4 py-1 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
    <iframe
      ref="iframeRef"
      :src="src"
      @load="onLoad"
      @error="onError"
      class="w-full h-full min-h-[600px]"
      frameborder="0"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

defineOptions({
  name: 'IframeView',
});
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const iframeRef = ref(null);
const loading = ref(true);
const error = ref(false);
let timeoutId = null;

function reload() {
  error.value = false;
  loading.value = true;
  iframeRef.value.src = props.src;
}

function onLoad() {
  loading.value = false;
  clearTimeout(timeoutId);
}

function onError() {
  loading.value = false;
  error.value = true;
}

onMounted(() => {
  timeoutId = setTimeout(() => {
    if (loading.value) {
      onError();
    }
  }, 10000); // 10秒超时
});

onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});

watch(
  () => props.src,
  () => {
    reload();
  },
);
</script>
