import { createApp } from 'vue';
import { setupStore } from './store';

// import 'virtual:windi.css';
// import '/@/assets/icon-font/iconfont.css';
import './style.css';
import 'uno.css';
import Antd from 'ant-design-vue';
// import 'virtual:uno.css';
import katex from 'katex';
import 'katex/dist/katex.css';
window.katex = katex;
import App from './App.vue';

// 引入了上面魔改过的style.css重置样式，就无需引入下面的了
// import '@unocss/reset/tailwind-compat.css';
const init = async () => {
    const app = createApp(App);
    app.use(Antd);
    // app.use(store);
    setupStore(app);
    app.mount('#app');
};
init();
