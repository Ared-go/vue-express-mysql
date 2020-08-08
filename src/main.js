import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import animate from 'animate.css'
// 全局引入echarts
import echarts from 'echarts'
import '@/assets/css/global.css'
import {
    Button,
    Select,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    Submenu,
    Col,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag
} from 'element-ui';
// 配置请求的根路径
axios.defaults.baseURL = '/api';
// 请求拦截器
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;
});
// 挂载到Vue原型对象中
Vue.prototype.$echarts = echarts;
// 挂载到Vue实例对象中
Vue.prototype.$http = axios;
//  将message挂载到Vue实例对象中
Vue.prototype.$message = Message;
// 挂在confir方法到Vue实例对象中
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(animate);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Col)
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Tag);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')