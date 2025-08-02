import {defineConfig, loadEnv} from 'vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    const serverPort = env.VITE_SERVER_PORT || 3000;
    return {
        server: {
            host: '0.0.0.0', // 允许外部访问
            port: serverPort,      // 指定端口
        },
        plugins: [
            vue(),
            UnoCSS(),
            AutoImport({
                imports: [
                    'vue', // 自动导入 Vue 的 API，如 ref、reactive 等
                ],
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver()
                ],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({importStyle: 'sass'}),
                    IconsResolver({
                        prefix: 'i', // 默认前缀是‘i’
                        enabledCollections: ['ep'] // 使用哪个图标库
                    })
                ],
            }),
            Icons({
                compiler: 'vue3',// 指定编译器
                // 自动安装图标库
                autoInstall: true
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
    }
})
