
import { createNameComponent } from '../createNode';

/** 首页系列 */
const dashboard = {
  /** 首页 */
  dashboard: createNameComponent(() => import('@/views/main/dashboard/index.vue')),
}

const scene = {
  /** 场景切换 */
  manage: createNameComponent(() => import('@/views/main/scene/manage/index.vue')),
  // elder: createNameComponent(() => import('@/views/main/scene/elder.vue')),
  test: createNameComponent(() => import('@/views/main/scene/test.vue')),
}



/** 优化管理 */
const optimize = {
  /** 三级菜单1 */
  pca: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/PCA/index.vue')),
  /** 三级菜单2*/
  kmeans: createNameComponent(() => import('@/views/main/optimize/dimension-lowering/KMeans/index.vue')),
  /** 三级菜单1 */
  spearman: createNameComponent(() => import('@/views/main/optimize/merge/Spearman/index.vue')),
  /** 三级菜单1 */
  pearson: createNameComponent(() => import('@/views/main/optimize/merge/Pearson/index.vue')),
  /** 三级菜单1 */
  entropy: createNameComponent(() => import('@/views/main/optimize/weight/entropy.vue')),
}

const dataConfig = {
    /** 下载上传 */
    downAndUpload: createNameComponent(() => import('@/views/main/dataConfig/downAndUpload/index.vue')),
}


/** 页面 */
const pages = {
  /** 列表表格 */
  crudTable: createNameComponent(() => import('@/views/main/pages/crudTable/index.vue')),
  // /** 分类表格 */
  // categoryTable: createNameComponent(() => import('@/views/main/pages/categoryTable/index.vue')),
  /** 树形表格 */
  treeTable: createNameComponent(() => import('@/views/main/pages/resultTable/treeTable/index.vue')),

}


/** 用户管理 */
const user ={
  user: createNameComponent(() => import('@/views/main/user/index.vue')),
}

/** 导出所有路由，供后端配置使用 */
const allRoutes = {
  dashboard,
  scene,


  optimize,
  dataConfig,
  pages,






  user,
}

export default allRoutes
