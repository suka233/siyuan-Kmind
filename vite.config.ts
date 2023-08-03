import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
// import UnoCSS from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

import minimist from 'minimist';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import cleanPlugin from 'vite-plugin-clean';

import livereload from 'rollup-plugin-livereload';
import zipPack from 'vite-plugin-zip-pack';
import fg from 'fast-glob';

const args = minimist(process.argv.slice(2));
const isWatch = args.watch || args.w || false;
const devDistDir = './dev';
const distDir = isWatch ? devDistDir : './dist';

console.log('isWatch=>', isWatch);
console.log('distDir=>', distDir);

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}

// const handleOutput = (isWatch: boolean) => {
//     if (isWatch) {
//         return {
//             // entryFileNames: '[name].js',
//             // assetFileNames: (assetInfo) => {
//             //     if (assetInfo.name?.endsWith('.css')) {
//             //         return 'index.css';
//             //     }
//             // },
//             entryFileNames: 'js/[name].js',
//             chunkFileNames: 'js/[name].[hash].js',
//             assetFileNames: '[ext]/[name].[ext]',
//             // assetFileNames: '[ext]/[name].[ext]',
//             globals: {
//                 vue: 'Vue',
//             },
//         };
//     } else {
//         return {
//             globals: {
//                 vue: 'Vue',
//             },
//         };
//     }
// };
// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    resolve: {
        alias: [
            {
                find: /\/@\//,
                replacement: pathResolve('src') + '/',
            },
            {
                find: 'stream',
                replacement: 'stream-browserify',
            },
            {
                find: 'events',
                replacement: 'rollup-plugin-node-polyfills/polyfills/events',
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
                {
                    src: './img/**',
                    dest: './img/',
                },
            ],
        }),
        // UnoCSS(),
        // @ts-ignore
        cleanPlugin({
            targetFiles: [distDir],
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
        // cssCodeSplit: true,
        // lib: isWatch
        //     ? false
        //     : {
        //           entry: resolve(__dirname, 'src/packages/index.ts'),
        //           name: 'siyuan-kmind',
        //           fileName: 'siyuan-kmind',
        //       },
        rollupOptions: {
            plugins: isWatch
                ? [
                      livereload(devDistDir),
                      {
                          // 监听静态资源文件
                          name: 'watch-external',
                          async buildStart() {
                              const files = await fg([
                                  './README*.md',
                                  './widget.json',
                              ]);
                              for (const file of files) {
                                  this.addWatchFile(file);
                              }
                          },
                      },
                  ]
                : [
                      zipPack({
                          inDir: './dist',
                          outDir: './',
                          outFileName: 'package.zip',
                      }),
                  ],
            // 如果是构建库的话，就可以排除vue
            // external: isWatch ? undefined : ['vue'],
            // output: {
            //     // entryFileNames: '[name].js',
            //     // assetFileNames: (assetInfo) => {
            //     //     if (assetInfo.name?.endsWith('.css')) {
            //     //         return 'index.css';
            //     //     }
            //     // },
            //     以下配置项使用三元运算符，会导致isWatch为false的时候，dist目录下的文件带有hash，暂时不知道怎么解决，所以使用handleOutput来处理
            //     entryFileNames: isWatch ? 'js/[name].js' : undefined,
            //     chunkFileNames: isWatch ? 'js/[name].[hash].js' : undefined,
            //     assetFileNames: isWatch ? '[ext]/[name].[ext]' : undefined,
            //     globals: {
            //         vue: 'Vue',
            //     },
            // },
            // output: handleOutput(isWatch),
            output: {
                // entryFileNames: '[name].js',
                // assetFileNames: (assetInfo) => {
                //     if (assetInfo.name?.endsWith('.css')) {
                //         return 'index.css';
                //     }
                // },
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].[hash].js',
                assetFileNames: '[ext]/[name].[ext]',
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
    define: {
        'process.env.DEV_MODE': `"${isWatch}"`,
    },
});
