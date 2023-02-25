import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import 'virtual:windi.css';
createApp(App).use(Antd).use(store).mount('#app');
