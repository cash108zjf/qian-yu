// vite.config.js
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import {fileURLToPath, URL} from 'url'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
    plugins: [
        vue(),
        eslint({
            include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            // 将 /api/ 开头的请求代理到 http://localhost:4000
            '/admin-api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
});
