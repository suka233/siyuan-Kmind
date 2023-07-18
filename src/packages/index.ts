import Kmind from '../App.vue';
import HomeView from '/@/views/home/index.vue';
// 实测以下样式文件必须引入，不然打包的lib文件css无法生效
import '@unocss/reset/tailwind.css';
import 'uno.css';
// import 'virtual:uno.css';
// export const install = (app) => {
//     app.use(Kmind);
// };
// export default {
//     install: (app) => {
//         app.component('Kmind', Kmind);
//     },
// };
//
// export const KmindComponent = Kmind;
export { Kmind, HomeView };
