import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import vueJsx from '@vitejs/plugin-vue-jsx';
function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    resolve: {
        alias: [
            {
                find: /\/@\//,
                replacement: pathResolve('src') + '/',
            },
        ],
    },
    plugins: [vue(), WindiCSS(), vueJsx()],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:6806',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].[hash].js',
                assetFileNames: '[ext]/[name].[ext]',
                dir: 'siyuan-Kmind',
            },
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
});
