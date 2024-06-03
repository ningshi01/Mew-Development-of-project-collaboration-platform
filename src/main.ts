// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import Antd from 'ant-design-vue';
import 'element-plus/theme-chalk/index.css'
import * as Icons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/reset.css';
import axios from 'axios';
import naive from 'naive-ui'

const app = createApp(App)

app.use(naive)
app.use(router)
app.use(Antd);
app.mount('#app')

const icons : any = Icons
for (const i in icons){
    app.component(i,icons[i])
}