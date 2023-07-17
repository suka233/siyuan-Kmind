import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupStore } from './store';
import Antd from 'ant-design-vue';
// import 'virtual:windi.css';
import '/@/assets/icon-font/iconfont.css';
import '@unocss/reset/tailwind.css';
import 'uno.css';

const init = async () => {
    const app = createApp(App);
    app.use(Antd);
    // app.use(store);
    setupStore(app);
    app.mount('#app');
};
init();
