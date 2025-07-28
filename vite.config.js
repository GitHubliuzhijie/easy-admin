import {defineConfig} from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/element-variables.scss" as *;`,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // 配置 @ 指向 src 目录
        },
    },
})
