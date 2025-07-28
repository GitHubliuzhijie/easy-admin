import { createApp } from 'vue'

import '@/styles/index.scss'

import router from '@/router/index.js';

const app = createApp(App);


import App from './App.vue'


app.use(router);

app.mount('#app');
