import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import vueJsx from '@vitejs/plugin-vue-jsx';

import minimist from 'minimist';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// import livereload from 'rollup-plugin-livereload';
// import zipPack from 'vite-plugin-zip-pack';
// import fg from 'fast-glob';

const args = minimist(process.argv.slice(2));
const isWatch = args.watch || args.w || false;
const devDistDir = './dev';
const distDir = isWatch ? devDistDir : './dist';

console.log('isWatch=>', isWatch);
console.log('distDir=>', distDir);

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
    plugins: [
        vue(),
        WindiCSS(),
        vueJsx(),
        viteStaticCopy({
            targets: [
                {
                    src: './README*.md',
                    dest: './',
                },
                {
                    src: './icon.png',
                    dest: './',
                },
                {
                    src: './preview.png',
                    dest: './',
                },
                {
                    src: './widget.json',
                    dest: './',
                },
            ],
        }),
    ],
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
        // rollupOptions: {
        //     output: {
        //         entryFileNames: 'js/[name].js',
        //         chunkFileNames: 'js/[name].[hash].js',
        //         assetFileNames: '[ext]/[name].[ext]',
        //         dir: 'siyuan-Kmind',
        //     },
        // },
        outDir: distDir,
        emptyOutDir: false,
        sourcemap: false,
        minify: !isWatch,
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    define: {
        'process.env.DEV_MODE': `"${isWatch}"`,
    },
});
