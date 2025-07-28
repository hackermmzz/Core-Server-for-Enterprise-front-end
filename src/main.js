import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 必须引入样式
createApp(App)
  .use(router,ElementPlus)  // 使用 Vue Router
  .mount('#app')
