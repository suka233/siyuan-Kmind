import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupStore } from './store';
// import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
// import 'virtual:windi.css';
import 'virtual:uno.css';
import '/@/assets/icon-font/iconfont.css';

const init = async () => {
    const app = createApp(App);
    app.use(Antd);
    // app.use(store);
    setupStore(app);
    app.mount('#app');
};
init();
