/*
 * @Date: 2022-05-22 20:44:25
 * @Description:
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { baidu } from './utils/system/statistics'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'element-plus/dist/index.css'
import 'normalize.css' // css初始化
import './assets/style/common.scss' // 公共css
import './theme/modules/chinese/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import { getAuthRoutes } from './router/permission'
import i18n from './locale'
// @ts-ignore
// import VuePowerTree from "vue-power-tree"
// import "vue-power-tree/dist/style.css"
// import vue3TreeOrg from 'vue3-tree-org';
// import "vue3-tree-org/lib/vue3-tree-org.css";
// import VueTree from "@ssthouse/vue3-tree-chart";
// import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";

if (import.meta.env.MODE !== 'development') { // 非开发环境调用百度统计
  baidu()
}

/** 权限路由处理主方法 */
getAuthRoutes().then(() => {
  const app = createApp(App)
  // @ts-ignore
  app.use(ElementPlus, { size: store.state.app.elementSize })
  app.use(store)
  app.use(router)
  app.use(i18n)
  // app.use(VuePowerTree)
  // app.use(vue3TreeOrg)
  // app.config.performance = true
  app.mount('#app')
})

