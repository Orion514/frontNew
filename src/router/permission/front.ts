/**
 * 前端路由管理
 **/

/** 路由类型 */
import type { Route } from '../index.type'

/** 引入需要权限的Modules */
import Dashboard from '../modules/dashboard'
import Pages from '../modules/pages'
import Optimize from '../modules/optimize'
import DataConfig from "@/router/modules/dataConfig";
import User from "@/router/modules/user";
import Scene from "@/router/modules/scene";

/** 登录后需要动态加入的本地路由 */
const FrontRoutes: Route[] = [
  ...Dashboard,
  ...Scene,
  ...DataConfig,
  ...Pages,
  ...Optimize,
  ...User,
]

export default FrontRoutes
